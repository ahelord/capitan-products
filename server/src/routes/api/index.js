require('dotenv').config();
const express = require('express');
const storesRoute = require('./stores.route');
const productsRoute = require('./products.route');

const router = express.Router();
router.use('/search', storesRoute);
router.use('/products', productsRoute);
router.get('/status', (req, res) => res.send('OK'));

module.exports = router;
