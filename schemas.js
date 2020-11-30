const Joi = require('joi');
const { number } = require('joi');

module.exports.campgroundSchema = Joi.object({
  campground: Joi.object({
    title: Joi.string().required(),
    price: Joi.number().required().min(1),
    // images: Joi.string().required(),
    location: Joi.string().required(),
    description: Joi.string().required()
  }).required(),
  deleteImages: Joi.array()
});

module.exports.reviewShema = Joi.object({
  review: Joi.object({
    rating: Joi.number().required().min(0).max(5),
    body: Joi.string().required()
  }).required()
});