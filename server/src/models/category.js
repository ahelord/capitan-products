'use strict';
const {
	Model
} = require('sequelize');

/**
 * @swagger
 *  components:
 *    schemas:
 *      category:
 *        type: object
 *        required:
 *          - identifier
 *          - label
 *        properties:
 *          identifier:
 *            type: string
 *            description: Identifier for category, needs to be unique.
 *          label:
 *            type: string
 *        example:
 *           label: Comics
 *           identifier: comics
 */

module.exports = (sequelize, DataTypes) => {
	class category extends Model {
		/**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
		static associate(models) {
			// define association here
		}
	}
	category.init({
		id: {
			type: DataTypes.UUID,
			primaryKey: true
		},
		identifier:{
			type: DataTypes.STRING,
			unique:true,
			allowNull: false,
		},
		label: DataTypes.STRING

	}, {
		sequelize,
		modelName: 'category',
	});

	return category;
};
