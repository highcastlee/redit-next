import { AppDataSource } from "./data-source"
import authRoutes from './routes/auth';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';

const app = express();
const origin = "http://localhost:3000";

app.use(cors({
  origin,
  credentials: true
}));

app.use(express.json());
app.use(morgan("dev"));

dotenv.config();

app.get("/", (_,res) => res.send("running"));
app.use("/api/auth", authRoutes);
let port = 4000;

app.listen(port, async () => {
  console.log(`server runnning at port : ${port}`);


  AppDataSource.initialize().then(async () => {
      console.log("Inserting a new user into the database...")
  }).catch(error => console.log(error))

})