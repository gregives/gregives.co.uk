module.exports = {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-standard-vue/scss',
    'stylelint-config-prettier'
  ],
  rules: {
    'at-rule-no-unknown': null,
    'custom-property-empty-line-before': null,
    'custom-property-pattern': null,
    'function-no-unknown': null,
    'no-descending-specificity': null,
    'value-keyword-case': null,
    'scss/at-mixin-pattern': null,
    'scss/dollar-variable-pattern': null,
    'selector-class-pattern': null,
    'selector-id-pattern': null
  }
}
