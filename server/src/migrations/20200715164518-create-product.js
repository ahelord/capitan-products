'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('products', {
			productId: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.DataTypes.UUID,
				field: 'product_id'
			},
			parentId: {
				type: Sequelize.DataTypes.UUID,
				field: 'parent_id',
				references: {
					model: {
						tableName: 'products',
					},
					key: 'product_id'
				},
				allowNull: true
			},
			init: Sequelize.DataTypes.BOOLEAN,
			externalId:{
				type: Sequelize.DataTypes.STRING,
				unique:true,
				allowNull: false,
				field: 'external_id'
			},
			searchText: {
				type: Sequelize.DataTypes.STRING,
				field: 'search_text'
			},
			jsonProduct: {
				type: Sequelize.DataTypes.JSONB,
				field: 'json_product'
			},
			name: Sequelize.DataTypes.STRING,
			price: Sequelize.DataTypes.NUMERIC,
			image: Sequelize.DataTypes.STRING,
			sku: Sequelize.DataTypes.STRING,
			storeProductId: {
				type: Sequelize.DataTypes.STRING,
				field: 'store_product_id'
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DataTypes.DATE,
				defaultValue: Sequelize.DataTypes.NOW,
				field: 'created_at'

			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DataTypes.DATE,
				defaultValue: Sequelize.DataTypes.NOW,
				field: 'updated_at'

			}
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('products');
	}
};