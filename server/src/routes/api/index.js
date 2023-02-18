require('dotenv').config();
const express = require('express');
const categoriesRoute = require('./categories.route');
const router = express.Router();
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


router.use('/categories', categoriesRoute);

router.get('/status', (req, res) => res.send('OK'));

// Swagger set up
const options = {
	swaggerDefinition: {
		openapi: '3.0.0',
		info: {
			title: 'My express sequelize API',
			version: '1.0.0',
			description:
          '',
			contact: {
				name: 'John Doe',
				url: '',
				email: 'example@example.com'
			}
		},
		servers: [
			{
				url: process.env.API_URL
			}
		]
	},
	apis: ['./models/**.js','./routes/api/**.js'],

};
const swaggerSpecs = swaggerJsdoc(options);
router.use('/docs', swaggerUi.serve);
router.get(
	'/docs',
	swaggerUi.setup(swaggerSpecs, {
		explorer: true
	})
);

router.get('/docs.json', (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	res.send(swaggerSpecs);
});


module.exports = router;
