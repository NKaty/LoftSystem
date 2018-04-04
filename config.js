const path = require('path');

const config = {
  mongoose: {
    uri: process.env.NODE_ENV === 'production' ? 'mongodb://xxx:xxx@ds129386.mlab.com:29386/loftsystem' : 'mongodb://localhost/LoftSystem',
    options: {
      keepAlive: 1,
      poolSize: 5
    }
  },
  ratelimit: {
    duration: 60000,
    max: 100
  },
  session: {
    settings: {
      key: 'sid',
      cookie: {
        httpOnly: true,
        path: '/',
        overwrite: true,
        signed: false,
        maxAge: 3600 * 4 * 1e3
      },
      rolling: true
    },
    secret: 'keyboard cat'
  },
  redis: {
    host: process.env.NODE_ENV === 'production' ? 'redis-10950.c44.us-east-1-2.ec2.cloud.redislabs.com' : 'localhost',
    port: process.env.NODE_ENV === 'production' ? 10950 : 6379,
    password: process.env.NODE_ENV === 'production' ? 'xxx' : ''
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
  middleware: ['helmet', 'ratelimit', 'favicon', 'static', 'logger', 'errors', 'bodyParser', 'session', 'passportInit', 'passportSession'],
  root: process.cwd(),
  dist: `${path.join(process.cwd(), 'dist')}`
};

module.exports = config;
