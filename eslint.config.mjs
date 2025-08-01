// eslint-disable-next-line import/no-unresolved
import tseslint from 'typescript-eslint';
import baseConfig from '@peculiar/eslint-config-base';

export default tseslint.config([
  ...baseConfig,
  {
    ignores: [
      'build/*',
      'coverage/*',
      'examples/*',
    ],
  },
  {
    rules: {
      '@typescript-eslint/no-non-null-assertion': 'off',
      'no-useless-escape': 'off',
      '@stylistic/max-len': 'off',
    },
    files: [
      'test/**/*.ts',
    ],
  },
  { rules: { '@typescript-eslint/naming-convention': 'off' } },
]);
