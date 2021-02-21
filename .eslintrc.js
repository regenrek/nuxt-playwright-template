module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    '@nuxtjs',
    '@nuxtjs/eslint-config-typescript'
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': ['warn'],
    'node/no-callback-literal': ['warn']
  }
}