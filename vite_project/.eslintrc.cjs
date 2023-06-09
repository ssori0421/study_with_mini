module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: ['airbnb', 'airbnb/hooks', 'airbnb-typescript', 'prettier', 'plugin:prettier/recommended'],
	overrides: [],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['react', '@typescript-eslint', 'prettier'],
	rules: {},
	settings: {
		'import/extensions': ['.js', '.jsx', '.ts', '.tsx'], // .tsx 파일 확장자를 허용합니다.
	},
};
