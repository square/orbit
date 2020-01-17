# Orbit Contribution Guide

## Developing

### To work on individual components
`$ component=ComponentName npm run dev`

### Linting
To lint
`$ npm run lint`

To install the pre-commit lint-hook
`$ npm run install:hooks`

Style Autofix ([eslint](http://eslint.org/docs/user-guide/command-line-interface#--fix) and [stylelint](https://stylelint.io/#features) automatically fix what they _can_)
`$ npm run lint:js -- --fix`
`$ npm run lint:css -- --fix`

## Testing

### Unit testing
We are using [Karma](http://karma-runner.github.io/1.0/index.html) to run unit-tests in Chrome (hopefully Safari and Firefox too in the future). To run  unit-tests across all components, run:
`$ npm run test`

To run tests for a particular component, run:
`$ component=YourComponent npm run test`

#### Troubleshooting Karma

If your tests are timing out, go to System Preferenes > Security & Privacy on your Mac and make sure Accessibility control is enabled for Terminal
