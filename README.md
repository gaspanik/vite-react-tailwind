# Vite Starter for React + TypeScript + Tailwind CSS

React 19 + TypeScript + Vite 7 + Tailwind CSS 4 の最小構成スターターテンプレート。

## 技術スタック

- **React 19.2** / **React DOM 19.2**
- **TypeScript 5.9**（strict モード、`react-jsx` transform）
- **Vite 7** + `@vitejs/plugin-react`（Fast Refresh 有効）
- **Tailwind CSS 4**（`@tailwindcss/vite` 経由、設定ファイル不要）
- **Biome 2.3**（厳格ルールでのフォーマッター + Linter）
- **lucide-react**（アイコンライブラリ）
- **clsx** + **tailwind-merge**（クラス名結合・競合解決ユーティリティ）
- **class-variance-authority**（バリアント API 実装ライブラリ）
- **pnpm**（ワークスペース対応パッケージマネージャー）

## プロジェクト構造

```
├── .github/
│   └── copilot-instructions.md   # AI コーディングエージェント用の指示
├── src/
│   ├── main.tsx                  # エントリポイント
│   ├── App.tsx                   # ルートコンポーネント
│   ├── App.css                   # コンポーネントスタイル
│   ├── index.css                 # グローバルスタイル（Tailwind インポート）
│   ├── components/               # 再利用可能な UI コンポーネント
│   │   ├── ButtonCn.tsx         # cn 関数を使った基本的なボタン
│   │   └── ButtonCva.tsx        # CVA を使ったバリアント対応ボタン
│   └── lib/
│       └── utils.ts              # cn 関数（clsx + tailwind-merge）
├── public/                       # 静的アセット
├── index.html                    # HTML エントリ
├── vite.config.ts                # Vite 設定（パスエイリアス: @ → src/）
├── tsconfig.json                 # TypeScript プロジェクト参照
├── tsconfig.app.json             # アプリ用 TypeScript 設定（パスマッピング）
├── tsconfig.node.json            # Node 用 TypeScript 設定
├── biome.json                    # Biome 設定
├── mise.toml                     # Mise タスク定義
├── pnpm-workspace.yaml           # pnpm ワークスペース設定
└── package.json                  # 依存関係とスクリプト
```

## はじめに

### 前提条件

- Node.js >= 20.19（Vite の要件）
- pnpm >= 10.25.0

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

### ボタンコンポーネント

プロジェクトには2種類のボタンコンポーネントのサンプル実装が含まれています：

#### ButtonCn（シンプルアプローチ）

`src/components/ButtonCn.tsx` は `cn` 関数を使った基本的な実装例です：

- `cn` 関数で条件付きクラスを結合
- `active` と `disabled` の状態管理
- シンプルなコンポーネントに適した設計

```tsx
import { Button } from '@/components/ButtonCn'

<Button active>Active Button</Button>
<Button disabled>Disabled Button</Button>
<Button className="custom-class">Custom Button</Button>
```

#### ButtonCva（バリアント API アプローチ）

`src/components/ButtonCva.tsx` は `class-variance-authority` を使った高度な実装例です：

- デザインシステム対応のバリアント定義
- 型安全な props（`VariantProps` で自動生成）
- `intent`（primary/secondary）と `size`（sm/md）のバリアント
- 複雑なコンポーネントシステムに適した設計

```tsx
import { ButtonCva } from '@/components/ButtonCva'

<ButtonCva intent="primary" size="md">Primary Button</ButtonCva>
<ButtonCva intent="secondary" size="sm">Secondary Small</ButtonCva>
```

#### cn ユーティリティ関数

`src/lib/utils.ts` の `cn` 関数は、クラス名の結合と Tailwind CSS の競合解決を行います：

- `clsx` でクラス名を結合
- `tailwind-merge` で Tailwind CSS の競合を自動解決
- shadcn/ui のパターンを採用

```tsx
import { cn } from '@/lib/utils'

const className = cn(
  'base-class',
  condition && 'conditional-class',
  'override-class'
)
```

### TypeScript

- **strict モード**有効、未使用変数/引数のチェック
- **bundler モジュール解決**、`.ts` 拡張子インポート可能
- **プロジェクト参照**による最適なビルドパフォーマンス
- **パスエイリアス**：`@/` で `src/` からの絶対パスインポートが可能
  ```tsx
  import { cn } from '@/lib/utils'
  import { Button } from '@/components/ButtonCn'
  ```

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
