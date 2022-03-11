module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false
  },
  extends: ['@nuxtjs', 'plugin:nuxt/recommended', 'prettier'],
  rules: {
    'no-prototype-builtins': 'off',
    'vue/no-v-html': 'off',
    'vue/multi-word-component-names': 'off'
  }
}
