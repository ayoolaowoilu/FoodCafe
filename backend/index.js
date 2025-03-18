import express from "express";
import cors from "cors"
import router from "./main1.js"

const app = express();

app.use(
    cors({
        origin:"*",
        methods:['GET','POST','PUT','DELETE','OPTIONS']
    })
  );
  
  app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Origin','X-Requested-With','Content-Type','Accept')
    res.header('Access-Control-Allow-Methods','GET , POST , PUT , DELETE , OPTIONS')
    next()
})
  app.use(express.json());
  
app.use("/auth", router);
app.get("/", (req, res) => {
    res.send("<h1>Welcome Khaleed, how ya .........</h1>");
});

app.listen(1234, () => {
    console.log("✅ Server running on port 1234");
});
