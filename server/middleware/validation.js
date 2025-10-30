// validation.js - Input validation middleware using Joi

const Joi = require('joi');

// Validation schemas
const postSchema = Joi.object({
  title: Joi.string().min(1).max(100).required(),
  content: Joi.string().min(1).required(),
  excerpt: Joi.string().max(200).optional(),
  category: Joi.string().required(), // ObjectId
  tags: Joi.array().items(Joi.string()).optional(),
  isPublished: Joi.boolean().optional(),
});

const categorySchema = Joi.object({
  name: Joi.string().min(1).max(50).required(),
  description: Joi.string().max(200).optional(),
  color: Joi.string().optional(),
});

const userSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  firstName: Joi.string().max(50).optional(),
  lastName: Joi.string().max(50).optional(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const commentSchema = Joi.object({
  content: Joi.string().min(1).required(),
});

// Validation middleware
const validatePost = (req, res, next) => {
  const { error } = postSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      error: error.details[0].message,
    });
  }
  next();
};

const validateCategory = (req, res, next) => {
  const { error } = categorySchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      error: error.details[0].message,
    });
  }
  next();
};

const validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      error: error.details[0].message,
    });
  }
  next();
};

const validateLogin = (req, res, next) => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      error: error.details[0].message,
    });
  }
  next();
};

const validateComment = (req, res, next) => {
  const { error } = commentSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      error: error.details[0].message,
    });
  }
  next();
};

module.exports = {
  validatePost,
  validateCategory,
  validateUser,
  validateLogin,
  validateComment,
};
