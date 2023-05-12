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
  };
});
