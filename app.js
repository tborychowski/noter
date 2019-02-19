const logger = require('./server/lib/logger');
const server = require('./server');


logger.info('--- STARTING -----------------------------------------------------');
server.listen(3005, () => logger.info('Server started: http://localhost:3005'));
