const Jimp = require("jimp");
const { User } = require("../../models");
const path = require("path");
const fs = require("fs-extra");

const updateAvatars = async (req, res, next) => {
    const avatar = await Jimp.read(req.file.path);
    
    avatar.resize(250, 250); // resize
    avatar.write(
        `public/avatars/${req.user._id.toString()}-${req.file.originalname}`
    ); // save

    const avatarURL = path.join(
        "avatars",
        `${req.user._id.toString()}_${req.file.originalname}`
    );

    await User.findByIdAndUpdate(req.user._id, { avatarURL });
    await fs.remove(`./tmp/${req.file.originalname}`);

    res.status(200).json({
        avatarURL,
    });
};

module.exports = updateAvatars;
