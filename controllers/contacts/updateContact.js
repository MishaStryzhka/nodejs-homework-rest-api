const { HttpError } = require("../../helpers");
const { Contact } = require("../../models");

const updateContact = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
  
    if (!data.name && !data.email && !data.phone) {
      throw HttpError(404, "missing fields");
    }
  
    const result = await Contact.findByIdAndUpdate(id, data, {new: true});
    if (!result) {
      throw HttpError(404, "Not fount");
    }
  
    res.status(200).json(result);
  };

  module.exports = updateContact;