const MagicStoreDataSource = require('../datasources/magic-store.datasource');
const Product = require('../models').product;
class StoresInteractor {

	constructor() {
		this.magicStoreDataSource = new MagicStoreDataSource();

	}

	async searchProducts() {
		const productsToSave = await this.magicStoreDataSource.searchProducts();
		for (const productToSave of productsToSave) {

			//const product = Product.build({ name: "Jane" });

		}
		return await this.magicStoreDataSource.searchProducts();
	}
}

module.exports = StoresInteractor;