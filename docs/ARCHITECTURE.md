# アーキテクチャドキュメント

## プロジェクト構成

```
TodoReact/
├── .github/                    # GitHub設定・ワークフロー
│   ├── workflows/             # CI/CDパイプライン
│   ├── ISSUE_TEMPLATE/        # Issue テンプレート
│   ├── CONTRIBUTING.md        # コントリビューションガイド
│   ├── dependabot.yml         # 依存関係自動更新
│   └── pull_request_template.md
├── docs/                      # ドキュメント
│   ├── ARCHITECTURE.md        # このファイル
│   ├── DEPLOYMENT.md          # デプロイガイド
│   └── TROUBLESHOOTING.md     # トラブルシューティング
├── public/                    # 静的ファイル
│   └── icon.svg              # アプリアイコン
├── src/
│   ├── components/           # Reactコンポーネント
│   │   └── ui/              # 再利用可能なUIコンポーネント
│   │       ├── button.jsx
│   │       ├── input.jsx
│   │       ├── checkbox.jsx
│   │       └── circular-progress.jsx
│   ├── lib/                 # ユーティリティ関数
│   │   └── utils.js
│   ├── App.jsx              # メインアプリケーション
│   ├── App.css              # アプリスタイル
│   ├── index.css            # グローバルスタイル
│   └── main.jsx             # エントリーポイント
├── index.html               # HTMLテンプレート
├── package.json             # 依存関係定義
├── vite.config.js           # Vite設定
├── tailwind.config.js       # Tailwind CSS設定
├── postcss.config.js        # PostCSS設定
└── vercel.json              # Vercel デプロイ設定
```

## 技術スタック詳細

### フロントエンド

#### React 18.2.0
- **Hooks**: `useState`, `useEffect`, `useRef`, `useCallback`
- **StrictMode**: 開発時の潜在的な問題検出
- **Fast Refresh**: HMRによる高速な開発体験

#### Vite 4.3.2
- **超高速ビルド**: esbuildベースのビルドツール
- **HMR**: ホットモジュールリプレースメント
- **プロダクション最適化**: 自動コード分割、ツリーシェイキング

### スタイリング

#### Tailwind CSS 3.4.17
- **ユーティリティファースト**: インラインクラスで高速開発
- **カスタムカラー**: primary（赤）、accent（オレンジ）
- **カスタムアニメーション**: fade-in, slide-up, scale-in, pulse-slow
- **レスポンシブ**: `sm:`, `md:`, `lg:`, `xl:` ブレークポイント

#### ユーティリティライブラリ
- **clsx**: 条件付きクラス名の結合
- **tailwind-merge**: Tailwindクラスの競合解決
- **class-variance-authority**: バリアントベースのスタイリング

### UIコンポーネント

#### カスタムコンポーネント（shadcn/ui風）
```
components/ui/
├── button.jsx          # ボタン（variant: default, outline, ghost, accent）
├── input.jsx           # 入力フィールド
├── checkbox.jsx        # チェックボックス
└── circular-progress.jsx  # 円形プログレスバー
```

すべてのコンポーネントは：
- PropTypesで型チェック
- forwardRefでref対応
- アクセシビリティ対応
- カスタマイズ可能

### アイコン

**Lucide React 0.553.0**
- ツリーシェイキング対応
- 使用アイコン: Play, Pause, RotateCcw, Plus, Trash2, Settings

## 状態管理

### ローカル状態（useState）

```jsx
// タスク管理
const [tasks, setTasks] = useState([])
const [currentTaskId, setCurrentTaskId] = useState(null)

// タイマー
const [timeRemaining, setTimeRemaining] = useState(25 * 60)
const [isRunning, setIsRunning] = useState(false)
const [pomodoroDuration, setPomodoroDuration] = useState(25)
```

### 副作用（useEffect）

