const express = require('express');
const CategoriesController = require('../../controllers/categories.controller');

const categoriesController = new CategoriesController();
const router = express.Router();

/**
 * @swagger
 * path:
 *  /categories/:
 *    get:
 *      summary: Get category
 *      tags: [categories]
 *      responses:
 *        "200":
 *          description: A category schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/category'
 */
router
	.route('/')
	.get(categoriesController.getCategories);

module.exports = router;
