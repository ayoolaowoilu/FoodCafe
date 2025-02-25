import express, { query }  from "express"
import jwt  from "jsonwebtoken"
import bcrypt  from "bcryptjs"
import dotenv  from "dotenv"
import mysql  from "mysql2/promise"
import multer  from "multer"
import fs  from "node:fs"
dotenv.config()
const router = express.Router()
const db = await mysql.createConnection({
    host:process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE,
    port:process.env.PORT
})
if(db){
    console.log("Database connected ")
}else{
    console.log("database disconeted ")
}

router.post("/reg",async(req,res)=>{
    try {
        const { username,email,number,password } = req.body
   
        if(username && email && number && password){
            const query = "SELECT COUNT(*) as count FROM users WHERE username=?"
             const query1 = "SELECT COUNT(*) as count FROM users WHERE email=?"
              const query2 = "SELECT COUNT(*) as count FROM users WHERE _number=?"
            const [resp] = await db.query(query,[username])
            const [resp1]  =await db.query(query1,[email])
            const [resp2] = await db.query(query2,[number])
            if(resp[0].count > 0 ){
                res.send({msg:"username already taken !"})
            }else  if(resp1[0].count > 0 ){
                res.send({msg:"Email already taken !"})
            }else  if(resp2[0].count > 0 ){
                res.send({msg:"username already taken !"})
            }else{
                const salt = 6
                const hash = await bcrypt.hash(password,salt)
                console.log(hash)
                const que = "INSERT INTO users(username,email,_number,_password) VALUE(?,?,?,?)"
                await db.query(que,[username,email,number,hash])
                res.send({msg:"Account sucessfully connected"})
            }
           
        }else{
            res.send({msg:"Empty spaces not filled"})
        }
    } catch (err) {
        console.log(err)
    }
   
})
router.post("/login",async(req,res)=>{
    try {
        const { username,password } = req.body
        
        if ( username && password ){
            const [reso] =await db.query("SELECT COUNT(*) as count FROM users WHERE username = ? OR email = ?",[username,username])
            
            if(reso[0].count > 0 ){
                const query = "SELECT username,_password FROM users WHERE username = ? OR email = ?"
                const [resp] = await db.query(query,[username,username])
                   const hashed = resp[0]._password
                   const conn = await bcrypt.compare(password,hashed)
                   if(conn){
                    const payload = {
                        username:username,
                        exp: Math.floor(Date.now() / 1000 ) + 3600
                    }
                    const token  = jwt.sign(payload , process.env.ACCESS_TOKEN)
                    res.send({msg:"Login sucessful",token:token})
                   }else{
                    res.send({msg:"Account does not exist"})
                   }
            }else{
                res.send({msg:"Account does not exist"})
            }
            
        }
    } catch (err) {
        console.log
    }
})

const auth = (req,res,next) =>{
    const au = req.headers['authorization']
    const token = au && au.split(" ")[1]
    if(token){
        jwt.verify(token,process.env.ACCESS_TOKEN ,(err,decoded)=>{
            if(err){
                res.send({msg:"Invalid token"})
            }else{
                req.user = decoded
                next()
            }
        })
    }
}
 router.get("/data",auth,async(req,res)=>{
    try {
        const username = req.user.username

        const query = "SELECT * FROM users WHERE username=? OR email=?"
        const [data] = await db.query(query,[username,username])
        res.send(data)
    } catch (err) {
        console.log(err)
    }
 })
const storage = multer.memoryStorage()
const upload = multer({storage:storage , limits:{fileSize: 1024 * 1024 * 1024}})
 router.post("/post",upload.single("file"),async(req,res)=>{
      const { name , price , about } = req.body
      const { buffer } = req.file

    
      
    try {
        const [resp] = await db.query("SELECT COUNT(*) as count FROM posts WHERE _name =?",[name])
        if(resp[0].count > 0){
            res.send({msg:"A post with this name already exists"})
        }else{
            await db.query("INSERT INTO posts(_name,_price,about,img) VALUES(?,?,?,?)",[name,price,about,buffer])
            res.send({msg:"Post added sucessfully"})
        }
     
    } catch (err) {
        console.log(err)
        
    }
 })
 router.get("/posts",async(req,res)=>{
    try {
        const [resp] = await db.query("SELECT * FROM posts")
        res.send(resp)
    } catch (err) {
        console.log(err)
    }
 })
 router.post("/cart",upload.single("file"),async(req,res)=>{
    try {
       const { buffer } = req.file
       const { username , name , price , about } = req.body
       const [resp] = await db.query("SELECT COUNT(*) as count FROM cart WHERE username = ? AND _name = ? AND price = ? AND about = ?",[username,name,price,about])
       if(resp[0].count > 0){
          res.send({msg:"Goods Already in cart !"})
       }else{await db.query("INSERT INTO cart(username,_name,price,about,img) VALUES(?,?,?,?,?)",[username,name,price,about,buffer])
       res.send({msg:"Sucessfully added to cart ! "})}
    } catch (err) {
        console.log(err)
    }
 })
 router.get("/getcart",async(req,res)=>{
    try {
        const [resp] = await db.query("SELECT * FROM cart")
        res.send(resp)
    } catch (err) {
        console.log(err)
    }
 })
 router.post("/remove",async(req,res)=>{
    try {
        const { username , productname , about} = req.body
       
        await db.query("DELETE FROM cart WHERE username =? AND _name = ? AND about=?",[username,productname,about])
        res.send({msg:"Item sucessfully removed from cart !"})
    } catch (err) {
        console.log(err)
    }
 })
 router.post("/update",upload.single("file"),async(req,res)=>{
    try{
      const { username } = req.body
      const { buffer } = req.file
      if(username && buffer){
        await db.query("UPDATE users SET img = ? WHERE username = ?",[buffer,username])
        res.send({msg:"Profile updated"})
      }else{
        res.send({msg:"There was an error updating!"})
      }
    }catch(err){
     console.log(err)
    }
 })
 router.get("/pp",async(req,res)=>{
    try {
     
     res.send({msg:"Haloo ☺☺☺☺☺"})
    } catch (err) {
        console.log(err)
    }
 })
export default router