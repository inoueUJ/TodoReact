# トラブルシューティングガイド

よくある問題と解決方法をまとめました。

## 目次

- [インストール・セットアップ](#インストールセットアップ)
- [開発環境](#開発環境)
- [ビルド](#ビルド)
- [スタイリング](#スタイリング)
- [タイマー機能](#タイマー機能)
- [通知](#通知)
- [デプロイ](#デプロイ)

---

## インストール・セットアップ

### `npm install`が失敗する

**エラー例**: `EACCES`, `permission denied`

**解決策**:
```bash
# オプション1: npmのキャッシュをクリア
npm cache clean --force
rm -rf node_modules package-lock.json
npm install

# オプション2: Node.jsのバージョンを確認
node --version  # 18.x以上が必要
nvm use 20      # nvmを使っている場合
```

### 依存関係の競合

**エラー例**: `ERESOLVE unable to resolve dependency tree`

**解決策**:
```bash
# --legacy-peer-depsフラグを使用
npm install --legacy-peer-deps

# または、package-lock.jsonを削除して再インストール
rm package-lock.json
npm install
```

---

## 開発環境

### 開発サーバーが起動しない

**症状**: `npm run dev`でエラー

**解決策**:
```bash
# ポート5173が既に使用されている場合
# vite.config.jsにポート設定を追加
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000  # 別のポートを指定
  }
})
```

### HMR（Hot Module Replacement）が動作しない

**症状**: コード変更が反映されない

**解決策**:
1. ブラウザのキャッシュをクリア（Ctrl+Shift+R）
2. 開発サーバーを再起動
3. `.vite`キャッシュフォルダを削除
   ```bash
   rm -rf node_modules/.vite
   npm run dev
   ```

### ESLintエラーが出る

**エラー例**: `'React' must be in scope when using JSX`

**解決策**:
`.eslintrc.cjs`を確認：
```javascript
{
  extends: [
    'plugin:react/jsx-runtime'  # これが必要
  ]
}
```

---

## ビルド

### ビルドが失敗する

**エラー例**: `vite build` で失敗

**チェックリスト**:
1. Lintエラーがないか確認
   ```bash
   npm run lint
   ```

2. 型エラーがないか確認（PropTypes）
   ```bash
   # すべての警告を表示
   npm run lint -- --max-warnings 0
   ```

3. キャッシュをクリア
   ```bash
   rm -rf dist node_modules/.vite
   npm run build
   ```

### ビルドサイズが大きすぎる

**症状**: `dist/`フォルダが10MB以上

**解決策**:
1. バンドルアナライザーを使用
   ```bash
   npm install -D rollup-plugin-visualizer
   ```

   `vite.config.js`:
   ```javascript
   import { visualizer } from 'rollup-plugin-visualizer'

   export default defineConfig({
     plugins: [
       react(),
       visualizer({ open: true })
     ]
   })
   ```

2. 不要な依存関係を削除
3. ダイナミックインポートを使用

---

## スタイリング

### Tailwindクラスが効かない

**症状**: スタイルが適用されない

**解決策**:
1. `tailwind.config.js`の`content`パスを確認
   ```javascript
   content: [
     "./index.html",
     "./src/**/*.{js,ts,jsx,tsx}",  # すべてのファイルをカバー
   ]
   ```

2. PostCSSが正しく設定されているか確認
   ```bash
   # postcss.config.jsを確認
   cat postcss.config.js
   ```

3. ビルドを再実行
   ```bash
   npm run build
   ```

### カスタムカラーが表示されない

**症状**: `text-primary-500`などが効かない

**解決策**:
`tailwind.config.js`で定義されているか確認：
```javascript
theme: {
  extend: {
    colors: {
      primary: {
        500: '#ef4444',
        // ...
      }
    }
  }
}
```

### グラデーションが表示されない

**症状**: `bg-gradient-to-r`が効かない

**解決策**:
- Tailwind CSS v3では標準でサポート
- `from-*`と`to-*`クラスも必要
  ```jsx
  <div className="bg-gradient-to-r from-blue-500 to-purple-500">
  ```

---

## タイマー機能

### タイマーが動かない

**症状**: 開始ボタンを押しても時間が減らない

**チェック項目**:
1. タスクが選択されているか確認
   - タスクを選択してから開始ボタンをクリック

2. コンソールエラーを確認
   ```
   F12 → Console
   ```

3. `useEffect`の依存配列を確認
   ```javascript
   useEffect(() => {
     // タイマーロジック
   }, [isRunning, pomodoroDuration, completePomodoro])
   ```

### タイマーが勝手に止まる

**症状**: 途中でタイマーが停止

**原因**:
- タブが非アクティブ化によるブラウザのthrottling

**解決策**:
Web Workers を使用する（将来実装）:
```javascript
// timer-worker.js
self.onmessage = (e) => {
  if (e.data === 'start') {
    setInterval(() => {
      self.postMessage('tick')
    }, 1000)
  }
}
```

### 円形プログレスバーがカクカクする

**症状**: アニメーションが滑らかでない

**解決策**:
```css
/* index.css */
.circular-progress {
  will-change: stroke-dashoffset;
  transition: stroke-dashoffset 1s linear;
}
```

---

## 通知

### ブラウザ通知が表示されない

**症状**: ポモドーロ完了時に通知が出ない

**解決策**:
1. 通知の許可を確認
   - ブラウザのアドレスバーの🔒アイコン → サイトの設定 → 通知 → 許可

2. コンソールでPermissionを確認
   ```javascript
   console.log(Notification.permission)
   // "granted" であるべき
   ```

3. 手動で許可をリクエスト
   ```javascript
   Notification.requestPermission().then(permission => {
     console.log(permission)
   })
   ```

### 通知音が鳴らない

**症状**: 音が出ない

**原因**:
- ブラウザの自動再生ポリシー
- ユーザーインタラクションが必要

**解決策**:
```javascript
// 最初のクリック時にオーディオを初期化
audioRef.current.play().catch(e => {
  console.log('Audio autoplay prevented:', e)
})
```

---

## デプロイ

### Vercelデプロイが失敗する

**エラー例**: `Build failed`

**解決策**:
1. ローカルでビルドが成功するか確認
   ```bash
   npm run build
   ```

2. Vercelのビルドログを確認
   - Vercelダッシュボード → Deployments → 失敗したデプロイをクリック

3. Node.jsバージョンを指定
   ```json
   // package.json
   {
     "engines": {
       "node": ">=18.0.0"
     }
   }
   ```

### デプロイ後に404エラー

**症状**: リロード時に404

**原因**: SPAルーティングの設定不足

**解決策**:
`vercel.json`を確認（すでに設定済み）:
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### 環境変数が読み込まれない

**症状**: `import.meta.env.VITE_*`が`undefined`

**解決策**:
1. Vercelで環境変数を設定
   - Settings → Environment Variables
   - 変数名は`VITE_`で始める必要がある

2. 再デプロイ

---

## パフォーマンス問題

### アプリが遅い

**症状**: UIの反応が遅い

**解決策**:
1. React DevTools Profilerで計測
2. 不要な再レンダリングを防ぐ
   ```javascript
   const MemoizedComponent = React.memo(Component)
   ```

3. 計算量の多い処理をメモ化
   ```javascript
   const value = useMemo(() => expensiveCalc(), [deps])
   ```

### メモリリーク

**症状**: 長時間使用後に動作が重くなる

**チェック項目**:
1. タイマーのクリーンアップ
   ```javascript
   useEffect(() => {
     const timer = setInterval(...)
     return () => clearInterval(timer)  # 必須！
   }, [])
   ```

2. イベントリスナーのクリーンアップ
3. Chrome DevToolsのMemoryタブで確認

---

## その他

### TypeScriptに移行したい

**手順**:
```bash
# TypeScript依存関係をインストール
npm install -D typescript @types/react @types/react-dom

# tsconfig.jsonを作成
npx tsc --init

# ファイルを.jsx → .tsxに変更
mv src/App.jsx src/App.tsx
```

### テストを追加したい

**手順**:
```bash
# Vitestをインストール
npm install -D vitest @testing-library/react @testing-library/jest-dom

# vitest.config.jsを作成
# package.jsonにtestスクリプトを追加
"test": "vitest"
```

---

## サポート

問題が解決しない場合：

1. 🐛 [GitHubでIssueを作成](https://github.com/inoueUJ/TodoReact/issues/new)
2. 📚 [ドキュメントを確認](https://github.com/inoueUJ/TodoReact/tree/main/docs)
3. 💬 [ディスカッションで質問](https://github.com/inoueUJ/TodoReact/discussions)

---

**最終更新**: 2024年11月
