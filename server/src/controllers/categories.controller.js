const httpStatus = require('http-status');
const {formatError} = require('../utils/format-error.util');
const CategoriesInteractor = require('../interactors/categories.interactor');

class CategoriesController {
	constructor() {


	}

	async getCategories(req, res, next) {
		try{
			const interactor = new CategoriesInteractor();
			const response = await interactor.findCategories();
			res.json(response);
		}catch (error) {
			console.error(error);
			res.status(httpStatus.BAD_REQUEST).json({message:httpStatus[httpStatus.BAD_REQUEST]});
			next(formatError(httpStatus[httpStatus.BAD_REQUEST],error,req));
		}
	}
}

module.exports = CategoriesController;

