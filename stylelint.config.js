module.exports = {
  extends: [
    'stylelint-config-recommended-scss',
    'stylelint-config-recommended-vue',
    'stylelint-config-prettier'
  ],
  rules: {
    'at-rule-no-unknown': null,
    'no-descending-specificity': null,
    'scss/no-global-function-names': null
  }
}
