import express from "express";
import cors from "cors"
import router from "./main1.js"

const app = express();

app.use(cors(
    {
        origin: "https://food-cafe-homeoffoods.netlify.app", 
        credentials: true,
        methods: "GET, POST, PUT, DELETE, OPTIONS",
        allowedHeaders: "Content-Type, Authorization"
      }
));


app.use(express.json());
app.use("/auth", router);
app.get("/", (req, res) => {
    res.send("<h1>Welcome Khaleed, how ya .........</h1>");
});

app.listen(1234, () => {
    console.log("✅ Server running on port 1234");
});
