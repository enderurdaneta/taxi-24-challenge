import * as Joi from 'joi';

export default Joi.object({
  NODE_ENV: Joi.required(),

  // APP
  PORT: Joi.required(),
  BASE_URL: Joi.required(),
});
