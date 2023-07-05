const { HttpError } = require("../../helpers");
const { Contact } = require("../../models");

const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  const result = await Contact.findByIdAndUpdate(id, data, { new: true });
  if (!result) {
    throw HttpError(404, "Not fount");
  }

  res.status(200).json(result);
};

module.exports = updateStatusContact;
