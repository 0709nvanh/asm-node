import Product from "../models/product";
import slugify from "slugify";

export const create = async (req, res) => {
  try {
    req.body.slug = slugify(req.body.title);
    const product = await new Product(req.body).save();
    return res.json(product);
  } catch (error) {
    return res.status(400).json({
      msg: "Error",
    });
  }
};

export const list = async (req, res) => {
  const { limit, search, sortByPrice, sortByName, cateId, time } = req.query;
  if (limit) {
    try {
      const products = await Product.find().limit(limit).populate('category').exec();
      return res.json(products);
    } catch (error) {
      return res.status(400).json({
        message: "Error",
      });
    }
  } else if (limit && time) {
    try {
      const products = await Product.find()
        .limit(limit).populate('category')
        .sort({ createdAt: time })
        .exec();
        return res.json(products);
    } catch (error) {
      return res.status(400).json({
        message: "Error",
      });
    }
  } else if (!limit && time) {
    try {
      const products = await Product.find().sort({ createdAt: time }).populate('category').exec();
      return res.json(products);
    } catch (error) {
      return res.status(400).json({
        message: "Error",
      });
    }
  } else if (cateId) {
    try {
      const products = await Product.find({ category: cateId }).populate('category').exec();
      return res.json(products);
    } catch (error) {
      return res.status(400).json({
        message: "Error",
      });
    }
  } else if (sortByPrice) {
    try {
      const products = await Product.find()
        .sort({ price: sortByPrice })
        .populate("category")
        .exec();
        return res.json(products);
    } catch (error) {
      res.status(400).json({
        message: "Error",
      });
    }
  } else if (sortByName) {
    try {
      const products = await Product.find()
        .sort({ title: sortByName })
        .populate("category")
        .exec();
        return  res.json(products);
    } catch (error) {
      res.status(400).json({
        message: "Error",
      });
    }
  } else if (search) {
    try {
      const products = await Product.find({ $text: { $search: search } })
        .populate("category")
        .exec();
      res.json(products);
    } catch (error) {
      res.status(400).json({
        message: "Error",
      });
    }
  } else {
    try {
      const products = await Product.find().populate("category").exec();
      res.json(products);
    } catch (error) {
      res.status(400).json({
        message: "Error",
      });
    }
  }
};

export const read = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug }).exec();
    res.json(product);
  } catch (error) {
    res.status(400).json({
      message: "Error",
    });
  }
};

export const update = async (req, res) => {
  // console.log('m', req.params.slug)
  try {
    req.body.slug = slugify(req.body.title);
    const check = { slug: req.params.slug };
    const product = await Product.findOneAndUpdate(check, req.body, {
      new: true,
    }).exec();
    res.json(product);
  } catch (error) {
    res.status(400).json({
      message: "Error",
    });
  }
};
