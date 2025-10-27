import express from "express";
import cors from "cors";
import dbconnection from "./db/database.js";
import User from "./model/user.js";
import todoRouter from './routes/taskRoute.js'
import bodyParser from 'body-parser'
const app = express();
app.use(express.json());


app.use(express.json());
app.use(bodyParser.json())
app.use(cors())

app.get("/", (req, res) => {
  res.send("my name is sana");
});
app.use('/api', todoRouter)



const port = process.env.PORT || 3000;
app.listen(port, () => console.log("server is running on port:", port));
