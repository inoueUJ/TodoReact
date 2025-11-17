# 🍅 Pomodoro Tasks

[![CI](https://github.com/inoueUJ/TodoReact/actions/workflows/ci.yml/badge.svg)](https://github.com/inoueUJ/TodoReact/actions/workflows/ci.yml)
[![Security Audit](https://github.com/inoueUJ/TodoReact/actions/workflows/security.yml/badge.svg)](https://github.com/inoueUJ/TodoReact/actions/workflows/security.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

ポモドーロテクニックを活用した、美しく直感的なタスク管理アプリケーション。

[🌐 デモを見る](https://todoreact.vercel.app/) | [📝 Issue報告](https://github.com/inoueUJ/TodoReact/issues) | [🤝 コントリビュート](.github/CONTRIBUTING.md)

![Pomodoro Tasks Screenshot](public/icon.svg)

## ✨ 特徴

- 🍅 **ポモドーロタイマー**: 25分の集中セッションで生産性を最大化
- ⭕ **円形プログレス**: リアルタイムで残り時間を視覚的に表示
- 📋 **タスク管理**: シンプルで直感的なタスクリスト
- 🎨 **美しいUI**: グラデーションと滑らかなアニメーション
- 📱 **レスポンシブ**: デスクトップからモバイルまで完全対応
- 🔔 **通知機能**: ポモドーロ完了時に通知
- ⚡ **高速**: Vite + Reactで超高速な開発体験
- 🌐 **PWA対応**: モバイルアプリとして追加可能

## 🚀 クイックスタート

### 前提条件

- Node.js 18.x以上
- npm 9.x以上

### インストール

```bash
# リポジトリをクローン
git clone https://github.com/inoueUJ/TodoReact.git
cd TodoReact

# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev
```

開発サーバーが起動したら、ブラウザで http://localhost:5173 を開いてください。

## 📦 ビルド

```bash
# プロダクションビルド
npm run build

# ビルドのプレビュー
npm run preview
```

## 🛠️ 技術スタック

- **フレームワーク**: [React 18](https://react.dev/)
- **ビルドツール**: [Vite 4](https://vitejs.dev/)
- **スタイリング**: [Tailwind CSS 3](https://tailwindcss.com/)
- **アイコン**: [Lucide React](https://lucide.dev/)
- **ユーティリティ**:
  - [clsx](https://github.com/lukeed/clsx)
  - [tailwind-merge](https://github.com/dcastil/tailwind-merge)
  - [class-variance-authority](https://cva.style/)

## 📖 使い方

### タスクの追加

1. 「新しいタスクを追加」セクションにタスク名を入力
2. 予想作業時間（分）を設定
3. ➕ ボタンをクリック

### タイマーの開始

1. タスクリストから作業するタスクをクリック
2. 右側のタイマーで「開始」ボタンをクリック
3. 25分間集中して作業
4. タイマーが終了したら通知が届きます

### ポモドーロ時間のカスタマイズ

1. タイマー右上の⚙️アイコンをクリック
2. 希望する時間（分）を入力
3. 「保存」をクリック

## 🏗️ プロジェクト構成

```
TodoReact/
├── .github/                 # GitHub設定
│   ├── workflows/          # CI/CDワークフロー
│   ├── ISSUE_TEMPLATE/     # Issueテンプレート
│   ├── CONTRIBUTING.md     # コントリビューションガイド
│   └── dependabot.yml      # Dependabot設定
├── public/                  # 静的ファイル
│   └── icon.svg            # アプリアイコン
├── src/
│   ├── components/
│   │   └── ui/             # 再利用可能なUIコンポーネント
│   ├── lib/                # ユーティリティ関数
│   ├── App.jsx             # メインアプリケーション
│   ├── App.css             # アプリスタイル
│   ├── index.css           # グローバルスタイル
│   └── main.jsx            # エントリーポイント
├── index.html              # HTMLテンプレート
├── package.json            # 依存関係
├── vite.config.js          # Vite設定
├── tailwind.config.js      # Tailwind設定
├── postcss.config.js       # PostCSS設定
└── vercel.json             # Vercel設定

## 🤝 コントリビューション

貢献を歓迎します！詳細は [CONTRIBUTING.md](.github/CONTRIBUTING.md) をご覧ください。

### 開発ワークフロー

1. このリポジトリをフォーク
2. 新しいブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'feat: add amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 📋 スクリプト

| コマンド | 説明 |
|---------|------|
| `npm run dev` | 開発サーバーを起動 |
| `npm run build` | プロダクションビルド |
| `npm run preview` | ビルドのプレビュー |
| `npm run lint` | ESLintチェック |

## 🔒 セキュリティ

セキュリティの脆弱性を発見した場合は、公開せずに直接報告してください。

## 📄 ライセンス

このプロジェクトはMITライセンスの下でライセンスされています。

## 👏 謝辞

- [Pomodoro Technique®](https://francescocirillo.com/pages/pomodoro-technique) - Francesco Cirillo
- デザインインスピレーション: モダンなプロダクティビティアプリ各種
- コミュニティからのフィードバックとコントリビューション

## 📞 サポート

- 🐛 [バグレポート](https://github.com/inoueUJ/TodoReact/issues/new?template=bug_report.md)
- 💡 [機能リクエスト](https://github.com/inoueUJ/TodoReact/issues/new?template=feature_request.md)
- 📚 [ドキュメント](https://github.com/inoueUJ/TodoReact/wiki)

---

⭐ このプロジェクトが役に立ったら、スターをつけてください！
