module.exports = {
    port: process.env.PORT || 1340,
    env: process.env.NODE_ENV || 'development',
    development: {
      db: {
        host: 'localhost',
        database: 'playifi_app',
        user: 'root',
        password: 'mayank',
        dialect: 'mysql',
        operatorsAliases: false
      },
      server: {
        cors: true,
        debug: {request: ['error', 'database', 'read']}
      }
    },
    testing: {
      db: {
        host: '',
        database: '',
        user: '',
        password: '',
        dialect: '',
        logging: false,
        operatorsAliases: false
      },
      server: {
        cors: true,
        debug: {request: false}
      }
    },
    production: {
      db: {
        host: '',
        database: '',
        user: '',
        password: '',
        dialect: '',
        logging: false,
        operatorsAliases: false
      },
      server: {
        cors: false,
        debug: {request: false}
      }
    }
  };