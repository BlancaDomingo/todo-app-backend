import { Router } from 'express';
import { getAllTodos, addTodo, updateTodo, deleteTodo } from '../../src/controller/todos.controller.js';
import { permission } from '../middleware/permission.middleware.js'


const todosRouter = new Router();


todosRouter.use((req, res, next) => {

    console.log('Logging: ' + req.url + ' time ' + Date.now());

    next();
})

todosRouter.route('/:id')
   
    .get(permission(), getAllTodos)
    .post(permission(), addTodo)
  

todosRouter.route('/:idUser/:idTodo')
    .put(permission(), updateTodo)
    .delete(permission(), deleteTodo)





export default todosRouter;