import { FormEvent, useState } from "react"
import axios from "axios"
export default function Login(){
    const [profile , setprofile ] = useState({
        username:"",
        password:""
    })
    const handdlechange = (e:React.ChangeEvent<HTMLInputElement>)=>{
       setprofile({...profile , [e.target.name]:e.target.value})
    }
    const [not,setnot] = useState<Boolean>(false)
    const [msg,setmsg] = useState<String>("")

    const handlesubmit =async(e:FormEvent)=>{
           e.preventDefault()
           setmsg("")
            setnot(false)
           try {
              const resp  = await axios.post("https://food-cafe-etf9podiw-khaleeds-projects-02dea468.vercel.app/auth/login",profile)
              setnot(true)
              setmsg(resp.data.msg)
              console.log(resp)
            if(resp.data.token){
               localStorage.setItem("token",resp.data.token)
            }
           } catch (err) {
            setnot(true)
            setmsg("There was an error :" +err)
           }
    }
     return(
        <>
         {not ? <div className="w-screen h-screen backdrop-blur-xl fixed z-20 grid place-content-center">
            <div className=" grid place-content-center bg-white rounded-xl w-4/5 sm:w-[600px] ">

                <div className="mx-auto m-[10px] font-bold text-2xl">{msg}</div>
                 {msg === "Login sucessful" ? <a href="/home" className="w-full rounded-xl m-[10px] p-[10px] text-center text-white mx-auto bg-blue-500 p-[10px]">Go to Home page</a> : null}
                 <button  className="w-full rounded-xl m-[10px] p-[10px] text-white mx-auto bg-blue-500 " onClick={()=>setnot(false)}>Go back to Login</button>
            </div>
        </div> : null}
          <div className="min-h-screen grid place-content-center text-white bg-gray-900">
            <div className="text-center font-bold text-3xl text-white m-[10px]">Welcome to <span className="text-blue-500">FoodCafe</span ></div>
             <div  className="text-center font-bold text-2xl dark:text-white m-[10px]">Login Page</div>
            <form onSubmit={handlesubmit} className="mx-auto rounded-xl sm:w-[600px] w-4/5 border-2 border-white shadow-xl">
                <div className="mx-auto m-[10px] p-[10px]">
                    <div className="m-[10px]">
                       Input username or Email 
                    </div>
                 <input onChange={handdlechange} type="text" name="username" className="p-[10px] mx-auto w-full bg-inherit border-b-black border-b-5 dark:border-b-white shadow-xl" placeholder="Input username or email "/>
                </div>
                <div className="mx-auto m-[10px] p-[10px]">
                    <div className="m-[10px]">
                       Input password 
                    </div>
                 <input onChange={handdlechange} type="password" name="password" className="p-[10px] mx-auto w-full bg-inherit border-b-black border-b-5 dark:border-b-white shadow-xl" placeholder="Input password "/>
                </div>
                <div className="mx-auto m-[10px] p-[10px]">
                    <button className="w-full p-[10px] mx-auto bg-blue-500 rounded-xl ">Login</button>
                </div>
                <div className="text-center m-[10px]">Dont have an account ? <a href="/reg" className="text-blue-500">Register?</a></div>
            </form>
          </div>
        </>
     )
}