---
name: update-site-data
argument-hint: "[セクション名] (例: profile, skills, services, works, career, contact)"
description: >-
  data/site.json の掲載情報を質疑応答形式で更新するスキル。
  現在の値を提示し、変更箇所をユーザに確認してから書き換える。
  「サイト情報を更新したい」「掲載情報を変えたい」「site.jsonを編集して」
  「プロフィールを変えたい」「スキルを更新して」のように求められたときに使う。
  単にsite.jsonの中身を見たいだけのときは使わない。
---

# Update Site Data — サイト情報更新スキル

`data/site.json` の掲載情報を質疑応答形式で確認・更新する。
現在の内容を見せながら「何をどう変えるか」をユーザと一緒に決め、確定してから書き換える。

## 入力

セクション名を受け取る（任意）。指定があればそのセクションのみ、なければ全体を対象にする。

有効なセクション名:
- `profile` — 名前・肩書き・メール・リード文・自己紹介
- `skills` — 技術スキル一覧
- `services` — 個人開発プロダクト
- `works` — ポートフォリオ
- `career` — 経歴
- `contact` — 連絡先・稼働情報
- `links` — 外部リンク（GitHub 等）

## ワークフロー

### 1. 現在のデータ読み込み

`data/site.json` と `types/site.ts` を読み、現在の掲載情報とデータ構造を把握する。

### 2. 対象セクションの確認

引数でセクション指定がある場合はそのセクションのみ対象にする。
指定がない場合は、全セクションの現在値を簡潔に提示し、どのセクションを更新したいかを AskUserQuestion で確認する（複数選択可）。

提示形式の例:
```
| セクション | 現在の内容（冒頭） |
|---|---|
| profile.lead | 「新しい技術にもすぐ対応し…」 |
| profile.about | 「SES企業でのバックエンド…」 |
| skills | 言語 / フレームワーク / DB / その他 の4カテゴリ |
| services | 2件（便利ツール オールインワン, DOTWORK） |
| ... | ... |
```

### 3. セクションごとの質疑応答

対象セクションごとに以下を行う:

1. **現在値を全て表示** — 省略せず、今入っている値をそのまま見せる
2. **変更内容を確認** — AskUserQuestion で変更したい箇所を聞く
   - 選択肢で典型的な操作を提示（「値を変更」「項目を追加」「項目を削除」「変更なし」等）
   - 自由入力で具体的な変更内容を受け付ける
3. **配列データ（skills / services / works / career）の場合**:
   - 既存項目の一覧を番号付きで表示する
   - 「どの項目を変更/追加/削除するか」を確認する
   - 新規追加の場合は、既存項目と同じフィールド構成で入力を求める

各セクションのフィールド:
- **profile**: name, title, email, lead, about
- **skills**: label, items（カテゴリごと）
- **services**: type, category, name, description, tech, link, linkLabel, note
- **works**: title, description, tech, link
- **career**: company, period, items（各itemに period, title, tech）
- **contact**: description, details（各detailに label, value）
- **links**: github（他のキーも追加可）

### 4. 変更内容の確認

全ての変更をまとめて一覧表示し、最終確認を行う。

表示形式:
```
### 変更内容の確認

**profile**
- lead: 「旧値」→「新値」

**skills**
- 「カテゴリ名」を追加: 内容

問題なければ適用します。修正がある場合はお知らせください。
```

AskUserQuestion で「この内容で適用してよいか」を確認する。

### 5. 適用と検証

ユーザの承認後:

1. `data/site.json` を編集する（Edit ツールで差分のみ更新）
2. 型チェックを実行:
   ```sh
   npx nuxi typecheck
   ```
3. ビルド検証:
   ```sh
   npm run build
   ```
4. エラーがあれば修正してから完了報告する

### 6. 完了報告

以下を簡潔に報告する:
- 変更したセクションと内容の要約
- 検証結果（typecheck / build）

**コミットは行わない。** 変更の確認・コミット・PR 作成はユーザまたは issue-handler に任せる。

## やらないこと

- `types/site.ts` の型定義の変更（フィールド追加が必要な場合はユーザに相談する）
- コンポーネント（`.vue` ファイル）の変更
- CSS の変更
- ユーザが確認していない値の変更
- コミットや PR の作成
