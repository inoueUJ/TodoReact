# CLAUDE.md - AI Assistant Guide for TodoReact

**Last Updated:** 2024-11-17
**Project:** Pomodoro Tasks (TodoReact)
**Type:** React + Vite + Tailwind CSS Application

## Project Overview

Pomodoro Tasksは、ポモドーロテクニックを活用した本格的なタスク管理アプリケーションです。美しいUI、円形プログレスバー、リアルタイムタイマーを備えた完全な機能を持つプロダクションレディなアプリです。

### 現在の実装状況

✅ **完全実装済み**
- ポモドーロタイマー（カスタマイズ可能）
- タスク管理（追加・削除・完了管理）
- 円形プログレスバー
- ブラウザ通知
- レスポンシブデザイン
- PWA対応メタタグ
- 包括的なCI/CD
- 完全なドキュメント

### Technology Stack

- **Framework:** React 18.2.0
- **Build Tool:** Vite 4.5.14
- **Styling:** Tailwind CSS 3.4.17
- **Icons:** Lucide React 0.553.0
- **Utilities:** clsx, tailwind-merge, class-variance-authority
- **Language:** JavaScript (JSX)
- **Package Manager:** npm
- **Code Quality:** ESLint
- **Deployment:** Vercel（自動デプロイ設定済み）

## Project Structure

```
TodoReact/
├── .github/                    # GitHub設定・CI/CD
│   ├── workflows/             # GitHub Actions
│   │   ├── ci.yml            # CI パイプライン
│   │   └── security.yml      # セキュリティ監査
│   ├── ISSUE_TEMPLATE/       # Issue テンプレート
│   ├── CONTRIBUTING.md       # コントリビューションガイド
│   ├── dependabot.yml        # 依存関係自動更新
│   └── pull_request_template.md
├── docs/                      # ドキュメント
│   ├── ARCHITECTURE.md       # アーキテクチャ解説
│   ├── DEPLOYMENT.md         # デプロイガイド
│   └── TROUBLESHOOTING.md    # トラブルシューティング
├── public/                    # 静的ファイル
│   └── icon.svg              # カスタムトマトアイコン
├── src/
│   ├── components/           # Reactコンポーネント
│   │   └── ui/              # 再利用可能なUIコンポーネント
│   │       ├── button.jsx
│   │       ├── input.jsx
│   │       ├── checkbox.jsx
│   │       └── circular-progress.jsx
│   ├── lib/                 # ユーティリティ
│   │   └── utils.js
│   ├── App.jsx              # メインアプリケーション
│   ├── App.css              # アプリスタイル
│   ├── index.css            # グローバルスタイル
│   └── main.jsx             # エントリーポイント
├── .editorconfig            # エディタ設定
├── .nvmrc                   # Node.jsバージョン指定
├── index.html               # HTMLテンプレート
├── LICENSE                  # MITライセンス
├── package.json             # 依存関係
├── postcss.config.js        # PostCSS設定
├── README.md                # プロジェクト README
├── tailwind.config.js       # Tailwind設定
├── vercel.json              # Vercel設定
└── vite.config.js           # Vite設定
```

## Key Components

### メインアプリケーション (src/App.jsx)

ポモドーロタイマーアプリの中核：
- **タスク管理**: 追加、削除、完了管理、選択
- **タイマー機能**: 開始、一時停止、リセット
- **通知**: ブラウザ通知とサウンド
- **状態管理**: React Hooks（useState, useEffect, useCallback, useRef）

### UIコンポーネント (src/components/ui/)

shadcn/ui風のカスタムコンポーネント：
- **Button**: グラデーション、複数バリアント（default, outline, ghost, accent）
- **Input**: フォーカス状態、バリデーション対応
- **Checkbox**: グラデーション、アクセシビリティ対応
- **CircularProgress**: SVGベースの円形プログレスバー

## Development Workflows

### 開発サーバー起動

```bash
npm install
npm run dev
```

### ビルド

```bash
npm run build       # プロダクションビルド
npm run preview     # ビルドのプレビュー
npm run lint        # ESLintチェック
```

### CI/CD

GitHub Actionsが自動実行：
- **Push時**: ESLint + ビルドチェック（Node 18.x & 20.x）
- **PR時**: 依存関係レビュー
- **週次**: セキュリティ監査

