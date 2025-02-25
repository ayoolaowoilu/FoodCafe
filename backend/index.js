import express from "express";
import cors from "cors"
import router from "./main1.js"

const app = express();

app.use(cors(
    {
        origin: "https://food-cafe-homeoffoods.netlify.app", 
    methods: ["GET", "POST", "PUT", "DELETE"], 
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
      }
));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://food-cafe-homeoffoods.netlify.app");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  

    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }
  
    next();
  });


app.use(express.json());
app.use("/auth", router);
app.get("/", (req, res) => {
    res.send("<h1>Welcome Khaleed, how ya .........</h1>");
});

app.listen(1234, () => {
    console.log("✅ Server running on port 1234");
});
