import express from "express"
import router from "./main1.js"
import cors from "cors"

const app = express()
app.use(cors())
app.use(express.json())
app.use("/auth",router)
app.get("/",(req,res)=>{
    res.send("<h1>Welcome .........</h1>")
})

app.listen(1234,()=>{
    console.log("Listening at port 1234")
})