const _ = require('lodash');
const cypress = require('cypress');

let totalFailures = 0;

module.exports = config => {
  const run = (currentNumber = 0, spec = config.cypress.spec) => {
    currentNumber += 1;

    return cypress.run(
      Object.assign({}, config.cypress, {spec})
    ).then(results => {
      if (results.totalFailed) {
        totalFailures += results.totalFailed;

        // rerun again with only the failed tests
        const specs = _(results.runs).filter('stats.failures').map('spec.absolute').value();

        // We have retried enough, let's die
        if (currentNumber >= config.retries) {
          console.log(`Ran a total of '${config.retries}' times but still have failures. Exiting...`);
          return process.exit(totalFailures);
        }

        console.log('***************************************************************************');
        console.log(`* Retrying '${specs.length}' specs...`);
        specs.forEach(file => { console.log(file); });
        console.log('***************************************************************************');

        return run(currentNumber, specs);
      }
    });
  };

  run();
};
