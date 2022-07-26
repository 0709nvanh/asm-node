import slugify from "slugify";
import Category from "../models/category";
import Product from "../models/product";

export const addCate = async (req, res) => {
  try {
    req.body.slug = slugify(req.body.name);
    const category = await new Category(req.body).save();
    res.json(category);
  } catch (error) {
    res.status(400).json({
      message: "Error",
    });
  }
};

export const listCate = async (req, res) => {
  try {
    const categories = await Category.find().exec();
    res.json(categories);
  } catch (error) {
    console.log(error);
  }
};

export const readCate = async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug }).exec();
    const products = await Product.find({ category: category._id })
      .populate("category")
      .exec();
    res.json({ category, products });
  } catch (error) {
    res.status(400).json({
      message: "Error",
    });
  }
};

export const updateStatusCate = async (req, res) => {
  try {
    const cate = await Category.findOneAndUpdate(
      { _id: req.params.id },
      { status: req.body.status },
      { new: true }
    );
    if (req.body.status === false) {
      await Product.updateMany(
        { category: req.params.id },
        {
          $set: {
            status: false
          },
        },
        { multi: true }
      );
    }
    if (cate) {
      return res.json(cate);
    } else {
      return res.status(400).json({
        message: "Error",
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: "Error",
    });
  }
};

export const removeCate = async (req, res) => {
  try {
    const category = await Category.findOneAndDelete({
      slug: req.params.slug,
    }).exec();
    res.json(category);
  } catch (error) {
    res.status(400).json({
      message: "Error",
    });
  }
};

export const updateCate = async (req, res) => {
  try {
    req.body.slug = slugify(req.body.name);
    const category = await Category.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true }
    ).exec();
    res.json(category);
  } catch (error) {
    res.status(400).json({
      message: "Error",
    });
  }
};
