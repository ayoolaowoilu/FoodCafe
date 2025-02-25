import axios from "axios"
import { FormEvent, useState } from "react"

export default function Reg(){

    const [profile,setprofile] = useState({
        username:"",
        email:"",
        number:0,
        password:""
    })
    const [not,setnot] = useState<Boolean>(false)
    const [msg,setmsg] = useState<String>("")

    const handdlechange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setprofile({...profile , [e.target.name]:e.target.value})
    }
    const handlesubmit = async(e:FormEvent) =>{
            e.preventDefault()
            setmsg("")
            setnot(false)
          try {
            const resp = await axios.post("http://localhost:1234/auth/reg",profile)
             setnot(true)
             setmsg(resp.data.msg)
          } catch (err) {
            console.log(err)
          }
    }
    return(
       <>
       {not ? <div className="w-screen h-screen backdrop-blur-xl fixed z-20 grid place-content-center">
            <div className=" grid place-content-center bg-white rounded-xl w-4/5 sm:w-[600px] ">

                <div className="mx-auto m-[10px] font-bold text-2xl">{msg}</div>
                 <a href="/login" className="w-full rounded-xl m-[10px] p-[10px] text-center text-white mx-auto bg-blue-500 p-[10px]">Go to login page</a>
                 <button  className="w-full rounded-xl m-[10px] p-[10px] text-white mx-auto bg-blue-500 " onClick={()=>setnot(false)}>Cancel</button>
            </div>
        </div> : null}
         <div className="min-h-screen grid place-content-center text-white bg-gray-900">
           <div className="text-center font-bold text-3xl text-white m-[10px]">Welcome to <span className="text-blue-500">FoodCafe</span ></div>
            <div  className="text-center font-bold text-2xl dark:text-white m-[10px]">Registration Page</div>
           <form onSubmit={handlesubmit} className="mx-auto rounded-xl sm:w-[600px] w-4/5 border-2 border-white shadow-xl">
               <div className="mx-auto m-[10px] p-[10px]">
                   <div>
                      Input username 
                   </div>
                <input onChange={handdlechange} type="text" name="username" className="p-[10px] mx-auto w-full bg-inherit border-b-black border-b-5 dark:border-b-white shadow-xl" placeholder="Input username "/>
               </div>
               <div className="mx-auto m-[10px] p-[10px]">
                   <div>
                      Input email
                   </div>
                <input onChange={handdlechange} type="email" name="email" className="p-[10px] mx-auto w-full bg-inherit border-b-black border-b-5 dark:border-b-white shadow-xl" placeholder="example@example.com"/>
               </div>
               <div className="mx-auto m-[10px] p-[10px]">
                   <div>
                      Input number
                   </div>
                <input onChange={handdlechange} type="number" name="number" className="p-[10px] mx-auto w-full bg-inherit border-b-black border-b-5 dark:border-b-white shadow-xl" placeholder="0000-000-00000 "/>
               </div>
               <div className="mx-auto m-[10px] p-[10px]">
                   <div>
                      Input password
                   </div>
                <input onChange={handdlechange} type="password" name="password" className="p-[10px] mx-auto w-full bg-inherit border-b-black border-b-5 dark:border-b-white shadow-xl" placeholder="Input password "/>
               </div>
               <div className="mx-auto m-[10px] p-[10px]">
                   <div>
                      Confirm password
                   </div>
                <input type="password" className="p-[10px] mx-auto w-full bg-inherit border-b-black border-b-5 dark:border-b-white shadow-xl" placeholder="confirm password "/>
               </div>
               <div className="mx-auto m-[10px] p-[10px]">
                   <button className="w-full p-[10px] mx-auto bg-blue-500 rounded-xl ">Register</button>
               </div>
               <div className="text-center m-[10px]">Already had an account? <a href="/login" className="text-blue-500">Login</a></div>
               
           </form>
         </div>
       </>
    )
}