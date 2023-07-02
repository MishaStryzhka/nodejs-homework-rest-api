const { HttpError } = require("../../helpers");
const Contact = require("../../models/contact");
const { addSchema } = require("../../schemas");

const addContact = async (req, res) => {
    const data = req.body;
    const { error } = addSchema.validate(data);
  
    if (error) {
      throw HttpError(400, error.message);
    }
  
    const result = await Contact.create(data);
    res.status(201).json(result);
  };

  module.exports = addContact;