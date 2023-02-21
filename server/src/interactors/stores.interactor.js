const MagicStoreDataSource = require('../datasources/magic-store.datasource');
const HeavenStoreDatasource = require('../datasources/heaven-store.datasource');
const httpStatus = require('http-status');
const Product = require('../models').product;
const Store = {
	Heaven: 'HeavenStore',
	Magic: 'MagicStore'
};

class StoresInteractor {


	constructor() {
		this.magicStoreDataSource = new MagicStoreDataSource();
		this.heavenStoreDatasource = new HeavenStoreDatasource();

	}

	async searchProducts(store) {
		try {
			let productsToSave = [];
			switch (store) {
			case Store.Magic:
				productsToSave = await this.magicStoreDataSource.searchProducts();
				break;
			case Store.Heaven:
				productsToSave = await this.heavenStoreDatasource.searchProducts();
				break;

			}
			for (let i = 0; i < productsToSave.length; i++) {
				const [product, created] = await Product.upsert({
					externalId: productsToSave[i].external_id,
					name: productsToSave[i].name,
					price: productsToSave[i].price,
					image: productsToSave[i].image,
					sku: productsToSave[i].sku,
					init: false,
					jsonProduct: productsToSave[i]
				});
				productsToSave[i].product_id = product.productId;

				for (const variant of productsToSave[i].variants) {
					const [variantCreated, created] = await Product.upsert({
						parentId: product.productId,
						externalId: variant.externalId,
						name: variant.name,
						price: variant.price,
						image: variant.image,
						sku: variant.sku,
						init: false,
						jsonProduct: variant
					});
				}
			}
			return {
				success: true,
				message: 'OK',
				result: {
					count: productsToSave.length,
					items: productsToSave

				}
			};


		} catch (error) {
			return {
				success: false,
				message: httpStatus[httpStatus.BAD_REQUEST],
				result: {
					count: 0,
					items: []
				}
			};
		}

	}
}

module.exports = StoresInteractor;