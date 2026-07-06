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
├── assets/css/
│   └── main.css            # グローバルスタイル・CSS変数
├── data/
│   ├── site.json           # サイトコンテンツ（gitignore対象）
│   └── site.example.json   # site.json のテンプレート
├── scripts/
│   └── setup-data.sh       # ビルド時のデータ復元スクリプト
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
