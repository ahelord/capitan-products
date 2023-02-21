const express = require('express');
const ProductsController = require('../../controllers/products.controller');

const productsController = new ProductsController();
const router = express.Router();

router
	.route('/')
	.get(productsController.getProducts);

module.exports = router;
