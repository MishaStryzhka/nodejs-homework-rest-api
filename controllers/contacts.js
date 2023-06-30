const contacts = require("../models/contacts");
const { HttpError, ctrlWrapper } = require("../helpers");
const { addSchema } = require("../schemas");

const getContacts = async (req, res) => {
    const result = await contacts.listContacts();
    res.status(200).json(result);
};
const getContactById = async (req, res) => {
    const { id } = req.params;
    const result = await contacts.getContactById(id);

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

    const result = await contacts.addContact(data);
    res.status(201).json(result);
};
const removeContact = async (req, res) => {
    const { id } = req.params;
    const result = await contacts.removeContact(id);

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

    const result = await contacts.updateContact(id, data);
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
};
