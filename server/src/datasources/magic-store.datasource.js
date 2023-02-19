const axios = require('axios');
const https = require('https');

class MagicStoreDatasource {

	async adaptToProduct(product){
		return product;
	}
	getEndpointUrl(perPage,page){
		return `https://woocommerce.2bak.cl/wp-json/wc/v3/products?per_page=${perPage}&page=${page}`;
	}
	async searchPaginate(){
		let products = [];
		let currentPage = 1;
		let perPage = 1;

		const agent = new https.Agent({
			rejectUnauthorized: false
		});
		let config = {
			method: 'get',
			maxBodyLength: Infinity,
			url: this.getEndpointUrl(perPage,currentPage),
			auth: {
				username: process.env.MAGIC_STORE_USERNAME,
				password: process.env.MAGIC_STORE_PASSWORD
			},
			httpsAgent: agent
		};

		let response;
		do {
			console.log('call');
			response = await axios(config);
			products = response.data.concat(products);
			currentPage += 1;
			config.url = this.getEndpointUrl(perPage,currentPage);
			console.log('header',parseInt(response.headers['x-wp-totalpages']));
			console.log('currentPage',currentPage);

		}while (parseInt(response.headers['x-wp-totalpages'])!==currentPage);/*{
			currentPage += 1;
			config.url = this.getEndpointUrl(perPage,currentPage)
			response = await axios(config);
			products = Array.join(response.data,products)
		}*/
		
		return products;

	}
}

module.exports = MagicStoreDatasource;