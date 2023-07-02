const { HttpError } = require("../../helpers");
const Contact = require("../../models/contact");
const { addSchema } = require("../../schemas");

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

  module.exports = updateContact;