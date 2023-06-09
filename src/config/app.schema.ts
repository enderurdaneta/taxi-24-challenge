import * as Joi from 'joi';

export default Joi.object({
  NODE_ENV: Joi.required(),

  // APP
  PORT: Joi.required(),
  BASE_URL: Joi.required(),

  // DATABASE
  DATABASE_TYPE: Joi.required(),
  DATABASE_HOST: Joi.required(),
  DATABASE_PORT: Joi.required(),
  DATABASE_USERNAME: Joi.required(),
  DATABASE_PASSWORD: Joi.required(),
  DATABASE_NAME: Joi.required(),
  DATABASE_LOG: Joi.required(),
});
