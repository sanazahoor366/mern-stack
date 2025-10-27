import express from 'express';
import { createTodo, deleteTask, getAllTask, updateTask } from '../controller/todo_controller.js';
const router = express.Router();
//    /api/task/id
router.post('/create/task', createTodo);
router.get('/get/task', getAllTask);
router.put('/update/task/:id', updateTask);
router.delete('/delete/task/:id', deleteTask);
export default router;