import Cart from "../models/cart";

export const addCart = async (req, res) => {
  try {
    const cart = await new Cart(req.body).save();
    res.json(cart);
  } catch (error) {
    console.log(error);
  }
};

export const getCarts = async (req, res) => {
  try {
    const carts = await Cart.find()
      .populate("userId")
      .populate({
        path: "listCart",
        populate: { path: "productId" }
      })
      .exec();
    res.json(carts);
  } catch (error) {
    console.log(error);
  }
};

export const getOrderById = async (req, res) => {
  try {
    const cart = await Cart.findOne({ _id: req.params.id })
      .populate("userId")
      .populate({
        path: "listCart",
        populate: { path: "productId" }
      });
    res.json(cart);
  } catch (error) {
    console.log(error);
  }
};

export const getOrderByUser = async (req, res) => {
  try {
    const carts = await Cart.find({ userId: req.params.userId })
      .populate("userId")
      .populate({
        path: "listCart",
        populate: {
          path: "productId",
          populate: {
            path: "category"
          }
        }
      });
    res.json(carts);
  } catch (error) {
    console.log(error);
  }
};

export const updateStatusOrder = async (req, res) => {
  try {
    const requestCheck = { _id: req.params.id };
    const updateStatus = await Cart.findOneAndUpdate(
      requestCheck,
      { status: req.body.status },
      { new: true }
    );
    return res.json(updateStatus);
  } catch (error) {}
};
