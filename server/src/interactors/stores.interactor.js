const MagicStoreDataSource = require('../datasources/magic-store.datasource');
const HeavenStoreDatasource = require('../datasources/heaven-store.datasource');
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
		let productsToSave = [];
		switch (store){
		case Store.Magic:
			 productsToSave = await this.magicStoreDataSource.searchProducts();
			 break;
		case Store.Heaven:
			productsToSave = await this.heavenStoreDatasource.searchProducts();
			break;

		}
		for (const productToSave of productsToSave) {
			const [product, created] = await Product.upsert({
				externalId: productToSave.external_id,
				name: productToSave.name,
				price: productToSave.price,
				image: productsToSave.image,
				sku: productToSave.sku,
				init:false,
				jsonProduct:productsToSave
			});
			for (const variant of productToSave.variants) {
				const [variantCreated, created] =  await Product.upsert({
					parentId: product.productId,
					externalId: variant.externalId,
					name: variant.name,
					price: variant.price,
					image: variant.image,
					sku: variant.sku,
					init:false,
					jsonProduct:variant
				});
			}
		}
		return productsToSave;
	}
}

module.exports = StoresInteractor;