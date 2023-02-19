const httpStatus = require('http-status');
const {formatError} = require('../utils/format-error.util');
const StoreInteractor = require('../interactors/stores.interactor');

class StoresController {
	constructor() {


	}

	async getSearch(req, res, next) {
		try{
			const interactor = new StoreInteractor();
			const response = await interactor.searchProducts();
			res.json(response);
		}catch (error) {
			console.error(error);
			res.status(httpStatus.BAD_REQUEST).json({message:httpStatus[httpStatus.BAD_REQUEST]});
			next(formatError(httpStatus[httpStatus.BAD_REQUEST],error,req));
		}
	}
}

module.exports = StoresController;

