import express from "express";
import cors from "cors"; 
import serverless from "serverless-http";

const app = express();

app.use(cors({
    origin: "https://food-cafe-homeoffoods.netlify.app", 
    credentials: true,
    methods: "GET, POST, PUT, DELETE, OPTIONS",
    allowedHeaders: "Content-Type, Authorization"
}));

app.use(express.json());
let router;
const loadRouter = async () => {
    const module = await import("../../main1.js");
    router = module.default || module;
};
await loadRouter();
app.use("/auth", router);

app.get("/", (req, res) => {
    res.send("<h1>Welcome Khaleed, how ya .........</h1>");
});


export const handler = serverless(app);
