const axios = require('axios');

class HeavenStoreDatasource {
	async adaptToProduct(product) {
		const variants = [];
		for (const variant of product.variants) {
			const variantAdapted = await this.adaptToVariant(variant);
			variants.push(variantAdapted);
		}
		return {
			'external_id': product.id,
			'sku': product.variants.length> 0 ?  product.variants[0].sku: 0,
			'image':  product.image.src,
			'name': product.title,
			'short_description': product.body_html,
			'long_description': product.body_html,
			'price': product.variants.length> 0 ?  parseInt(product.variants[0].price): 0,
			'variants': variants
		};
	}

	async adaptToVariant(variant) {
		return {
			'legacyResourceId': variant.id,
			'inventoryQuantity': variant.inventory_quantity,
			'selectedOptions': {
				name: variant.title,
				value: variant.option1,
				displayName:`${ variant.title}`
			},
			'price': variant.price === '' ? 0 : parseInt(variant.price),
			'sku':variant.sku,
			'image': variant.image_id !== null? await this.getProductImage(variant.product_id,variant.image_id).image.src:null,
			'externalId':variant.id
		};
	}
	async getProductImage(productId,imageId) {
		let config = {
			method: 'get',
			maxBodyLength: Infinity,
			url: `https://getback-demo-chile.myshopify.com/admin/api/2023-01/products/${productId}/images/${imageId}.json`,
			headers: {
				'X-Shopify-Access-Token': process.env.HEAVEN_STORE_PASSWORD
			}
		};
		let response;
		response = await axios(config);
		return response.data;
	}
	async searchProducts() {
		let config = {
			method: 'get',
			maxBodyLength: Infinity,
			url: 'https://getback-demo-chile.myshopify.com/admin/api/2023-01/products.json',
			headers:{
				'X-Shopify-Access-Token': process.env.HEAVEN_STORE_PASSWORD
			}
		};
		let products = [];
		let response;
		response = await axios(config);
		for (const product of response.data.products) {
			products.push(await this.adaptToProduct(product));
		}
		return products;

	}
}

module.exports = HeavenStoreDatasource;