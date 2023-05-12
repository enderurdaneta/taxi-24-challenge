import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    environment: process.env.NODE_ENV || 'development',
    env: { development: 'BETA', staging: 'STAG', production: 'PROD' }[
      process.env.NODE_ENV || 'development'
    ],
    app: {
      port: parseInt(process.env.PORT, 10) || 8080,
      baseUrl: process.env.BASE_URL || 'http://localhost:8080',
    },
    db: {
      type: process.env.DATABASE_TYPE,
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      name: process.env.DATABASE_NAME,
    },
  };
});
