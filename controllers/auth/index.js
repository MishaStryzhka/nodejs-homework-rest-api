const { ctrlWrapper } = require("../../helpers");
const register = require("./register");
const login = require("./login");
const logout = require("./logout");
const getCurrentUser = require("./getCurrentUser");
const updateSubscription = require("./updatesubScription");
const updateAvatars = require("./updateAvatars");

module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    logout: ctrlWrapper(logout),
    getCurrentUser: ctrlWrapper(getCurrentUser),
    updateSubscription: ctrlWrapper(updateSubscription),
    updateAvatars: ctrlWrapper(updateAvatars),
};
