'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('categories', {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID
			},
			identifier: {
				type: Sequelize.STRING,
				unique:true,
				allowNull: false,
			},
			label: {
				type: Sequelize.STRING
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.NOW 
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.NOW 
			}
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('categories');
	}
};