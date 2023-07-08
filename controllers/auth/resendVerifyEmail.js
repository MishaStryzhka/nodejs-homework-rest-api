const { nanoid } = require("nanoid");
const { HttpError, sendEmail } = require("../../helpers");
const { User } = require("../../models");
require("dotenv").config();

const { BASE_URL } = process.env;

const resendVerifyEmail = async (req, res, next) => {
    const { email } = req.body;
    if (!email) {
        throw HttpError(400, "missing required field email")
    }
    
    const user = await User.findOne({ email });
    if (!user) {
        throw HttpError(400, "No user found with this email");
    }
    console.log('user.verify', user.verify)
    if (user.verify) {
        throw HttpError(400, "Verification has already been passed");
    }

    const verificationToken = nanoid();
    const verifyEmail = {
        to: email,
        subject: "Verify email",
        html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Click verify email</a>`,
    };

    await sendEmail(verifyEmail);
    await User.findByIdAndUpdate(user._id, { verificationToken });

    res.status(200).json({
        message: "Verification email sent"
      });


};

module.exports = resendVerifyEmail;
