import express from "express";
import { getTodo, shareTodo, deleteTodo, getTodosById, 
  createTodo, toggleCompleted,  getUserByEmail, getUserById, 
  getSharedTodoById} from './database.js';
import cors from 'cors';

const corsOptions ={
  origin: "http://127.0.0.1:5173",
  methods: ["GET", "POST"],
  credentials: true
};

const app = express();
app.use(express.json());
app.use(cors(corsOptions));

app.get("/todos/:id", async (req, res)=>{
  const todos = await getTodosById(req.params.id);
  res.status(200).send(todos);
});

app.get("/todos/shared_todos/:id", async (req,res)=>{
  const todo = await getSharedTodoById(req.params.id);
  const author = await getUserById(todo.user_id);
  const shared_with = await getUserById(todo.shared_with_id);
  res.status(200).send({author,shared_with});
});

app.get("/users/:id", async (req, res)=>{
  const user = await getUserById(req.params.id);
  req.status(200).send(user);
});

app.put("todos/:id", async (req, res)=>{
  const {value} = req.body;
  const todo = await toggleCompleted(req.params.id, value);
  req.status(200).send(todo);
});

app.delete("/todos/:id", async (req, res)=>{
  await deleteTodo(req.params.id);
  res.send({message: "ToDo deleted successfully"});
});

app.post("/todos/shared_todos", async (req, res)=>{
  const {todo_id, user_id, email} = req.body;
  const userToShare = await getUserByEmail(email);
  const sharedTodo = await shareTodo(todo_id, user_id, userToShare.id);
  req.status(201).send(sharedTodo);
});

app.post("/todos", async (req, res)=>{
  const {user_id, title}= req.body;
  const todo = await createTodo(user_id, title);
  req.status(201).send(todo);
})

app.listen(8080, ()=>{
  console.log("Server running on port 8080");
});
