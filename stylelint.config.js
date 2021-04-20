module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-prettier'],
  plugins: ['stylelint-scss'],
  rules: {
    'at-rule-no-unknown': null,
    'custom-property-empty-line-before': null,
    'no-descending-specificity': null,
    'scss/at-rule-no-unknown': true
  },
  syntax: 'scss'
}
