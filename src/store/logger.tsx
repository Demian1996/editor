import { createLogger, ReduxLoggerOptions } from 'redux-logger';

const loggerConfig: ReduxLoggerOptions = {
  collapsed: true,
  duration: true,
};

const logger = createLogger(loggerConfig);

export default logger;
