'use strict';
const {
	Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class product extends Model {
		/**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
		static associate(models) {
			// define association here
			models.product.hasMany(models.product, {as: 'variants', foreignKey: 'parent_id'});


		}
	}
	product.init({
		productId: {
			defaultValue: DataTypes.UUIDV4,
			type: DataTypes.UUID,
			primaryKey: true,
			field: 'product_id'

		},
		parentId: {
			type: DataTypes.UUID,
			field: 'parent_id'
		},
		init:DataTypes.BOOLEAN,
		externalId:{
			type: DataTypes.STRING,
			unique:true,
			allowNull: false,
			field: 'external_id'
		},
		searchText: {
			type: DataTypes.STRING,
			field: 'search_text'
		},
		jsonProduct: {
			type: DataTypes.JSONB,
			field: 'json_product'
		},

		name: DataTypes.STRING,
		price: DataTypes.NUMERIC,
		image: DataTypes.STRING,
		sku: DataTypes.STRING,
		storeProductId: {
			type: DataTypes.STRING,
			field: 'store_product_id'
		},



	}, {
		sequelize,
		modelName: 'product',
		tableName: 'products',
		updatedAt: 'updated_at',
		createdAt: 'created_at'


	});

	return product;
};
