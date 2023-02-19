const MagicStoreDataSource = require('../datasources/magic-store.datasource');
class StoresInteractor {

	constructor() {
		this.magicStoreDataSource = new MagicStoreDataSource();

	}

	async searchProducts() {

		return await this.magicStoreDataSource.searchPaginate();
	}
}

module.exports = StoresInteractor;