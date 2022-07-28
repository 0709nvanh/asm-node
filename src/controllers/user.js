import User from "../models/user";

export const userById = async (req, res, next, id) => {
  try {
    const user = await User.findById(id).exec();
    if (!user) {
      return res.status(400).json({
        message: "Khong tim thay user",
      });
    }

    req.profile = user;
    req.profile.password = undefined;
    req.profile.salt = undefined;

    next();
  } catch (error) {
    console.log(error);
  }
};

export const searchUser = async (req, res) => {
  const { keySearch } = req.body;
  try {
    console.log(keySearch);
    const users = await User.find({ email: { $regex: keySearch, $options: "i" } });
    return res.json(users);
  } catch (error) {
    return res.status(400).json({ message: "Error" });
  }
};
