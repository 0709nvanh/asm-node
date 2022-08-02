import Product from "../models/product";
import Category from "../models/category";
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
  const { limit, search, sortByPrice, sortByName, cateId, time, status } =
    req.query;
  if (limit && !time && !status) {
    try {
      const products = await Product.find()
        .limit(limit)
        .populate("category")
        .exec();
      return res.json(products);
    } catch (error) {
      return res.status(400).json({
        message: "Error",
      });
    }
  } else if (limit && time && status) {
    try {
      const products = await Product.find({ status })
        .limit(limit)
        .populate("category")
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
      const products = await Product.find()
        .sort({ createdAt: time })
        .populate("category")
        .exec();
      return res.json(products);
    } catch (error) {
      return res.status(400).json({
        message: "Error",
      });
    }
  } else if (cateId && !sortByPrice) {
    try {
      const products = await Product.find({ category: cateId })
        .populate("category")
        .exec();
      return res.json(products);
    } catch (error) {
      return res.status(400).json({
        message: "Error",
      });
    }
  } else if (cateId && sortByPrice) {
    try {
      const products = await Product.find({ category: cateId })
        .sort({ priceNew: sortByPrice })
        .populate("category")
        .exec();
      return res.json(products);
    } catch (error) {
      return res.status(400).json({
        message: "Error",
      });
    }
  } else if (!cateId && sortByPrice) {
    try {
      const products = await Product.find()
        .sort({ priceNew: sortByPrice })
        .populate("category")
        .exec();
      return res.json(products);
    } catch (error) {
      return res.status(400).json({
        message: "Error",
      });
    }
  } else if (sortByName) {
    try {
      const products = await Product.find()
        .sort({ title: sortByName })
        .populate("category")
        .exec();
      return res.json(products);
    } catch (error) {
      return res.status(400).json({
        message: "Error",
      });
    }
  } else if (search) {
    try {
      const products = await Product.find({ $text: { $search: search } })
        .populate("category")
        .exec();
      return res.json(products);
    } catch (error) {
      return res.status(400).json({
        message: "Error",
      });
    }
  } else {
    try {
      const products = await Product.find().populate("category").exec();
      return res.json(products);
    } catch (error) {
      return res.status(400).json({
        message: "Error",
      });
    }
  }
};

export const searchProduct = async (req, res) => {
  const { keySearch } = req.body;
  try {
    console.log(keySearch);
    const products = await Product.find({
      title: { $regex: keySearch, $options: "i" },
    })
      .populate("category")
      .exec();
    return res.json(products);
  } catch (error) {
    return res.status(400).json({ message: "Error" });
  }
};

export const read = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug }).populate("category").exec();
    const products = await Product.find({ category: product.category._id }).populate("category").exec();
    return res.json({product, products})
  } catch (error) {
    res.status(400).json({
      message: "Error",
    });
  }
};

export const update = async (req, res) => {
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

export const updateStatus = async (req, res) => {
  try {
    const { category, status } = req.body;
    const checkCate = await Category.findOne({ _id: category });
    if (checkCate.status === false) {
      return res.status(400).json({
        message:
          "Danh mục đang ở trạng thái không hoạt động, không thể cập nhật trạng thái sản phẩm !!!",
      });
    }
    const check = { _id: req.params.id };
    const product = await Product.findOneAndUpdate(
      check,
      { status },
      {
        new: true,
      }
    ).exec();
    return res.json(product);
  } catch (error) {
    res.status(400).json({
      message: "Error",
    });
  }
};
