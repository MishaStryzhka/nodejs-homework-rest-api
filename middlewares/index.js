const authenticate = require("./authenticate");
const upload = require("./upload");
const validateBody = require("./validateBody");


module.exports = {
    validateBody,
    authenticate,
    upload
}