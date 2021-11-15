const express = require('express');

const router = express.Router();
const billController = require('../controllers/bill');

router.get('/', billController.list);
router.get('/:id', billController.get);
router.post('/', billController.create);
router.patch('/:id', billController.update);
router.delete('/:id', billController.remove);

module.exports = router;
