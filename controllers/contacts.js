const { HttpError, ctrlWrapper } = require("../helpers");
const Contact = require("../models/contact");
const { addSchema, updateFavoriteSchema } = require("../schemas");

const getContacts = async (req, res) => {
  const result = await Contact.find();
  res.status(200).json(result);
};
const getContactById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  console.log(result);

  if (!result) {
    throw HttpError(404, "Not fount");
  }

  res.status(200).json(result);
};
const addContact = async (req, res) => {
  const data = req.body;
  const { error } = addSchema.validate(data);

  if (error) {
    throw HttpError(400, error.message);
  }

  const result = await Contact.create(data);
  res.status(201).json(result);
};
const removeContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);

  if (!result) {
    throw HttpError(404, "Not fount");
  }

  res.status(200).json({ message: "contact deleted" });
};
const updateContact = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  if (!data.name && !data.email && !data.phone) {
    throw HttpError(404, "missing fields");
  }

  const { error } = addSchema.validate(data);
  if (error) {
    throw HttpError(400, error.message);
  }

  const result = await Contact.findByIdAndUpdate(id, data, {new: true});
  if (!result) {
    throw HttpError(404, "Not fount");
  }

  res.status(200).json(result);
};
const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  const { error } = updateFavoriteSchema.validate(data);
  if (error) {
    throw HttpError(400, error.message);
  }

  const result = await Contact.findByIdAndUpdate(id, data, {new: true});
  if (!result) {
    throw HttpError(404, "Not fount");
  }

  res.status(200).json(result);
};

module.exports = {
  getContacts: ctrlWrapper(getContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
