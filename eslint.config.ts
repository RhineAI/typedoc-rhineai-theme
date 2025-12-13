import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { includeIgnoreFile } from '@eslint/compat'
import css from '@eslint/css'
import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import json from '@eslint/json'
import markdown from '@eslint/markdown'
import tsParser from '@typescript-eslint/parser'
import { defineConfig } from 'eslint/config'
import eslintConfigPrettier from 'eslint-config-prettier/flat'
import { importX } from 'eslint-plugin-import-x'
import unusedImports from 'eslint-plugin-unused-imports'
import globals from 'globals'
import tseslint, { type ConfigArray } from 'typescript-eslint'

const OPTIONS = {
  ENABLE_SCRIPT: true, // Set to enable typescript javascript file features
  ENABLE_TYPE_CHECKED: true, // Set to enable type features
  ENABLE_PROJECT_BASE_TYPE_CHECKED: false, // Set to enable project-based type features
  ENABLE_FRONTEND: false, // Set to enable JSX, React, Reacts Hooks, and other frontend features
  ENABLE_NEXT: false, // Set to enable Next.js and other frontend features
  ENABLE_MARKDOWN: true, // Set to enable markdown file features
  ENABLE_JSON: true, // Set to enable json file features
  ENABLE_STYLESHEET: true, // Set to enable CSS, SCSS, SASS and other stylesheet features
  IGNORE_PRETTIER: true, // Set to disable all rules that are unnecessary or might conflict with Prettier
  TSCONFIG_PATH: './tsconfig.json', // path to tsconfig file
}

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const gitignorePath = path.resolve(__dirname, '.gitignore')

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const globalConfig = defineConfig([
  // @ts-expect-error ignore type error
  includeIgnoreFile(gitignorePath),
  {
    ignores: ['bun.lock'],
  },
])

const jsFileExtensions = 'cjs,js,jsx,mjs,mjsx'
const tsFileExtensions = 'cts,ts,tsx,mts,mtsx'
const scriptFileExtensions = `${jsFileExtensions},${tsFileExtensions}`
const allTsFiles = [`**/*.{${tsFileExtensions}}`]
const allScriptFiles = [`**/*.{${scriptFileExtensions}}`]

const tsConfig: ConfigArray = []
if (OPTIONS.ENABLE_SCRIPT && OPTIONS.ENABLE_TYPE_CHECKED) {
  tsConfig.push(
    ...(OPTIONS.ENABLE_PROJECT_BASE_TYPE_CHECKED
      ? [
          {
            ignores: ['eslint.config.ts'],
          },
          {
            files: allScriptFiles,
            languageOptions: {
              parserOptions: {
                projectService: true,
                tsconfigRootDir: __dirname,
              },
            },
          },
          {
            ...tseslint.configs.strictTypeChecked[0],
            files: allScriptFiles,
          },
          {
            ...tseslint.configs.strictTypeChecked[1],
            files: allTsFiles,
          },
          {
            ...tseslint.configs.strictTypeChecked[2],
            files: allScriptFiles,
          },
          {
            ...tseslint.configs.stylisticTypeChecked[2],
            files: allScriptFiles,
          },
        ]
      : [
          {
            ...tseslint.configs.strict[0],
            files: allScriptFiles,
          },
          {
            ...tseslint.configs.strict[1],
            files: allTsFiles,
          },
          {
            ...tseslint.configs.strict[2],
            files: allScriptFiles,
          },
          {
            ...tseslint.configs.stylistic[2],
            files: allScriptFiles,
          },
        ]),
  )
}

const scriptConfig: ConfigArray = []
if (OPTIONS.ENABLE_SCRIPT) {
  scriptConfig.push(
    ...tseslint.config([
      {
        files: [
          `*.{${scriptFileExtensions}}`,
          `config/**/*.{${scriptFileExtensions}}`,
          `scripts/**/*.{${scriptFileExtensions}}`,
          `test/**/*.{${scriptFileExtensions}}`,
          `spec/**/*.{${scriptFileExtensions}}`,
          `tools/**/*.{${scriptFileExtensions}}`,
        ],
        languageOptions: {
          globals: globals.node,
        },
      },
      {
        files: [`src/**/*.{${scriptFileExtensions}}`],
        languageOptions: {
          globals: globals.browser,
        },
      },
      {
        ...js.configs.recommended,
        files: allScriptFiles,
      },
      ...tsConfig,
      {
        ...importX.flatConfigs.recommended,
        files: allScriptFiles,
        settings: {
          'import-x/resolver': {
            typescript: {
              alwaysTryTypes: true,
              project: OPTIONS.TSCONFIG_PATH,
            },
            node: true,
          },
        },
      },
      {
        ...importX.flatConfigs.typescript,
        files: allScriptFiles,
        settings: {
          'import-x/resolver': {
            typescript: {
              alwaysTryTypes: true,
              project: OPTIONS.TSCONFIG_PATH,
            },
            node: true,
          },
        },
      },
      {
        files: allScriptFiles,
        plugins: {
          'unused-imports': unusedImports,
        },
      },
      {
        files: allScriptFiles,
        languageOptions: {
          parser: tsParser,
          ecmaVersion: 'latest',
          sourceType: 'module',
        },
      },
    ]),
  )
}

