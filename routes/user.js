const express = require('express');

const router = express.Router();
const userController = require('../controllers/user');

router.get('/', userController.list);
router.get('/:id', userController.get);
router.post('/', userController.create);
router.patch('/:id', userController.update);
router.delete('/:id', userController.remove);

module.exports = router;
