const Category = require('../models').category;

class CategoriesInteractor {
	constructor() {
	}

	async findCategories(){
		return await Category.findAll({
			attributes: ['label', 'identifier']
		});
	}
}
module.exports = CategoriesInteractor;