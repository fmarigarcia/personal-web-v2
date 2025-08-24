import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { globalIgnores } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';

export default tseslint.config([
    globalIgnores(['dist']),
    {
        files: ['**/*.{ts,tsx}'],
        extends: [
            js.configs.recommended,
            tseslint.configs.recommended,
            reactHooks.configs['recommended-latest'],
            reactRefresh.configs.vite,
            eslintConfigPrettier,
            importPlugin.flatConfigs.recommended,
            importPlugin.flatConfigs.typescript,
        ],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },
        rules: {
            'import/no-unresolved': 0,
            'import/no-named-as-default': 0,
            'import/order': [
                2,
                {
                    groups: [
                        'external',
                        'builtin',
                        'internal',
                        'sibling',
                        'parent',
                        'index',
                    ],
                },
            ],
            'no-console': 2,
        },
    },
]);
