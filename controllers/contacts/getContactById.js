const { HttpError } = require("../../helpers");
const { Contact } = require("../../models");

const getContactById = async (req, res) => {
    const { id } = req.params;
    const result = await Contact.findById(id);
    console.log(result);
  
    if (!result) {
      throw HttpError(404, "Not fount");
    }
  
    res.status(200).json(result);
  };

module.exports = getContactById;