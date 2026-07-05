# mypage

ポートフォリオサイト

## 技術スタック

- [Nuxt 3](https://nuxt.com/) — Vue 3 ベースのフレームワーク
- TypeScript
- Netlify（静的ホスティング）

## 開発

```bash
npm install
npm run dev
```

`http://localhost:3000` で開発サーバーが起動します。

## ビルド

```bash
# 静的サイトを生成
npm run generate

# 生成結果をローカルでプレビュー
npm run preview
```

## デプロイ

Netlify にリポジトリを接続すると、`main` ブランチへのプッシュで自動デプロイされます。

| 設定項目 | 値 |
|---|---|
| Build command | `npm run generate` |
| Publish directory | `.output/public` |

## プロジェクト構成

```
├── app.vue                 # ルートコンポーネント
├── data/
│   └── site.json            # サイトコンテンツ（氏名・経歴・スキル等）
├── pages/
│   └── index.vue           # トップページ
├── components/
│   ├── AppHeader.vue       # ナビゲーション
│   ├── HeroSection.vue     # ヒーローセクション
│   ├── SectionWrapper.vue  # セクション共通レイアウト
│   ├── AboutSection.vue    # 自己紹介
│   ├── SkillsSection.vue   # 技術スキル
│   ├── ServiceSection.vue  # 提供サービス
│   ├── WorksSection.vue    # ポートフォリオ
│   ├── CareerSection.vue   # 経歴
│   ├── ContactSection.vue  # 連絡先
│   └── AppFooter.vue       # フッター
├── assets/css/
│   └── main.css            # グローバルスタイル・CSS変数
├── public/                 # 画像等の静的ファイル（favicon 等）
├── nuxt.config.ts          # Nuxt 設定
└── netlify.toml            # Netlify デプロイ設定
```

## コンテンツの編集

氏名・経歴・スキル・ポートフォリオなどのコンテンツは `data/site.json` に集約しています。
Vue コンポーネントを編集せずに、この JSON ファイルだけでサイトの内容を更新できます。

`data/site.json` は `.gitignore` 対象のため Git には含まれません。
`data/site.example.json` を参考にして `data/site.json` を作成してください。

```bash
cp data/site.example.json data/site.json
```

### Netlify での設定

Netlify の環境変数 `SITE_DATA` に `site.json` を Base64 エンコードした値を登録すると、ビルド時に自動で復元されます。

```bash
# エンコード例
cat data/site.json | base64
```
