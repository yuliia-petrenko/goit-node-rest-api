import Joi from 'joi';
import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      minlength: 3,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      validate: {
        validator: value => {
          return /\S+@\S+\.\S+/.test(value);
        },
        message: 'Invalid email format',
      },
    },
    phone: {
      type: String,
      required: [true, 'Phone is required'],
      minlength: 8,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Contact = mongoose.model('contacts', contactSchema);

export const createContactSchema = Joi.object({
  name: Joi.string().required().min(3),
  email: Joi.string().email().required(),
  phone: Joi.string().required().min(8),
  favorite: Joi.boolean(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3),
  email: Joi.string().email(),
  phone: Joi.string().min(8),
  favorite: Joi.boolean(),
});

export const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

export { Contact };
