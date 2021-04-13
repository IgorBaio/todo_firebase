'use strict'

const express = require('express');
const router = express.Router();
const TasksController = require('../controllers/tasks_controller');

// Rotas do sistema

router.get('/:uid', TasksController.get);
router.post('/',TasksController.post);
router.put('/',TasksController.put);
router.delete('/',TasksController.delete);

module.exports = router;