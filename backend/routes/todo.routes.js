import express from 'express';
import { getAllTodo,createTodo,deleteTodo } from '../controllers/todo.controllers.js';

const router = express.Router();

router.post('/get-all-todo',getAllTodo);
router.post('/create-todo',createTodo);
router.post('/delete-todo',deleteTodo);

export default router;