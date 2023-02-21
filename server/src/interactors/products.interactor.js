const {Op} = require('sequelize');
const Product = require('../models').product;
const Operators = {
	EQUAL: 'eq',
	GREATER_THAN: 'gt',
	LOWER_THAN: 'lt'
};

class ProductsInteractor {


	constructor() {

	}

	async findProducts(price, priceOperator, searchTerm) {
		let options;
		const searchFilter = this.getSearchFilter(searchTerm);
		const priceFilter = this.getPriceFilter(priceOperator, price);
		if(searchFilter && priceFilter){
			options = {
				where:{
					[Op.or]: [
						searchFilter,
						priceFilter
					]},
				include: [
					{
						model: Product, as: 'variants'
					}
				]
			};
		}
		if(searchFilter && !priceFilter){
			options = {
				where:{
					[Op.or]: [
						searchFilter
					]
				},
				include: [
					{
						model: Product, as: 'variants'
					}
				]
			};
		}

		if(!searchFilter && priceFilter){
			options = {
				where:{
					[Op.or]: [
						priceFilter
					]
				},
				include: [
					{
						model: Product, as: 'variants'
					}
				]
			};
		}


		if (!priceFilter && !searchFilter) {
			options = {
				include: [
					{
						model: Product, as: 'variants'
					}
				]
			};
		}
		console.log('where',JSON.stringify(options));
		return await Product.findAll(options);
	}

	getSearchFilter(searchTerm) {
		let searchFilter;
		if (searchTerm) {
			searchFilter = {
				[Op.or]: [	
					{name: {[Op.substring]: searchTerm}},
					{sku: {[Op.substring]: searchTerm}}
				]
			};
		}
		return searchFilter;
	}

	getPriceFilter(priceOperator, price) {
		let priceFilter;
		if (!priceOperator && !price) return priceFilter;
		switch (priceOperator) {
		case Operators.EQUAL:
			priceFilter = {
				price: {
					[Op.eq]: price
				}
			};
			break;

		case Operators.LOWER_THAN:
			priceFilter = {
				price: {
					[Op.lt]: price
				}
			};
			break;
		case Operators.GREATER_THAN:
			priceFilter = {
				price: {
					[Op.gt]: price
				}
			};
			break;

		}

		return priceFilter;
	}
}


module.exports = ProductsInteractor;