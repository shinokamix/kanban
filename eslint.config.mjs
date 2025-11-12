// eslint.config.mjs
import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import featureSliced from '@conarti/eslint-plugin-feature-sliced'
import importPlugin from 'eslint-plugin-import'
import prettierConfig from 'eslint-config-prettier'
import storybook from 'eslint-plugin-storybook'

export default defineConfig([
    // глобальные игноры
    globalIgnores([
        '.next/**',
        'out/**',
        'dist/**',
        'build/**',
        'coverage/**',
        'node_modules/**',
        '.storybook-static/**',
        'cypress/screenshots/**',
        'cypress/videos/**',
    ]),

    // базовые конфиги Next
    ...nextVitals,
    ...nextTs,

    // общий проектный конфиг
    {
        plugins: {
            '@conarti/feature-sliced': featureSliced,
            import: importPlugin,
        },
        rules: {
            '@conarti/feature-sliced/layers-slices': 'error',
            '@conarti/feature-sliced/absolute-relative': 'error',
            '@conarti/feature-sliced/public-api': 'error',
        },
    },

    // Storybook — только для сторис-файлов
    {
        files: ['**/*.stories.@(ts|tsx)'],
        ...storybook.configs.recommended,
    },

    // Prettier — всегда последним
    prettierConfig,
])
