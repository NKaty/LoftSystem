const path = require('path');

const config = {
  mongoose: {
    uri: 'mongodb://localhost/LoftSystem',
    options: {
      keepAlive: 1,
      poolSize: 5
    }
  },
  session: {
    settings: {
      key: 'sid',
      cookie: {
        httpOnly: true,
        path: '/',
        overwrite: true,
        signed: false,
        maxAge: 5000//3600 * 4 * 1e3
      },
      rolling: true
    },
    secret: 'keyboard cat'
  },
  redis: {
    host: 'localhost',
    port: 6379
  },
  server: {
    port: process.env.PORT || 3002
  },
  upload: {
    formidable: {
      uploadDir: `${path.join(process.cwd(), 'dist', 'uploads')}`,
      multiples: false,
      keepExtensions: true
    },
    multipart: true
  },
  crypto: {
    hash: {
      length: 64,
      iterations: process.env.NODE_ENV === 'production' ? 12000 : 1
    }
  },
  defaultPermission: {
    chat: {C: true, R: true, U: true, D: true},
    news: {C: true, R: true, U: true, D: true},
    setting: {C: true, R: true, U: true, D: true}
  },
  middleware: ['favicon', 'static', 'logger', 'errors', 'bodyParser', 'session', 'passportInit', 'passportSession'],
  root: process.cwd(),
  dist: `${path.join(process.cwd(), 'dist')}`
};

module.exports = config;
