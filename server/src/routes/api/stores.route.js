const express = require('express');
const StoresController = require('../../controllers/stores.controller');

const storesController = new StoresController();
const router = express.Router();

router
	.route('/')
	.get(storesController.getSearch);

module.exports = router;
