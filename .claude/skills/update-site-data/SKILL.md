---
name: update-site-data
argument-hint: "[セクション名] (例: profile, skills, services, works, career, contact)"
description: >-
  サイトの掲載情報に関する質問に答えるスキル。
  データは Google Sheets で管理されており、このスキルでは直接編集できない。
  「サイト情報を更新したい」「掲載情報を変えたい」「プロフィールを変えたい」
  のように求められたときに使い、Sheets での編集手順を案内する。
---

# Update Site Data — サイト情報更新スキル

サイトのコンテンツは Google Sheets + GAS API で管理しており、ソースコード内には含まれない。
このスキルでは直接的なデータ編集は行わず、Sheets での編集手順を案内する。

## データ管理の仕組み

- **データの保管場所**: Google Sheets（各セクションがタブに対応）
- **API**: Google Apps Script (GAS) の Web App が JSON を返す
- **サイトへの反映**: Sheets 上部メニュー「サイト管理 → 公開する」で Netlify ビルドが発火
- **セットアップ手順**: `gas/README.md` に記載

## セクション一覧

- `profile` — 名前・肩書き・メール・リード文・自己紹介
- `skills` — 技術スキル一覧
- `services` — 個人開発プロダクト
- `works` — ポートフォリオ
- `career` — 経歴
- `contact` — 連絡先・稼働情報
- `links` — 外部リンク（GitHub 等）

## ワークフロー

### 1. 要望の確認

ユーザがどのセクションの何を変えたいかを把握する。

### 2. シート構成の案内

`gas/README.md` のシート構成を参照し、該当タブのカラム名・入力形式を案内する。

### 3. 型定義の変更が必要な場合

フィールドの追加・削除が必要な場合は以下を同期する:
- `types/site.ts` — 型定義
- `gas/Code.gs` — パーサー
- 該当コンポーネント — 表示ロジック

この場合は issue-handler スキルでの対応を推奨する。

## やらないこと

- ソースコード内のデータファイルの直接編集（データは Sheets で管理）
- コミットや PR の作成
