
import React, { useState,useEffect } from "react"
import axios from "axios"


export default function Profile(){
    const [data,setdata] = useState({
date_created:"",
email:"",
username:"",
img:{type:String,data:[]},
_number:0,
_password:"",
_rank:""
    })
    const [sta,setsta] = useState<Boolean>(false)
     interface ca{
            username:String,
            _name:String,
            about:String,
            time_added:any,
            img:{type:String,data:[]},
            price:any,
            imgurl:null
        }
        const blob = new Blob([new Uint8Array(data?.img?.data)])
        const ui = URL.createObjectURL(blob)
        const [cart,setcart] = useState<ca[]>([])
        const mycart = cart.filter(cc => cc.username === data?.username)
    const getcart = async() =>{
        try {
            const resp = await axios.get("https://foodcafe-am3k.onrender.com/auth/getcart")
            setcart(Array.isArray(resp.data) ? resp.data : [])
        } catch (err) {
            
         console.log(err)
        }
         }
       
     const getdata = async() =>{
        const token  = localStorage.getItem("token")
         try {
            const resp = await axios.get("https://foodcafe-am3k.onrender.com/auth/data", {
                headers: {
                    authorization :`bearer ${token}`
                }
            })
            
           setdata(resp.data[0])
           if(resp.data.msg){
            setsta(true)
           }
         } catch (err) {
            console.log(err)
         }
     }
     useEffect(()=>{
        getdata()
        getcart()
     },[])
     const [not , setnot ] = useState<Boolean>(false)
     const [dis,setdis] = useState<String>("")
     const [toggle,settoggle] = useState<Boolean>(false)
     const [file,setfile]= useState<any>()
     const [url,seturl] = useState<any>()
    const  [drop,setdrop] = useState<Boolean>(false)

    const handlefilechange = (e:React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files){
            setfile(e.target.files[0])
            seturl(URL.createObjectURL(e.target.files[0]))
        }
    }
  
     
    
     
     const logout =()=>{
      localStorage.removeItem("token")
   }
    return (
        <div className="bg-gray-900 min-h-screen text-white">
             {sta ? <div className="fixed w-screen h-screen text-black z-20 backdrop-blur-xl grid place-content-center">
                <div className="bg-white sm:w-[600px] w-4/5 rounded-xl grid place-content-center border-2">
                   <div className="text-center">Opps session timed out</div>
                   <button className="m-[10px] w-full bg-blue-500 text-white p-[10px] rounded-xl mx-auto" onClick={logout}><a href="">Relogin</a></button>
                </div>
            </div> : null}
         <div className="">
         <div className=" h-screen w-1/5 right-0 fixed bg-gray-900 z-40  md:block hidden border-2 flex flex-col h-full p-[10px] ">
         <ul>
         <li className=" w-full rounded-xl  hover:bg-gray-600 p-[10px] mx-auto text-center m-[10px]" ><a href="/home" >Home</a></li>
            <li className=" w-full rounded-xl bg-gray-600 hover:bg-gray-600 p-[10px] mx-auto text-center m-[10px]" ><a href="" >Profile</a></li>
            <li className=" w-full rounded-xl hover:bg-gray-600 p-[10px] mx-auto text-center m-[10px]" ><a href="/cart" >Cart</a></li>
            
            {data?._rank === "A" ?  <li className=" w-full  rounded-xl hover:bg-gray-600 p-[10px] mx-auto text-center m-[10px]" ><a href="/post" >Add new food</a></li> : null}
            <li className=" w-full rounded-xl hover:bg-gray-600 p-[10px] mx-auto text-center m-[10px]" onClick={logout} ><a href="" >Logout</a></li>

         </ul >
         {!data?.img?.data.length  ? <div className="w-full mx-auto rounded-xl bg-blue-500 p-[10px] ">
            <div className="mx-auto">Dear {data?.username} add a profile photo to your account today</div>
            <button className="bg-white p-[10px] text-black rounded-xl m-[10px]"><a href="/profile">add photo</a></button>
         </div> : null }
         </div>
            <div className=" w-full md:w-4/5 ">
               <div className="w-full md:w-4/5 fixed top-0 p-[10px] shadow-xl bg-gray-900 flex justify-between">
                  <div onClick={()=>settoggle(true)} className={!toggle ? "p-[10px] w-[50px] h-[50px] md:hidden shadow-xl rounded-full m-[10px]" : "hidden"}>A</div>
                  <div onClick={()=>settoggle(false)} className={toggle ? "p-[10px] w-[50px] h-[50px] md:hidden shadow-xl rounded-full m-[10px]" : "hidden"}>B</div>
                  <div className={toggle ? "md:hidden fixed top-[60px] w-2/5 bg-blue-500 text-white left-0 " : "hidden"}>
                  <ul className="p-[10px]">
         <li className=" w-full rounded-xl  hover:bg-gray-600 p-[10px] mx-auto text-center m-[10px]" ><a href="/home" >Home</a></li>
            <li className=" w-full rounded-xl bg-gray-600 hover:bg-gray-600 p-[10px] mx-auto text-center m-[10px]" ><a href="/profile" >Profile</a></li>
            <li className=" w-full rounded-xl hover:bg-gray-600 p-[10px] mx-auto text-center m-[10px]" ><a href="/cart" >Cart</a></li>
       
            {data?._rank === "A" ?  <li className=" w-full rounded-xl  hover:bg-gray-600 p-[10px] mx-auto text-center m-[10px]" ><a href="/post" >Add new food</a></li> : null}
            <li className=" w-full rounded-xl hover:bg-gray-600 p-[10px] mx-auto text-center m-[10px]" onClick={logout} ><a href="" >Logout</a></li>

         </ul>
                  </div>
                  

                <input type="text" className="bg-inherit outline-none p-[10px]" placeholder="Search Foods...." />
                <div className="font-bold text-2xl text-blue-500">FoodCafe</div>
                <div className=" text-gray-600 flex flex-row"><img src={ui} width={"50px"} height={"50px"} className="rounded-full  mx-[10px]" /><div className="mx-[10px]  text-xl">Hi {data?.username}</div></div>
                </div>
                <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  {not ? <div className="bg-white text-black p-[10px] fixed text-center w-full md:w-4/5 top-[60px] ">{dis}</div> : null}
                
              <div className="p-[10px]">
                <div className="w-4/5 flex flex-col m-[10px] md:flex-row md:justify-between">
                     <div className="mx-auto">
                        <img src={ui} alt="" onClick={()=>setdrop(true)} width={"300px"} height={"300px"}  />
                     </div>
                     <div className="mx-auto">
                        <div className="font-bold text-3xl m-[10px]">{data?.username}</div>
                        <div className="text-3xl text-blue-500">{data?._rank === "A" ? "Rank : A (Admin) " : data?._rank === "B" ? "Rank : B (Staff)" : "Rank : E (Normal user)"}</div>
                        <div className="font-bold text-2xl">{data?.email}</div>
                        <div className="font-bold text-2xl">{data?._number}</div>
                        <div className="font-bold text-2xl">You have {mycart.length} items in your cart</div>
                        
                     </div>
                </div>
                {drop ? <div className="mx-auto shadow-xl border-2 rounded-xl p-[10px]">
                    <div className="text-center font-bold m-[10px] text-3xl">Update profile photo</div>
                    <img className="mx-auto m-[10px]" src={url} alt="" width={"500px"} height={"300px"} />
                    <div className="m-[10px]" >Choose File : </div>
                    <input className=" m-[10px]"  type="file" onChange={handlefilechange} id="" />
                    <div className="flex justify-button">
                    <button onClick={async()=>{
                        try {
                            const formdata = new FormData()
                            const username = data?.username
                            getdata()
                            if(file && username){
                                formdata.append("file",file)
                                formdata.append("username",username)
                            }
                            const resp  =  await axios.post("https://foodcafe-am3k.onrender.com/auth/update",formdata)
                            setnot(true)
                            setdis(resp.data.msg)
                            setTimeout(() => {
                                setnot(false)
                                setdis("")
                            }, 5000);
                        } catch (err) {
                            setnot(true)
                            setdis("There was an error uploading :" + err)
                            setTimeout(() => {
                                setnot(false)
                                setdis("")
                            }, 5000);
                        }
                    }} className="bg-blue-500 p-[10px] rounded-xl mx-auto w-full hover:opacity-50 m-[10px]">Update photo</button>
                    <button onClick={()=>setdrop(false)} className="bg-blue-500 p-[10px] rounded-xl mx-auto w-full hover:opacity-50 m-[10px]">Cancel</button>
                    </div>
                    
                    
                </div> : null}
              </div>
               
            </div>         
         </div>
        </div>
    )
}