import HttpError from '../helpers/HttpError.js';
import { Contact } from '../schemas/contactsSchemas.js';

export const getAllContacts = async (_, res, next) => {
  try {
    const result = await Contact.find();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Contact.findById(id);
    if (!result) {
      throw HttpError(404, 'Not found');
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Contact.findByIdAndDelete(id);
    if (!result) {
      throw HttpError(404, 'Not found');
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const contact = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
    };
    const { error } = createContactSchema.validate(contact, {
      abortEarly: false,
    });
    if (error) {
      throw HttpError(400, error.message);
    }
    const newContact = new Contact(contact);
    const result = await newContact.save();
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    if (Object.keys(updatedData).length === 0) {
      throw HttpError(400, 'Body must have at least one field');
    }
    const { error } = updateContactSchema.validate(updatedData);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await Contact.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });
    if (!result) {
      throw HttpError(404, 'Not found');
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const updateStatusContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { favorite } = req.body;
    if (favorite === undefined) {
      throw HttpError(400, 'Missing field favorite');
    }
    const result = await Contact.findByIdAndUpdate(
      id,
      { favorite },
      { new: true, runValidators: true }
    );
    if (!result) {
      throw HttpError(404, 'Not found');
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
