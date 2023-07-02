const Contact = require("../../models/contact");

const getContacts = async (req, res) => {
    const result = await Contact.find();
    res.status(200).json(result);
  };

module.exports = getContacts;