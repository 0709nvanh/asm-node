import User from "../models/user";
// import
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  const { email, phone, password } = req.body;
  try {
    const existUser = await User.findOne({ email }).exec();
    if (existUser) {
      return res.json({
        message: "User existed",
      });
    }

    const user = await new User({ email, phone, password }).save();

    return res.json({
      user: {
        phone: user.phone,
        email: user.email,
        _id: user._id,
        status: user.status,
      },
    });
  } catch (error) {
    res.status(400).json({
      msg: "Error",
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).exec();

    if (!user) {
      return res.json({
        message: "Do not find user",
      });
    }

    if (!user.authenticate(password)) {
      return res.json({
        message: "Password is incorrect",
      });
    }

    if (user.status === false) {
      return res.status(200).json({
        user: {
            _id: user._id,
            phone: user.phone,
            email: user.email,
            role: user.role,
            status: user.status,
          },
        message: "Tài khoản của bạn đã bị Admin tắt quyền truy cập",
      });
    }

    const token = jwt.sign({ _id: user._id }, "vananh", { expiresIn: 60 * 60 });
    return res.json({
      token,
      user: {
        _id: user._id,
        phone: user.phone,
        email: user.email,
        role: user.role,
        status: user.status,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getUsers = async (req, res) => {
  try {
    const user = await User.find().exec();
    res.json(user);
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id }).exec();
    res.json(user);
  } catch (error) {
    console.log(error);
  }
};

export const updateStatusUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      { _id: req.params.id },
      { status: req.body.status },
      { new: true }
    );
    res.json(user);
  } catch (error) {
    console.log(error);
  }
};

export const removeUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete({ _id: req.params.id }).exec();
    res.json(user);
  } catch (error) {
    console.log(error);
  }
};
