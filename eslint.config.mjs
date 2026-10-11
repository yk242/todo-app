import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import importPlugin from 'eslint-plugin-import';
import unusedImports from 'eslint-plugin-unused-imports';

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    'prisma/generated/**',
    'app/components/ui/**',
  ]),
  {
    plugins: {
      import: importPlugin,
      'unused-imports': unusedImports,
    },
    settings: {
      // TypeScriptのパスエイリアス（@/componentsなど）を解決するための設定
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
        node: true,
      },
    },
    rules: {
      'unused-imports/no-unused-imports': 'error',
      'import/order': [
        'error',
        {
          // インポートのグループ順序
          groups: [
            'builtin', // 1. Node.jsの組み込みモジュール (fs, path等)
            'external', // 2. npmパッケージ (react, next, prisma等)
            'internal', // 3. プロジェクト内部のパスエイリアス (@/components等)
            ['parent', 'sibling'], // 4. 相対パス (../, ./)
            'index', // 5. インデックスファイル (./)
            'object', // 6. オブジェクトのインポート
            'type', // 7. 型のインポート (import type)
          ],
          pathGroups: [
            // ReactとNext.js関連を external の一番上に固定
            {
              pattern: '{react,react-dom/**,react-dom,next,next/**}',
              group: 'external',
              position: 'before',
            },
            // `@/` から始まるエイリアスを internal グループとして明示
            {
              pattern: '@/**',
              group: 'internal',
              position: 'before',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          // グループごとに必ず1行空行を入れる
          'newlines-between': 'always',
          // アルファベット順にソートする
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
  },
]);
