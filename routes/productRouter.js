const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");

router.get("/categories", productController.categories);
router.get("/", productController.productsList);
router.get("/:id", productController.productDetail);

module.exports = router;
