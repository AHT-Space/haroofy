const jwt = require('jsonwebtoken');
const { promisify } = require("util");
const User = require('../models/userModel');

const signToken = id => {
    return jwt.sign({ id: id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });
  };

  const createAndSendToken = async (user, res) => {
    console.log("token yaar");
    const token = signToken(user._id);
    const cookieOptions = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };
    if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
    res.cookie("login_jwt", token, cookieOptions);
    res.json({
      status: "ok",
      token,
      user,
    });
  };

  exports.login = async (req, res) => {
    try {
      if (!req.body.email || !req.body.password)
        throw new Error("please provide email and password....");
      const user = await User.findOne({
        email: req.body.email,
      }).select("+password");
      if (!user) throw new Error("user not found....");
      const decodedPassword = await user.checkPassword(
        req.body.password,
        user.password
      );
      if (!decodedPassword) throw new Error("incorrect email or password...");
      createAndSendToken(user, res);
    } catch (err) {
      res.status(404).json({
        message: err.message,
      });
    }
  };

  exports.logout = async (req, res) => {
    try {
      if (!req.cookies.login_jwt) throw new Error("please login");
      res.cookie("login_jwt", "jwt-expired", {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
        secure: process.env.NODE_ENV === "production"
      });
      res.json({
        status: "ok",
        message: "you are successfully logged out",
      });
    } catch (err) {
      res.json({
        status: "fail",
        message: err.message,
      });
    }
  };

  exports.signup = async (req, res) => {
    try {
      console.log("from signup: ");
      const user = await User.findOne({ email: req.body.email });

      let cur_user;
      if (!user) {
        const new_user = await User.create(req.body);
        cur_user = new_user;
      } else {
        throw new Error("Already registered with this email");
      }
      res.status(200).json({
        status: "ok",
        message: "successfully created",
        data: {
          cur_user,
        },
      });
    } catch (err) {
      res.json({
        status: "fail",
        message: err.message,
      });
    }
  };

  exports.google = async (req, res) => {
    const { email, name, googlePhotoUrl } = req.body;
    try {
      const user = await User.findOne({ email });
      if (user) {
        createAndSendToken(user, res);
      } else {
        const generatedPassword =
          Math.random().toString(36).slice(-8) +
          Math.random().toString(36).slice(-8);

        const newUser = new User({
          name:
            name.toLowerCase().split(' ').join('') +
            Math.random().toString(9).slice(-4),
          email,
          password: generatedPassword,
          profilePicture: googlePhotoUrl,
        });
        await newUser.save();
        createAndSendToken(newUser, res);
      }
    } catch (error) {
      res.json({
        status: "fail",
        message: err.message,
      });
    }
  };

  exports.checkUserLogin = async (req, res, next) => {
    try {
      if (!req.cookies.login_jwt) throw new Error("please login....");
      const token = req.cookies.login_jwt;
      const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
      const currentUser = await User.findOne({ _id: decoded.id });
      if (!currentUser) throw new Error("uuu,,,user not exist....");
      req.user = currentUser;
      next();
    } catch (err) {
      res.status(404).json({
        message: err.message,
      });
    }
  };