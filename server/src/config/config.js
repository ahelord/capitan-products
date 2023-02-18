require('dotenv').config();

module.exports = {
	'development': {
		'username': process.env.POSTGRESQL_USER,
		'password': process.env.POSTGRESQL_PASSWORD,
		'database': process.env.POSTGRESQL_DB,
		'host': process.env.POSTGRESQL_HOST,
		'port':process.env.POSTGRESQL_PORT,
		'dialect': 'postgres',
		'migrationStorage': 'sequelize',
		'migrationStorageTableName': 'sequelize_migrations',
		'seederStorage': 'sequelize',
		'seederStorageTableName': 'sequelize_seeders'
	},
	'test': {
		'username': process.env.POSTGRESQL_USER,
		'password': process.env.POSTGRESQL_PASSWORD,
		'database': process.env.POSTGRESQL_DB,
		'host': process.env.POSTGRESQL_HOST,
		'port':process.env.POSTGRESQL_PORT,
		'dialect': 'postgres',
		'migrationStorage': 'sequelize',
		'migrationStorageTableName': 'sequelize_migrations',
		'seederStorage': 'sequelize',
		'seederStorageTableName': 'sequelize_seeders'
	},
	'production': {
		'username': process.env.POSTGRESQL_USER,
		'password': process.env.POSTGRESQL_PASSWORD,
		'database': process.env.POSTGRESQL_DB,
		'host': process.env.POSTGRESQL_HOST,
		'port':process.env.POSTGRESQL_PORT,
		'dialect': 'postgres',
		'migrationStorage': 'sequelize',
		'migrationStorageTableName': 'sequelize_migrations',
		'seederStorage': 'sequelize',
		'seederStorageTableName': 'sequelize_seeders'
	}
};
