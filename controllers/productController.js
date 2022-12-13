const Product = require("../models/productModel");
const catchAsync = require('../middlewares/async');


exports.getProducts = catchAsync(async (req, res) => {

    const queryObj = { ...req.query };
    const excludedFields = ["sort", "fields", "page", "limit"];
    excludedFields.map((ele) => delete queryObj[ele]);
  
    const queryStr = JSON.parse(
      JSON.stringify(queryObj).replaceAll(
        /\b(gte|gt|lte|lt)\b/g,
        (match) => `$${match}`
      )
    );
  
    let query = Product.find(queryStr);
  
    if (req.query.sort) {
      const sortedBy = req.query.sort.replaceAll(",", " ");
      query = query.sort(sortedBy);
    } else {
      query = query.sort("createdAt");
    }
  
    if (req.query.fields) {
      const limitedBy = req.query.fields.replaceAll(",", " ");
      query = query.select(limitedBy);
    } else {
      query = query.select("-__v");
    }
  
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1  || 100;
    const skip = (page * limit) - limit;
  
    query = query.skip(skip).limit(limit);
  
    if (req.query.page) {
      const numOfProduct = await Product.countDocuments();
      if (skip >= numOfProduct) {
        throw new Error("This page Doesn't Exist !");
      }
    }
  
    const products = await query;
    res.status(200).json({
      status: "success",
      numOfProduct: products.length,
      products,
    });
  })
