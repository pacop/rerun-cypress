const DEFAULT_RETRIES = 3;
const glob = require('glob');
const fs = require('fs');
const {difference} = require('lodash');

module.exports = argv => {
  const optionsParser = {
    boolean: ['headed'],
    alias: {
      browser: 'b',
      record: 'r',
      headed: 'h',
      'number-retries': 'n',
      'exclude-spec': 'e',
      spec: 's',
      project: 'p'
    }
  };
  const config = require('minimist')(argv, optionsParser);

  // As cypress right now does not support excludin files, we have added support manually.
  // When exclude-spec is used we need to resolve that regex before passing to cypress
  if (!config.spec && config['exclude-spec']) {
    const excluded = glob.sync(config['exclude-spec'], {nodir: true});
    const configJson = JSON.parse(fs.readFileSync(`${config.project}/cypress.json`, 'utf8'));
    const all = glob.sync(`${config.project}/${configJson.integrationFolder}/**/*`, {nodir: true});
    config.spec = difference(all, excluded);
  }

  return {
    cypress: {
      spec: config.spec,
      project: config.project,
      headed: config.headed,
      browser: config.browser || 'electron',
      record: config.record || false
    },
    retries: config['number-retries'] || DEFAULT_RETRIES
  };
};
