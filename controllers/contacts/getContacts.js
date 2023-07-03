const { Contact } = require("../../models");

const getContacts = async (req, res) => {
    const { _id: owner } = req.user;
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;
    const result = await Contact.find({ owner, ...req.query }, "", { skip, limit });
    res.status(200).json(result);
};

module.exports = getContacts;
