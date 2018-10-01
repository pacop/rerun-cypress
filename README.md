# Rerun-cypress

_rerun-cypress_ reruns failed Cypress examples. Tired of random failed tests, this package is the solution.

## Usage

First of all, you need to install the package.

```
yarn add -D rerun-cypress
```

Then, you could add in your `package.json` a custom script. For instance something like that:

```
```

## Parameters

The command _rerun-cypress_ accepts the following parameters:

* `project`: directory where your project lives.
* `spec`: optionally you could also specify one unique spec file.
* `number-retries`: how many each failed test will be repeated. By default it reruns three times.
* `browser`: which browser is used to run tests. By default is uses `electron` browser.
* `record`: whether tests should be recorded. By default they are not recorded.
* `headed`: by default tests are run in headlessly, but you can force browser to be shown.
