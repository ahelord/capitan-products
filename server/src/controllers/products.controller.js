const httpStatus = require('http-status');
const {formatError} = require('../utils/format-error.util');
const ProductsInteractor = require('../interactors/products.interactor');

class ProductsController {
	constructor() {


	}

	async getProducts(req, res, next) {
		try{
			const searchText = req.query.search_text;
			const priceQuery = req.query.price;
			let priceFilter = [];
			let price;
			let priceOperator;
			if(priceQuery){
				 priceFilter = priceQuery.split(':');
				 priceOperator = priceFilter[0];
				 price = priceFilter[1];
			}
			const interactor = new ProductsInteractor();
			const response = await interactor.findProducts(price,priceOperator,searchText);
			res.json(response);
		}catch (error) {
			console.error(error);
			res.status(httpStatus.BAD_REQUEST).json({message:httpStatus[httpStatus.BAD_REQUEST]});
			next(formatError(httpStatus[httpStatus.BAD_REQUEST],error,req));
		}
	}
}

module.exports = ProductsController;

