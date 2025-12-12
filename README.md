# Vite Starter for React + TypeScript + Tailwind CSS

React 19 + TypeScript + Vite 7 + Tailwind CSS 4 の最小構成スターターテンプレート。

## 技術スタック

- **React 19.2** / **React DOM 19.2**
- **TypeScript 5.9**（strict モード、`react-jsx` transform）
- **Vite 7** + `@vitejs/plugin-react`（Fast Refresh 有効）
- **Tailwind CSS 4**（`@tailwindcss/vite` 経由、設定ファイル不要）
- **Biome 2.3**（厳格ルールでのフォーマッター + Linter）
- **lucide-react**（アイコンライブラリ）
- **pnpm**（ワークスペース対応パッケージマネージャー）

## プロジェクト構造

```
├── .github/
│   └── copilot-instructions.md   # AI コーディングエージェント用の指示
├── src/
│   ├── main.tsx                  # エントリポイント
│   ├── App.tsx                   # ルートコンポーネント
│   ├── App.css                   # コンポーネントスタイル
│   └── index.css                 # グローバルスタイル（Tailwind インポート）
├── public/                       # 静的アセット
├── index.html                    # HTML エントリ
├── vite.config.ts                # Vite 設定
├── tsconfig.json                 # TypeScript プロジェクト参照
├── tsconfig.app.json             # アプリ用 TypeScript 設定
├── tsconfig.node.json            # Node 用 TypeScript 設定
├── biome.json                    # Biome 設定
├── mise.toml                     # Mise タスク定義
├── pnpm-workspace.yaml           # pnpm ワークスペース設定
└── package.json                  # 依存関係とスクリプト
```

## はじめに

### 前提条件

- Node.js >= 20.19（Vite の要件）
- pnpm >= 10.24.0

### インストール

```bash
pnpm install
```

### 開発

```bash
# 開発サーバー起動（http://localhost:5173）
pnpm dev

# プロダクションビルド
pnpm build

# プロダクションビルドのプレビュー
pnpm preview

# コード品質チェック（フォーマット + Lint）
pnpm check
```

### Mise タスク（オプション）

[mise](https://mise.jdx.dev/) がインストールされている場合：

```bash
mise run vite:dev      # 開発サーバー起動
mise run vite:build    # プロジェクトビルド（確認プロンプトあり）
mise run biome:check   # フォーマット + Lint（確認プロンプトあり）
```

## 主な機能

### Tailwind CSS v4

- **設定ファイル不要** - `src/index.css` に `@import "tailwindcss"` を記述するだけ
- **CSS 変数**による `@theme` ディレクティブでのカスタマイズ
- **Vite プラグイン**統合（PostCSS 不要）

### TypeScript

- **strict モード**有効、未使用変数/引数のチェック
- **bundler モジュール解決**、`.ts` 拡張子インポート可能
- **プロジェクト参照**による最適なビルドパフォーマンス

### Biome

- **2 スペース**、LF 改行、80 文字幅
- **シングルクォート**、必要に応じてセミコロン、トレイリングコンマ
- **厳格な TypeScript ルール**：`noExplicitAny`、`noUnusedVariables` をエラー扱い
- **React 専用ルール**：`useExhaustiveDependencies`、`useHookAtTopLevel`

## 詳細情報

- [Vite ドキュメント](https://vite.dev/)
- [React ドキュメント](https://react.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [Biome ドキュメント](https://biomejs.dev/)

## ライセンス

MIT
