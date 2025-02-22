import express from "express"
import router from "./main1.js"
import cors from "cors"

const app = express()
app.use(cors({
    origin:"http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    credentials: true
  }))
app.use(express.json())
app.use("/auth",router)
app.get("/",(req,res)=>{
    res.send("<h1>Welcome Khaleed how ya .........</h1>")
})

app.listen(1234,()=>{
    console.log("Listening at port 1234")
})