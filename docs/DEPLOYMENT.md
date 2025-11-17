# デプロイガイド

このドキュメントでは、Pomodoro Tasksアプリケーションをさまざまなプラットフォームにデプロイする方法を説明します。

## 目次

- [Vercel（推奨）](#vercel推奨)
- [Netlify](#netlify)
- [GitHub Pages](#github-pages)
- [Docker](#docker)
- [その他のプラットフォーム](#その他のプラットフォーム)

---

## Vercel（推奨）

現在のプロジェクトはVercelに最適化されています。

### 自動デプロイ（設定済み）

このリポジトリは既にVercelと連携されています：

1. **mainブランチにpush** → 本番環境に自動デプロイ
2. **その他のブランチにpush** → プレビュー環境に自動デプロイ
3. **PR作成** → プレビューURLが自動生成

### 手動デプロイ

新しいプロジェクトとしてデプロイする場合：

```bash
# Vercel CLIをインストール
npm install -g vercel

# ログイン
vercel login

# デプロイ
vercel

# プロダクションにデプロイ
vercel --prod
```

### 環境変数（必要に応じて）

現在、環境変数は使用していませんが、将来的にAPIキーなどを追加する場合：

1. Vercelダッシュボードを開く
2. プロジェクト → Settings → Environment Variables
3. 変数を追加（例: `VITE_API_KEY`）
4. 再デプロイ

**注意**: Viteでは環境変数は`VITE_`プレフィックスが必要です。

### カスタムドメイン

1. Vercelダッシュボード → Settings → Domains
2. カスタムドメインを追加
3. DNSレコードを設定（Vercelが指示を表示）
4. 自動的にHTTPSが有効化

---

## Netlify

### 手動デプロイ

#### Netlify CLI

```bash
# Netlify CLIをインストール
npm install -g netlify-cli

# ログイン
netlify login

# ビルド
npm run build

# デプロイ
netlify deploy --dir=dist

# プロダクションにデプロイ
netlify deploy --prod --dir=dist
```

#### Netlifyダッシュボード

1. [Netlify](https://netlify.com)にログイン
2. "Add new site" → "Import an existing project"
3. GitHubリポジトリを選択
4. ビルド設定：
   - Build command: `npm run build`
   - Publish directory: `dist`
5. "Deploy site"

### netlify.toml設定（オプション）

プロジェクトルートに`netlify.toml`を作成：

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"
```

---

## GitHub Pages

### GitHub Actions経由（推奨）

`.github/workflows/deploy-gh-pages.yml`を作成：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v2
        with:
          path: './dist'

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v3
```

### vite.config.js設定

GitHub Pagesではサブパスでホストされるため、base設定が必要：

```javascript
export default defineConfig({
  plugins: [react()],
  base: '/TodoReact/',  // リポジトリ名に変更
})
```

### 手動デプロイ

```bash
# ビルド
npm run build

# gh-pagesブランチにデプロイ
npx gh-pages -d dist
```

---

## Docker

### Dockerfile

プロジェクトルートに`Dockerfile`を作成：

```dockerfile
# ビルドステージ
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# 本番ステージ
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### nginx.conf

```nginx
server {
  listen 80;
  server_name localhost;
  root /usr/share/nginx/html;
  index index.html;

  location / {
    try_files $uri $uri/ /index.html;
  }

  location /assets/ {
    expires 1y;
    add_header Cache-Control "public, immutable";
  }
}
```

### ビルドと実行

```bash
# Dockerイメージをビルド
docker build -t pomodoro-tasks .

# コンテナを実行
docker run -p 8080:80 pomodoro-tasks

# ブラウザで http://localhost:8080 を開く
```

### docker-compose.yml

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "8080:80"
    restart: unless-stopped
```

実行：

```bash
docker-compose up -d
```

---

## その他のプラットフォーム

### Render

1. [Render](https://render.com)にログイン
2. "New" → "Static Site"
3. GitHubリポジトリを接続
4. 設定：
   - Build Command: `npm run build`
   - Publish Directory: `dist`
5. "Create Static Site"

### Cloudflare Pages

1. [Cloudflare Pages](https://pages.cloudflare.com)にログイン
2. "Create a project"
3. GitHubリポジトリを接続
4. ビルド設定：
   - Build command: `npm run build`
   - Build output directory: `dist`
5. "Save and Deploy"

### Railway

```bash
# Railway CLIをインストール
npm install -g @railway/cli

# ログイン
railway login

# プロジェクトを初期化
railway init

# デプロイ
railway up
```

---

## デプロイ前チェックリスト

- [ ] `npm run build`が成功する
- [ ] `npm run lint`でエラーがない
- [ ] ビルドサイズを確認（`dist/`フォルダ）
- [ ] 本番環境用の環境変数を設定（必要な場合）
- [ ] カスタムドメインのDNS設定（必要な場合）
- [ ] SSL証明書が有効（ほとんどのプラットフォームは自動）
- [ ] セキュリティヘッダーが設定されている
- [ ] 404ページのリダイレクト設定（SPA用）

## パフォーマンス最適化

### ビルド最適化

すでに実装済み：
- ✅ Viteの自動コード分割
- ✅ ツリーシェイキング
- ✅ ミニフィケーション
- ✅ アセットハッシュ化

### CDN設定

主要プラットフォームはすべてグローバルCDNを使用：
- Vercel: Edge Network
- Netlify: Global CDN
- Cloudflare Pages: Cloudflare CDN

### キャッシュ戦略

```
/index.html → no-cache（常に最新）
/assets/*   → max-age=31536000, immutable（1年間キャッシュ）
```

---

## トラブルシューティング

### 404エラー

**症状**: リロード時に404エラー

**解決策**: SPAのリダイレクト設定を追加
- Vercel: `vercel.json`の`rewrites`（すでに設定済み）
- Netlify: `_redirects`または`netlify.toml`
- GitHub Pages: `404.html`を`index.html`のコピーとして作成

### 環境変数が読み込まれない

**症状**: `import.meta.env.VITE_*`が`undefined`

**解決策**:
1. 変数名が`VITE_`で始まっているか確認
2. `.env`ファイルがルートディレクトリにあるか確認
3. デプロイプラットフォームで環境変数を設定

### ビルドがタイムアウト

**症状**: ビルド時間が長すぎる

**解決策**:
1. `node_modules`を削除して再インストール
2. キャッシュを利用（ほとんどのプラットフォームは自動）
3. ビルドタイムアウト設定を延長

---

**最終更新**: 2024年11月
**推奨プラットフォーム**: Vercel
