const express = require('express');
const router = express.Router();

const taks_controller = require('../controllers/task.controller');


router.get('/', taks_controller.task_all);
router.get('/populate', taks_controller.task_all_populate);
module.exports = router;