const router = require('express').Router();
const todoController=require('./../controllers/todo.controller');
const middleware=require('./../helpers/middleware');
router.post('/create', middleware.auth, todoController.create);
router.get('/', todoController.view);
router.put('/:todo_id/update', middleware.auth, todoController.update);
router.delete('/:todo_id/delete', middleware.auth, todoController.remove);

module.exports = router;