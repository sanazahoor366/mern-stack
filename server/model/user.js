import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
   taskname: {
    type: String,
    required: true
   },
    isdone: {
    type: Boolean,
    required: true
   }
});

const TodoMOdel = mongoose.model('todo', todoSchema);
export default TodoMOdel;