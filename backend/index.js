import express from "express";
import cors from "cors"
import router from "./main1.js"

const app = express();

app.use(
    cors({
      origin: "https://food-cafe-homeoffoods.netlify.app"
    })
  );
  

  app.use(express.json());
  

  // app.use((req, res, next) => {
  //   res.header("Access-Control-Allow-Origin", "https://food-cafe-homeoffoods.netlify.app");
  //   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  //   res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  //   res.header("Access-Control-Allow-Credentials", "true");
  
  //   if (req.method === "OPTIONS") {
  //     return res.sendStatus(200);
  //   }
  
  //   next();
  // });



app.use("/auth", router);
app.get("/", (req, res) => {
    res.send("<h1>Welcome Khaleed, how ya .........</h1>");
});

app.listen(1234, () => {
    console.log("✅ Server running on port 1234");
});
