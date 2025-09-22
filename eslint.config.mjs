// @ts-check
import { globalIgnores } from 'eslint/config'
import { defineConfig } from 'eslint-config-hyoban'

import checkI18nJson from './plugins/eslint/eslint-check-i18n-json.js'
import recursiveSort from './plugins/eslint/eslint-recursive-sort.js'

export default defineConfig(
  {
    formatting: false,
    lessOpinionated: true,
    preferESM: false,
    react: true,
    tailwindCSS: true,
  },

  {
    settings: {
      tailwindcss: {
        whitelist: ['center'],
      },
    },
    rules: {
      '@typescript-eslint/triple-slash-reference': 0,
      'unicorn/prefer-math-trunc': 'off',
      'unicorn/no-static-only-class': 'off',
      '@eslint-react/no-clone-element': 0,
      // TailwindCSS v4 not support
      'tailwindcss/no-custom-classname': 0,
      '@eslint-react/hooks-extra/no-direct-set-state-in-use-effect': 0,
      // NOTE: Disable this temporarily
      'react-compiler/react-compiler': 0,
      'no-restricted-syntax': 0,
      'no-restricted-globals': [
        'error',
        {
          name: 'location',
          message:
            "Since you don't use the same router instance in electron and browser, you can't use the global location to get the route info. \n\n" +
            'You can use `useLocaltion` or `getReadonlyRoute` to get the route info.',
        },
      ],
    },
  },

  // @ts-expect-error
  {
    files: ['locales/**/*.json'],
    plugins: {
      'recursive-sort': recursiveSort,
      'check-i18n-json': checkI18nJson,
    },
    rules: {
      'recursive-sort/recursive-sort': 'error',
      'check-i18n-json/valid-i18n-keys': 'error',
      'check-i18n-json/no-extra-keys': 'error',
    },
  },
  {
    files: ['**/*.tsx'],
    rules: {
      '@stylistic/jsx-self-closing-comp': 'error',
    },
  },
  globalIgnores(['apps/ssr/src/index.html.ts']),
)