## Styling Architecture

### Tailwind CSS設定 (tailwind.config.js)

カスタマイズ内容：
- **カラーパレット**: primary（赤）、accent（オレンジ）
- **グラデーション**: gradient-primary, gradient-warm, gradient-sunset
- **シャドウ**: soft, medium, large, colored, glow
- **アニメーション**: fade-in, slide-up, scale-in, pulse-slow

### グローバルスタイル (src/index.css)

- Google Fonts（Inter, Fira Code）
- カスタムスクロールバー（グラデーション）
- スムーズスクロール

## State Management

### ローカル状態（useState）

```javascript
// タスク
const [tasks, setTasks] = useState([])
const [currentTaskId, setCurrentTaskId] = useState(null)

// タイマー
const [timeRemaining, setTimeRemaining] = useState(25 * 60)
const [isRunning, setIsRunning] = useState(false)
const [pomodoroDuration, setPomodoroDuration] = useState(25)
```

### 副作用（useEffect）

- タイマーのインターバル管理
- 通知パーミッションリクエスト

### Refs（useRef）

- `intervalRef`: setIntervalのIDを保持
- `audioRef`: 通知音の再生

## Deployment

### Vercel（メイン）

- 自動デプロイ設定済み
- セキュリティヘッダー設定済み
- アセットキャッシュ最適化

### その他のプラットフォーム

詳細は `docs/DEPLOYMENT.md` を参照

## Documentation

プロジェクトには包括的なドキュメントが用意されています：

- **README.md**: プロジェクト概要、クイックスタート
- **docs/ARCHITECTURE.md**: 技術アーキテクチャ、設計決定
- **docs/DEPLOYMENT.md**: デプロイ手順（複数プラットフォーム）
- **docs/TROUBLESHOOTING.md**: よくある問題と解決方法
- **.github/CONTRIBUTING.md**: コントリビューションガイド

## AI Assistant Guidelines

### コード変更時の推奨事項

1. **ビルド確認**
   ```bash
   npm run lint    # エラーがないことを確認
   npm run build   # ビルドが成功することを確認
   ```

2. **コンポーネント追加時**
   - `src/components/ui/` に配置
   - PropTypesで型定義
   - forwardRefでref対応
   - アクセシビリティ考慮

3. **スタイル追加時**
   - Tailwindユーティリティクラスを優先
   - カスタムクラスは `tailwind.config.js` で定義
   - レスポンシブ対応（sm:, md:, lg:）

4. **状態管理**
   - 複雑な状態はuseReducerを検討
   - グローバル状態が必要な場合はContext API
   - パフォーマンス最適化にuseMemo/useCallback

### 拡張しやすい機能

- LocalStorage永続化
- ダークモード（Tailwind darkモード）
- タスクカテゴリ・タグ
- 統計ダッシュボード
- エクスポート/インポート
- キーボードショートカット

## Testing（将来実装）

推奨スタック：
- **Unit**: Vitest
- **Component**: React Testing Library
- **E2E**: Playwright

## Security

実装済みのセキュリティ対策：
- XSS対策（Reactの自動エスケープ）
- セキュリティヘッダー（Vercel設定）
- 依存関係スキャン（Dependabot + npm audit）
- HTTPS強制（Vercel自動）

## Common Gotchas

1. **Tailwind v3使用中**: v4ではなくv3.4.17を使用（安定性のため）
2. **環境変数**: `VITE_`プレフィックスが必要
3. **ブランチ命名**: `claude/`で始まり、セッションIDで終わる必要がある
4. **通知**: ユーザーインタラクション後のみ自動再生可能

## Performance Optimization

実装済み：
- ✅ Vite高速ビルド
- ✅ useCallbackでのメモ化
- ✅ アセットキャッシュ（1年）
- ✅ コード分割（Vite自動）

## Support Resources

- 📖 [README](README.md)
- 🏗️ [アーキテクチャ](docs/ARCHITECTURE.md)
- 🚀 [デプロイ](docs/DEPLOYMENT.md)
- 🔧 [トラブルシューティング](docs/TROUBLESHOOTING.md)
- 🤝 [コントリビューション](.github/CONTRIBUTING.md)

---

**Note**: このファイルはAIアシスタント向けのガイドです。ユーザー向けドキュメントは `README.md` を参照してください。
