# GAS (Google Apps Script) — サイトデータ API

Google Sheets のデータを JSON API として公開する GAS スクリプト。
Nuxt がビルド時にこの API からサイトデータを取得する。

## セットアップ手順

### 1. Google Sheets を作成

新しいスプレッドシートを作成し、下記「シート構成」に従ってタブとヘッダー行を作成する。

### 2. GAS スクリプトを登録

1. スプレッドシートの「拡張機能 → Apps Script」を開く
2. `Code.gs` の内容をエディタに貼り付けて保存
3. 「プロジェクトの設定 → 「appsscript.json」マニフェスト ファイルをエディタで表示する」にチェックを入れ、`appsscript.json` の内容を貼り付けて保存
   - 「公開する」でデプロイ一覧を読むための `script.deployments.readonly` スコープを含む
4. [Apps Script の設定](https://script.google.com/home/usersettings) で「Google Apps Script API」をオンにする

### 3. スクリプトプロパティを設定

Apps Script エディタで「プロジェクトの設定 → スクリプト プロパティ」に以下を追加:

| プロパティ名 | 値 |
|---|---|
| `NETLIFY_BUILD_HOOK` | Netlify の Build Hook URL（Site configuration → Build & deploy → Build hooks で発行） |
| `NETLIFY_ACCESS_TOKEN` | Netlify の Personal access token（User settings → Applications → Personal access tokens で発行） |
| `NETLIFY_SITE_ID` | Netlify のサイト ID（Site configuration → General → Site details の「Site ID」） |

### 4. Web App としてデプロイ

1. Apps Script エディタで「デプロイ → 新しいデプロイ」
2. 種類: 「ウェブアプリ」
3. アクセスできるユーザー: 「全員」
4. デプロイして表示される URL を控える（ローカル開発用）

### 5. Nuxt 側の環境変数を設定

```
NUXT_GAS_API_URL=https://script.google.com/macros/s/xxxxx/exec
```

- ローカル: `.env` ファイルに記載
- Netlify: 「公開する」の実行時に自動で設定・更新されるため、手動の設定は不要（後述「サイトへの反映」）

## シート構成

### `profile` タブ

1行目がヘッダー、2行目にデータを記入（1行のみ）。

| siteUrl | name | title | email | lead | about |
|---|---|---|---|---|---|
| `https://example.com` | 吉田 大河 | Web・モバイルエンジニア / 個人事業主 | email@example.com | サーバーサイド・Web・モバイルまで... | SES企業でのバックエンド開発を経て... |

- `lead`: 改行を含む場合はセル内改行（Alt+Enter）を使用

### `skills` タブ

| label | items |
|---|---|
| 言語 | Java · Kotlin · JavaScript · TypeScript · Dart |
| フレームワーク | Spring Boot · Vue · React · Flutter · React Native |
| DB | MySQL · PostgreSQL |
| その他 | Git · GitHub · Claude Code |

### `services` タブ

| type | name | description | tech | image1 | image2 | image3 | image4 | link | linkLabel | note | status |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Chrome拡張 | 便利ツール オールインワン | 文字列生成・エポック変換... | JavaScript · CSS · ... | (画像URL) | (画像URL) | (画像URL) | (画像URL) | https://github.com/... | GitHub から入手 | git clone してご利用ください | |

- `image1`〜`image4`: Google Drive の共有リンク URL を記入（不要な列は空欄）
- Google Drive 画像URL の形式: `https://lh3.googleusercontent.com/d/FILE_ID`
  - ファイルの共有設定を「リンクを知っている全員」に変更してから使用する

### `works` タブ

| title | description | tech | thumb | link | status |
|---|---|---|---|---|---|
| プロフィールサイト | 本サイト。Nuxt 3 で構築した... | Nuxt 3 · Vue 3 · TypeScript | (サムネイルURL) | https://github.com/... | |

- `thumb`: サムネイル画像の Google Drive 共有リンク URL（空欄・読込失敗時は「No Image」を表示）
- `status`: 後述「公開停止・非公開」を参照

### 公開停止・非公開（`services` / `works` 共通）

`status` 列の値で、項目の出し方を切り替える。

| `status` | サイトでの表示 |
|---|---|
| 空欄 | 通常どおり表示する |
| `停止中` | 「公開停止中」として表示する。カードはリンクにならず、リンクボタン（Works は「見る ↗」）が「公開停止中」バッジに置き換わる。`link` の URL はサイトのページ・データに含まれない |
| `非公開` | サイトに一切表示しない。項目の内容はサイトのページ・データに含まれない |

- どちらも Nuxt のサーバー API で処理するため、開発者ツールからも URL・内容は見えない
- `status` 列（`works` は F 列、`services` は L 列の2行目以降）にはデータの入力規則でプルダウン（`停止中` / `非公開`）を設定しており、それ以外の値は入力できない。空欄に戻すときはセルの内容を削除する
- 通常公開に戻すときは `status` を空欄にする
- 変更後は「サイト管理 → 公開する」で反映する

### `career` タブ

同じ `company` の行がグループ化される。会社ごとに `company` と `period` は最初の行にのみ記入すればよい（2行目以降は空欄でも可）。

| company | period | item_period | item_title | item_tech |
|---|---|---|---|---|
| SES企業 | 2020.04 – 2023.08 | '20.07–'21.07 | 人間ドック予約サイトの開発・運用・保守 | Java(Seasar2) · JSP · AWS · Oracle |
| SES企業 | | '21.08–'22.12 | オンライン決済システムの開発 | Vue3 · Java(Spring Boot) · MySQL |
| SES企業 | | '22.12–'23.08 | 後払いシステムのシステムテスト | Java(Spring Boot) · AWS · PostgreSQL |
| 個人事業主 | 2024.04 – 現在 | '24.04–'24.07 | 新人研修の技術講師・学習サポート | Java · Linux · AWS · PostgreSQL |
| 個人事業主 | | '24.08–'25.05 | 書籍販売 EC サイトの Web アプリ開発 | Nuxt3(TS) · Remix(TS) · Terraform · Shopify |

- `company` が変わる行で新しいグループが始まる
- 同じ `company` が続く行は `company`・`period` を空欄にしてよい

### `contact` タブ

| description | detail_label | detail_value |
|---|---|---|
| バックエンド・フロントエンド・モバイルまでフルスタックでご相談ください。 | 稼働形態 | フルリモート希望。移動時間次第で週3程度の出社可能。... |
| | 稼働日数 | 〜週5日 / 稼働時間は応相談 |

- `description` は1行目にのみ記入
- 2行目以降は `detail_label` と `detail_value` のみ記入

### `links` タブ

| github |
|---|
| https://github.com/tyoshida1344 |

- `github` が空欄の場合、フッターと Works セクションの GitHub リンクは表示されない

## 使い方

### データ編集

スプレッドシートの各タブを直接編集する。

### サイトへの反映

スプレッドシート上部のメニュー「サイト管理 → 公開する」をクリック。
Netlify のビルドが開始され、数分後にサイトに反映される。

「公開する」は次の順に処理する:

1. Apps Script API でデプロイ一覧を取得し、更新日時が最新のウェブアプリ版デプロイの URL を求める
2. その URL を Netlify の環境変数 `NUXT_GAS_API_URL` に同期する（同じ値なら変更しない。未作成なら作成する）
3. Netlify の Build Hook を呼び出してビルドを開始する

- 1・2 に失敗した場合は、ビルドを開始せずに原因をダイアログで表示する
- GAS を新しいデプロイで公開して URL が変わっても、そのまま「公開する」を実行すればよい

### データ取得に失敗したとき

Nuxt のビルドが GAS からデータを取得できなかった場合（通信エラー・HTTP エラー・JSON でないレスポンス・形式が `SiteData` と異なる場合）は、ビルドを失敗させる。
Netlify は前回成功したデプロイを公開したままにするため、コンテンツのないページは公開されない。
失敗の原因は Netlify の Deploy log で確認する。

## API レスポンス形式

`doGet()` が返す JSON は `types/site.ts` の `SiteData` 型に準拠する:

```json
{
  "siteUrl": "https://example.com",
  "profile": {
    "name": "...",
    "title": "...",
    "email": "...",
    "lead": "...",
    "about": "..."
  },
  "skills": [
    { "label": "...", "items": "..." }
  ],
  "services": [
    {
      "type": "...",
      "name": "...",
      "description": "...",
      "tech": "...",
      "images": ["url1", "url2"],
      "link": "...",
      "linkLabel": "...",
      "note": "...",
      "status": ""
    }
  ],
  "works": [
    { "title": "...", "description": "...", "tech": "...", "thumb": "...", "link": "...", "status": "" }
  ],
  "career": [
    {
      "company": "...",
      "period": "...",
      "items": [
        { "period": "...", "title": "...", "tech": "..." }
      ]
    }
  ],
  "contact": {
    "description": "...",
    "details": [
      { "label": "...", "value": "..." }
    ]
  },
  "links": {
    "github": "..."
  }
}
```
