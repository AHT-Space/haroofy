const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "user must provide name"],
  },
  email: {
    type: String,
    required: [true, "user must provide your email"],
    unique: [true, "email is already taken"],
    trim: true,
  },
  password: {
    type: String,
    required: [true, "user must provide password"],
    select: false,
  },
  profilePicture: {
    type: String,
    default:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
  },
  isAdmin: {
    type: Boolean,
    default: false,
  }
},
  {
    timestamps: true,
  }
);

//This function will run before creating any user and hash the password
userSchema.pre(/^save/, async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.checkPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
