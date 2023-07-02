const { HttpError } = require("../../helpers");
const Contact = require("../../models/contact");
const { updateFavoriteSchema } = require("../../schemas");

const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  const { error } = updateFavoriteSchema.validate(data);
  if (error) {
    throw HttpError(400, error.message);
  }

  const result = await Contact.findByIdAndUpdate(id, data, { new: true });
  if (!result) {
    throw HttpError(404, "Not fount");
  }

  res.status(200).json(result);
};

module.exports = updateStatusContact;
