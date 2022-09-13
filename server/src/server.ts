import { AppDataSource } from "./data-source"
import authRoutes from './routes/auth';
import cookieParser from "cookie-parser";
import cors from 'cors';
import dotenv from 'dotenv';
import express from "express";
import morgan from "morgan";
import postRoutes from './routes/posts';
import subRoutes from './routes/subs';
import userRoutes from './routes/users';
import voteRoutes from './routes/votes';

const app = express();
dotenv.config();

const origin = process.env.ORIGIN;
app.use(cors({
    origin,
    credentials: true
}))
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());

app.get("/", (_, res) => res.send("running"));
app.use("/api/auth", authRoutes)
app.use("/api/subs", subRoutes)
app.use("/api/posts", postRoutes)
app.use("/api/votes", voteRoutes)
app.use("/api/users", userRoutes)

app.use(express.static("public"));

let port = 4000;
app.listen(port, async () => {
    console.log(`server running at ${process.env.APP_URL}`);

    AppDataSource.initialize().then(() => {
        console.log("database initialized")
    }).catch(error => console.log(error))

})