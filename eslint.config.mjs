// eslint.config.mjs
import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import featureSliced from '@conarti/eslint-plugin-feature-sliced'
import importPlugin from 'eslint-plugin-import'
import prettierConfig from 'eslint-config-prettier'

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

    {
        plugins: {
            '@conarti/feature-sliced': featureSliced,
            import: importPlugin,
        },
        rules: {
            // FSD: слои и слайсы
            '@conarti/feature-sliced/layers-slices': 'error',
            // FSD: абсолютные/относительные импорты
            '@conarti/feature-sliced/absolute-relative': 'error',
            // FSD: импорт только из public API
            '@conarti/feature-sliced/public-api': 'error',
        },
    },

    prettierConfig,
])
