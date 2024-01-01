module.exports = {
	env: {
		es6: true,
		node: true,
	},
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['@typescript-eslint'],
	ignorePatterns: ['example/*', 'tests/**/*'],
	rules: {
		'@typescript-eslint/consistent-type-imports': [
			'warn',
			{
				fixStyle: 'inline-type-imports',
			},
		],
	},
}