```jsx
// タイマーのインターバル管理
useEffect(() => {
  if (isRunning) {
    intervalRef.current = setInterval(() => {
      setTimeRemaining(prev => prev - 1)
    }, 1000)
  }
  return () => clearInterval(intervalRef.current)
}, [isRunning])

// 通知パーミッションのリクエスト
useEffect(() => {
  if ('Notification' in window) {
    Notification.requestPermission()
  }
}, [])
```

### Ref（useRef）

```jsx
const intervalRef = useRef(null)  // インターバルID保持
const audioRef = useRef(null)     // 通知音の再生
```

## データフロー

```
User Action (タスク追加)
    ↓
addTask()
    ↓
setTasks([...tasks, newTask])
    ↓
State Update
    ↓
Re-render
    ↓
UI Update
```

```
User Action (タイマー開始)
    ↓
startTimer()
    ↓
setIsRunning(true)
    ↓
useEffect Triggered
    ↓
setInterval() Started
    ↓
Every 1 second: setTimeRemaining(prev => prev - 1)
    ↓
When timeRemaining === 0
    ↓
completePomodoro()
    ↓
- Update task.pomodorosCompleted
- Play notification sound
- Show browser notification
- Reset timer
```

## ビルドプロセス

### 開発モード
```bash
npm run dev
  ↓
Vite Dev Server
  ↓
- Fast Refresh (HMR)
- Source Maps
- Development Builds
```

### プロダクションビルド
```bash
npm run build
  ↓
Vite Build (Rollup)
  ↓
- Minification
- Tree Shaking
- Code Splitting
- Asset Optimization
  ↓
dist/
├── index.html
├── assets/
│   ├── index-[hash].css
│   └── index-[hash].js
```

## デプロイアーキテクチャ

### Vercel
```
GitHub Push
    ↓
Vercel Webhook
    ↓
Build (npm run build)
    ↓
Deploy to CDN
    ↓
- Global Edge Network
- Automatic HTTPS
- Cache Headers
- Security Headers
```

### CDN Configuration
```json
{
  "headers": [
    {
      "source": "/assets/(.*)",
      "Cache-Control": "public, max-age=31536000, immutable"
    },
    {
      "source": "/(.*)",
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY"
    }
  ]
}
```

## パフォーマンス最適化

### 実装済み
- ✅ Viteの高速ビルド
- ✅ Lazy Loading（潜在的にReact.lazyで拡張可能）
- ✅ Memoization（useCallbackでresetTimer, completePomodoroをメモ化）
- ✅ 不要な再レンダリングの防止
- ✅ アセットキャッシュ（1年間）
- ✅ 画像最適化（SVG使用）

### 将来的な改善案
- 🔄 React.memoでコンポーネントのメモ化
- 🔄 useMemoで計算結果のメモ化
- 🔄 仮想化（長いタスクリストの場合）
- 🔄 Service Workerでオフライン対応
- 🔄 Web Workersでタイマー処理

## セキュリティ

### 実装済み
- ✅ XSS対策（Reactの自動エスケープ）
- ✅ CSRF対策（Vercelのセキュリティヘッダー）
- ✅ Content Security Policy準備
- ✅ 依存関係の脆弱性スキャン（Dependabot + npm audit）

### ベストプラクティス
- 環境変数は使用していない（すべてクライアントサイド）
- 外部APIコールなし
- ローカルストレージ未使用（将来実装時は注意が必要）

## 拡張性

### 追加しやすい機能
1. **LocalStorage永続化**: タスクの保存
2. **ダークモード**: Tailwindのdarkモード
3. **タスクカテゴリ**: 色分け・フィルタリング
4. **統計ダッシュボード**: 完了したポモドーロ数のグラフ
5. **サウンドカスタマイズ**: 通知音の選択
6. **テーマ選択**: カラースキームの変更
7. **キーボードショートカット**: アクセシビリティ向上
8. **エクスポート/インポート**: JSON形式でデータ移行

## テスト戦略（将来実装）

```
Unit Tests (Vitest)
  ↓
Component Tests (React Testing Library)
  ↓
Integration Tests
  ↓
E2E Tests (Playwright)
```

---

**更新日**: 2024年11月
