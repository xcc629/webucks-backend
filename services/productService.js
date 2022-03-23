const productDao = require("../models/productDao");

const categories = async () => {
  const getCategory = await productDao.getCategory();

  return getCategory;
};

const productsList = async () => {
  const getProductsList = await productDao.getProductsList();

  return getProductsList;
};

const productDetail = async (para) => {
  const getProductDetail = await productDao.getProductDetail(para);
  return getProductDetail;
};

module.exports = { categories, productsList, productDetail };
