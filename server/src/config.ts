const staticConfig = require('../config.json');

export interface Config {
  port: number;
}

const config = { ...staticConfig };

export default config;
