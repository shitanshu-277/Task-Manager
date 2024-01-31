const express=require('express');
const app=express();
const router=express.Router();

const {createTodo,Alltodos,markTodoDone,deleteTodo,getCompletedTodos,editTodo,dueTodo}=require('../controllers/todo.js');

router.get('/todo',Alltodos);
router.post('/create',createTodo);
router.put('/edit/:id',editTodo);
router.put('/done/:id',markTodoDone);
router.delete('/delete/:id',deleteTodo);
router.get('/completed',getCompletedTodos);
router.put('/due/:id',dueTodo);

module.exports=router;