const frontendConfig: ConfigArray = []
if (OPTIONS.ENABLE_FRONTEND) {
  if (OPTIONS.ENABLE_NEXT) {
    frontendConfig.push(
      ...compat.config({
        extends: ['next/core-web-vitals', 'next/typescript'],
      }),
    )
  } else {
    frontendConfig.push(...compat.extends('plugin:react/recommended', 'plugin:react-hooks/recommended'))
  }
  for (const nextConfigElement of frontendConfig) {
    nextConfigElement.files ??= allScriptFiles
  }
}

const cssConfig = []
if (OPTIONS.ENABLE_STYLESHEET) {
  cssConfig.push(
    ...defineConfig([
      {
        ...css.configs.recommended,
        files: ['**/*.css'],
        language: 'css/css',
      },
    ]),
  )
}

const markdownConfig: ConfigArray = []
if (OPTIONS.ENABLE_MARKDOWN) {
  markdownConfig.push(
    ...defineConfig([
      {
        ...markdown.configs.recommended[0],
        files: ['**/*.md', '**/*.markdown'],
        language: 'markdown/gfm',
      },
    ]),
  )
}

const jsonConfig: ConfigArray = []
if (OPTIONS.ENABLE_JSON) {
  jsonConfig.push(
    ...defineConfig([
      {
        ...json.configs.recommended,
        files: ['**/*.json'],
        ignores: ['**/tsconfig.json', '**/tsconfig.*.json'],
        language: 'json/json',
      },
      {
        ...json.configs.recommended,
        files: ['**/*.jsonc', '**/*.json5', '**/tsconfig.json', '**/tsconfig.*.json'],
        language: 'json/jsonc',
      },
    ]),
  )
}

const prettierConfig: ConfigArray = []
if (OPTIONS.IGNORE_PRETTIER) {
  prettierConfig.push(eslintConfigPrettier)
}

const customConfig: ConfigArray = defineConfig([
  {
    files: allScriptFiles,
    rules: {
      '@typescript-eslint/no-extraneous-class': 'off',
      '@typescript-eslint/no-unnecessary-type-parameters': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/require-await': 'off',
      'import-x/no-anonymous-default-export': 'error',
      'import-x/no-named-as-default': 'error',
      'import-x/no-named-as-default-member': 'off',
      'import-x/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
          pathGroups: [
            {
              pattern: '@/**',
              group: 'internal',
              position: 'before',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          'newlines-between': 'always',
          'newlines-between-types': 'always',
          distinctGroup: false,
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          sortTypesGroup: true,
        },
      ],
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'off',
        {
          vars: 'all',
          args: 'after-used',
        },
      ],
    },
  },
  {
    files: allScriptFiles,
    rules: OPTIONS.ENABLE_FRONTEND
      ? {
          'react-hooks/exhaustive-deps': 'error',
        }
      : {},
  },
  {
    files: allScriptFiles,
    rules:
      OPTIONS.ENABLE_FRONTEND && OPTIONS.ENABLE_NEXT
        ? {
            '@next/next/no-img-element': 'error',
          }
        : {},
  },
  {
    files: ['**/*.css'],
    language: 'css/css',
    rules: {
      'css/no-empty-blocks': 'off',
      'css/use-baseline': 'off',
    },
  },
])

const config: ConfigArray = [
  ...globalConfig,
  ...scriptConfig,
  ...frontendConfig,
  ...cssConfig,
  ...markdownConfig,
  ...jsonConfig,
  ...prettierConfig,
  ...customConfig,
]

// console.log(config)

export default config
