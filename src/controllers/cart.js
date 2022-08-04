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
        populate: { path: "productId" },
      })
      .exec();
    res.json(carts);
  } catch (error) {
    console.log(error);
  }
};

export const getOrderById = async (req, res) => {
  try {
    //   const id = req.params.id;
    //   console.log(id);
    const cart = await Cart.findOne({ _id: req.params.id })
      .populate("userId")
      .populate({
        path: "listCart",
        populate: { path: "productId" },
      });
    res.json(cart);
  } catch (error) {
    console.log(error);
  }
};
