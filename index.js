const config = require('./src/config')(process.argv);
const runCypressRetries = require('./src/index.js');

runCypressRetries(config);
