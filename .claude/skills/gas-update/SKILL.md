---
name: gas-update
description: >-
  リポジトリの gas/Code.gs・gas/appsscript.json の内容を、本番の Apps Script エディタ（スプレッドシートに紐づく GAS）へ
  Claude in Chrome で反映するスキル。エディタの現在の内容が想定どおり（反映元ブランチの main 版など）であることを確かめてから
  置き換えて保存し、再読み込みして反映を確認する。トークン入力・デプロイ・権限承認など、セキュリティに関わる操作はしない。
  「GAS を更新して」「Code.gs を反映して」「Apps Script に貼り付けて」「GAS のコードを本番に入れて」のように、
  GAS のコードをエディタへ反映するよう求められたときに使う。GAS のコードを書く・直すだけのときは使わない。
---

# GAS Update — Apps Script エディタへの反映

`gas/` のコードを本番の Apps Script プロジェクトへ反映する。
このリポジトリは **公開リポジトリ** なので、スプレッドシート ID・スクリプト ID・アカウントなどはこのファイルに書かず、
gitignore 済みの `.env.local` から読む。

## 前提: `.env.local` のキー

| キー | 内容 |
|---|---|
| `GAS_SPREADSHEET_ID` | サイトデータのスプレッドシート ID |
| `GAS_SCRIPT_ID` | スプレッドシートに紐づく Apps Script プロジェクトの ID |
| `GAS_GOOGLE_ACCOUNT` | GAS を所有している Google アカウント |

読むときはこの 3 キーだけを取り出す（`.env.local` の他の値は表示しない）:

```sh
grep -E '^GAS_(SPREADSHEET_ID|SCRIPT_ID|GOOGLE_ACCOUNT)=' .env.local
```

キーが無ければユーザにスプレッドシートの URL を聞き、`.env.local` に追記する。**値を `SKILL.md` やコミット対象のファイルに書かない。**

## セキュリティ上のルール（必ず守る）

- **スクリプトプロパティには触れない。** トークン・Build Hook URL などの値の入力、表示、読み取りはしない。
  プロジェクトの設定ページは値がそのまま表示されるので、そのページでは `screenshot`・`get_page_text`・`read_page` を使わず、`find` で要素を探して操作するだけにする。
- **デプロイを変えない。** 「デプロイ」メニュー（新しいデプロイ・デプロイの管理・アクセス権の変更）は、ユーザが明示的に頼んだときだけ操作する。
- **関数を実行しない。** エディタの「実行」「デバッグ」は使わない。`publishSite` を実行すると本番のビルドが始まり、`doGet` 以外の関数も外部 API を呼ぶため。
- **権限の承認や設定の変更はユーザに任せる。** OAuth の承認画面、Apps Script API の有効化（ユーザー設定）、共有設定の変更はユーザが行う。
- **想定外の内容を上書きしない。** エディタの内容が想定した旧版と一致しなければ置き換えず、止めてユーザに確認する（手での修正を消さないため）。
- **アカウントを確認する。** エディタ右上に出る「You're currently signed in as …」の表示が `GAS_GOOGLE_ACCOUNT` と違えば、操作しない。
- 作業が終わったら、自分で開いたタブを閉じる。

## 手順

### 1. 反映する内容を決める

- 反映元（通常は対象 PR のブランチ）の `gas/Code.gs`・`gas/appsscript.json` が新版
- エディタに今入っているはずの版（通常は `main`）が旧版

```sh
SP=<scratchpad>
git show main:gas/Code.gs > "$SP/old.gs"
git show main:gas/appsscript.json > "$SP/old.json"   # main に無ければスキップし、手順 4 の方法で扱う
node .claude/skills/gas-update/scripts/gen-replace.cjs javascript "$SP/old.gs" gas/Code.gs "$SP/set-code.js"
```

### 2. Apps Script エディタを開く

Claude in Chrome（`chrome-browser` スキルの手順で新しいタブ）で、次の URL を開く:

```
https://script.google.com/home/projects/<GAS_SCRIPT_ID>/edit
```

- 複数の Google アカウントにログインしていると、スプレッドシートの「拡張機能 → Apps Script」から開いたときに「ファイルを開くことができません」になることがある。
  その場合は `https://script.google.com/u/<N>/home/projects/<GAS_SCRIPT_ID>/edit` のように、アカウント番号 `<N>`（0, 1, 2 …）を付けて開く。
- 開いたら、右上のアカウント表示が `GAS_GOOGLE_ACCOUNT` であることを確認する（表示が出たら OK で閉じる）。

### 3. Code.gs を置き換える

1. `javascript_tool` で `$SP/set-code.js` の中身を実行する
   - `replaced: N lines` … 置き換えた → 次へ
   - `already-updated` … 反映済み → 保存不要
   - `MISMATCH` … **止める。** エディタの内容が想定と違うことをユーザに伝え、どうするか確認する
2. エディタをクリックしてフォーカスし、`ctrl+s` で保存する。上部に「Saved to Drive」が出ることを確認する

`javascript_tool` の結果は、URL・トークン風の文字列が含まれるとツール側で `[BLOCKED …]` に伏せられる。
エディタの内容そのものを返させず、比較結果（文字列や真偽値）だけを返させる。

### 4. appsscript.json を反映する（変更がある場合）

1. プロジェクトの設定（左の歯車）で「Show "appsscript.json" manifest file in editor」をオンにする
   - **このページはスクリプトプロパティの値が表示されるため、`find` で `Show "appsscript.json"` のラベルを探してクリックするだけにする**
2. エディタに戻り、ファイル一覧の `appsscript.json` をクリックして読み込む
3. 旧版がある場合は `gen-replace.cjs json …` で生成した JS を実行する。旧版が無い場合は、まず今の値のうち比較に必要なキー（`timeZone` / `runtimeVersion` / `webapp` / `oauthScopes`）だけを返させる。
   それがリポジトリ版と食い違っていれば（特に `webapp.access` / `executeAs`）止めてユーザに確認する。一致していれば置き換える
4. `ctrl+s` で保存する

### 5. 反映を確認する

ページを再読み込みし、各ファイルを開き直してから、`javascript_tool` で比較結果だけを返させる（行数・主要な関数があるか・新版と一致するか）。

### 6. 報告

- 反映したファイルと、確認の結果
- ユーザが自分でやる必要がある残りの作業。たとえば次のもの:
  - スクリプトプロパティの追加・変更
  - Apps Script API の有効化
  - 「サイト管理 → 公開する」の実行と、スコープが増えた場合の権限の再承認
  - `doGet` を変えた場合の「デプロイの管理」での新しいバージョンの発行
