const User = require("./user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
  try {
    const { username, password, email } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({
        status: 400,
        message: "This email has already been used.",
      });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    const newUser = new User({ username, password: hashedPassword, email });
    const userDB = await newUser.save();

    return res.status(201).json({
      status: 201,
      message: `User ${userDB.email} created`,
    });
  } catch (error) {
    return next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const userInfo = await User.findOne({ email: req.body.email });
    if (!userInfo) {
      return res.status(400).json({
        status: 400,
        message: "Invalid credentials",
        data: null,
      });
    }
    if (bcrypt.compareSync(req.body.password, userInfo.password)) {
      userInfo.password = "*************"; // Hide password in the response for security
      const token = jwt.sign(
        {
          id: userInfo._id,
          email: userInfo.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" } // In production, adjust the expiration time based on your requirements
      );

      return res.status(200).json({
        data: { massage: "ok", user: userInfo, token: token },
      });
    } else {
      return res.status(400).json({
        status: 400,
        message: "Invalid credentials",
        data: null,
      });
    }
  } catch (error) {
    return next(error);
  }
};

const logout = (req, res, next) => {
  try {
    // Clear token
    const token = null;
    return res.status(200).json({
      status: 200,
      message: "Logout successful",
    });
  } catch (error) {
    return next(setError(error.statusCode, "Logout Error"));
  }
};

module.exports = { register, login, logout };
