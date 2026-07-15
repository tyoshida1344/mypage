# mypage

プロフィールサイト

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

Netlify にリポジトリを接続して自動デプロイを設定します。

1. [Netlify](https://app.netlify.com/) にログインし、**Add new site** → **Import an existing project** を選択
2. GitHub を連携し、`tyoshida1344/mypage` リポジトリを選択
3. ビルド設定は `netlify.toml` から自動で読み込まれるため変更不要
4. **Deploy site** をクリック

以降は `main` ブランチへのプッシュで自動デプロイされます。

## プロジェクト構成

```
├── app.vue                 # ルートコンポーネント
├── pages/
│   └── index.vue           # トップページ
├── components/             # 各セクションのVueコンポーネント
├── composables/
│   └── useSiteData.ts      # サイトデータ取得 composable
├── server/api/
│   └── site-data.get.ts    # GAS API からデータ取得
├── assets/css/
│   └── main.css            # グローバルスタイル・CSS変数
├── gas/
│   ├── Code.gs             # GAS スクリプト
│   └── README.md           # GAS セットアップ手順
├── nuxt.config.ts          # Nuxt 設定
└── netlify.toml            # Netlify デプロイ設定
```

## コンテンツの編集

サイトのコンテンツは Google Sheets で管理しています。
セットアップ手順やシート構成は [gas/README.md](gas/README.md) を参照してください。
