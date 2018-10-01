const DEFAULT_RETRIES = 3;

module.exports = argv => {
  const optionsParser = {
    boolean: ['headed'],
    alias: {
      browser: 'b',
      record: 'r',
      headed: 'h',
      'number-retries': 'n',
      spec: 's',
      project: 'p'
    }
  };
  const config = require('minimist')(argv, optionsParser);

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
