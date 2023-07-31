import Joi from 'joi';

const createBookBodySchema = Joi.object().keys({
  title: Joi.string().required(),
  description: Joi.string().required(),
});

const updateBookBodySchema = Joi.object().keys({
  title: Joi.string().optional(),
  description: Joi.string().optional(),
  status: Joi.string().valid('read', 'wanttoread').optional()
});

const updateBookParamsSchema = Joi.object().keys({
  bookId: Joi.string().required()
});

export { createBookBodySchema, updateBookBodySchema, updateBookParamsSchema };
