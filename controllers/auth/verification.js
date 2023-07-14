const { HttpError } = require("../../helpers");
const { User } = require("../../models");

const verification = async (req, res, next) => {
    const { verificationToken } = req.params;
    const [user] = await User.find({ verificationToken });
    
    if (!user) {
        throw HttpError(404, "User not found");
    }

    if (user.verify) {
        res.status(200).json({
            message: "user is already verified",
        });
    }

  await User.findByIdAndUpdate(
        user._id,
        { verificationToken: null, verify: true }
    );

    res.status(201).json({
        message: "Verification successful",
    });
};

module.exports = verification;
