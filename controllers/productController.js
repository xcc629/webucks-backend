const productService = require("../services/productService");

const categories = async (req, res, next) => {
  try {
    const getCategory = await productService.categories();

    return res.status(200).json({ data: getCategory });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const productsList = async (req, res, next) => {
  try {
    const getProductsList = await productService.productsList();

    return res.status(200).json({ data: getProductsList });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const productDetail = async (req, res, next) => {
  try {
    let para = req.params.id;

    const getProductDetail = await productService.productDetail(para);

    return res.status(200).json({ data: getProductDetail });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = { categories, productsList, productDetail };
