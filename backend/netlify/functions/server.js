import express from "express";
import cors from "cors";
import serverless from "serverless-http";
import router from "./main1.js";

const app = express();


app.use(cors({ origin: "*", methods: "GET,POST,PUT,DELETE,OPTIONS" }));

app.use(express.json());
app.use("/auth", router);

app.get("/", (req, res) => {
    res.send("<h1>Welcome Khaleed, how ya .........</h1>");
});


export const handler = serverless(app);
