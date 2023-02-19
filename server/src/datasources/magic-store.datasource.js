const axios = require('axios');
const https = require('https');

class MagicStoreDatasource {
	async adaptToProduct(product) {
		return {
			'external_id': product.id,
			'sku': product.sku,
			'image': product.images.length > 0 ? product.images[0].src : null,
			'name': product.name,
			'short_description': product.short_description,
			'long_description': product.description,
			'price': product.price === '' ? 0 : parseInt(product.price),
			'variants': product.variations.length > 0 ? await this.getProductVariants(product.id, product.variations) : []
		};
	}

	 adaptToVariant(variant) {
		return {
			'legacyResourceId': variant.id,
			'inventoryQuantity': variant.stock_quantity,
			'selectedOptions': variant.attributes.map(attribute => ({
				name: attribute.name,
				value: attribute.option,
				displayName: `${attribute.name} ${attribute.option}`
			})),
			'price': variant.price
		};
	}

	getProductsEndpointUrl(perPage, page) {
		return `https://woocommerce.2bak.cl/wp-json/wc/v3/products?per_page=${perPage}&page=${page}`;
	}

	getProductVariantEndpointUrl(productId, variantId) {
		return `https://woocommerce.2bak.cl/wp-json/wc/v3/products/${productId}/variations/${variantId}`;
	}

	async getProductVariants(productId, variantsIds) {

		const agent = new https.Agent({
			rejectUnauthorized: false
		});
		let variants = [];
		for (const variantId of variantsIds) {

			let config = {
				method: 'get',
				maxBodyLength: Infinity,
				url: this.getProductVariantEndpointUrl(productId, variantId),
				auth: {
					username: process.env.MAGIC_STORE_USERNAME,
					password: process.env.MAGIC_STORE_PASSWORD
				},
				httpsAgent: agent
			};
			console.log('call variant');
			const response = await axios(config);
			const variant = this.adaptToVariant(response.data);
			variants.push(variant);
		}
		return variants;
	}

	async searchProducts() {
		let currentPage = 1;
		let perPage = 5;

		const agent = new https.Agent({
			rejectUnauthorized: false
		});
		let config = {
			method: 'get',
			maxBodyLength: Infinity,
			url: this.getProductsEndpointUrl(perPage, currentPage),
			auth: {
				username: process.env.MAGIC_STORE_USERNAME,
				password: process.env.MAGIC_STORE_PASSWORD
			},
			httpsAgent: agent
		};
		let products = [];
		let response;

		do {
			console.log('call');
			response = await axios(config);
			const productsAdapted = [];
			for (const product of response.data) {
				productsAdapted.push(await this.adaptToProduct(product));
			}
			products = productsAdapted.concat(products);
			currentPage += 1;
			config.url = this.getProductsEndpointUrl(perPage, currentPage);
			console.log('header', parseInt(response.headers['x-wp-totalpages']));
			console.log('currentPage', currentPage);

		} while (parseInt(response.headers['x-wp-totalpages']) !== currentPage);/*{
			currentPage += 1;
			config.url = this.getEndpointUrl(perPage,currentPage)
			response = await axios(config);
			products = Array.join(response.data,products)
		}*/

		return products;

	}
}

module.exports = MagicStoreDatasource;