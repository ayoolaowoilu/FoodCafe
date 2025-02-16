import express from "express"
import router from "./main1.js"
import cros from "cros"

const app = express()
app.use(cros())
app.use(express.json())
app.use("/auth",router)

app.listen(1234,()=>{
    console.log("Listening at port 1234")
})