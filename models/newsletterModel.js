const mongoose = require("mongoose");
const validator = require("validator");
const AppError = require("../utils/appError");

const newsletterSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "please provide a real email address!"],
    validate: {
      validator: function (email) {
        return validator.isEmail(email);
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
newsletterSchema.pre("save", async function (next) {
  const user = this; // the current user being saved
  const existedUser = await this.constructor.findOne({ email: user.email });
  if (existedUser) {
    const error = new AppError("Email already exists", 409);
    return next(error);
  }
  next();
});

const Newsletter = mongoose.model("Newsletter", newsletterSchema);

module.exports = Newsletter;
