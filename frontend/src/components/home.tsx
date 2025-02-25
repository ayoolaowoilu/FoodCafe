import { useState,useEffect } from "react"
import axios from "axios"

export default function Home(){
    const [data,setdata] = useState({
date_created:"",
email:"",
username:"",
img:{type:"", data:[]},
_number:0,
_password:"",
_rank:""
    })
         const [not , setnot ] = useState<Boolean>(false)
         const [dis,setdis] = useState<String>("")
    const [sta,setsta] = useState<Boolean>(false)
     const getdata = async() =>{
        const token  = localStorage.getItem("token")
         try {
            const resp = await axios.get("https://food-cafe-hfd09w34u-khaleeds-projects-02dea468.vercel.app/auth/data",{
                headers :{ authorization :`bearer ${token}`}
            })
           setdata(resp.data[0])
           
           if(resp.data.msg){
            setsta(true)
           }
         } catch (err) {
            console.log(err)
         }
     }
     interface po {
      about:String,
      img:{type: String, data: []},
      time_posted:String,
      _name:String,
      _price:any
     }
     const [post,setpost] = useState<po[]>([])
     const [display,setdisplay] =  useState<Boolean>(false)
     const postdisplay =()=>{
      interface ll {
         name:any,
         price:any,
         urll:any,
         about:any,
         date:any,
         imgurl:any
      }
      const [details , setdetails] = useState<ll>()
         const list = post.map((ma,index)=>{
            const blob = new Blob([new Uint8Array(ma.img.data)])
            const furl = URL.createObjectURL(blob) 
            return(
               <div onClick={()=>{
                  setdetails({...details,name:ma._name,price:ma._price,urll:furl,about:ma.about,date:ma.time_posted ,imgurl:blob})
                  setdisplay(true)
               }} key={index} className="shadow-xl  m-[10px] w-[400px]">
                     <img width={"400px"} height={"400px"} src={furl} className="" alt="" />
                     <div className="p-[10px] flex flex-col  ">
                        <div>
                        <div className="font-bold text-2xl">{ma._name}</div>
                        <div className="font-bold text-xl">${ma._price}</div>
                        <small className="m-[10px] text-gray-600">{ma.about}</small>
                        </div>
                        <div className="flex justify-between">
                           <button className=" hover:opacity-50 m-[10px] p-[10px] w-4/5 mx-auto text-white bg-blue-500">Add to cart</button>
                           <button className=" hover:opacity-50 m-[10px] p-[10px] w-4/5 mx-auto text-white bg-blue-500">Order</button>
                           
                        </div>
                        
                     </div>
               </div>
            )
         })
      return(
         <div className="flex flex-wrap p-[10px]">
                  {!display ? list :
                       <div className="w-full">
                        <div onClick={()=>{setdisplay(false)}} className=" w-[50px] h-[50px] rounded-full bg-blue-500 text-white m-[10px]"></div>
                         <div className="w-full mx-auto flex-col md:flex-row flex justify-between ">
                     
                       
                       <div><img width={"600px"} height={"600px"} className="mx-auto" src={details?.urll} alt="" /></div>
                       <div className="mx-auto p-[10px] flex flex-col justify-between w-[600px]" >
                        <div>
                        <div className="font-bold text-3xl m-[10px]">{details?.name}</div>
                        <div className="font-bold text-xl m-[10px]">${details?.price}</div>
                        <div className="font-bold text-blue-500 text-3xl">About this product</div>
                        <div>This product was released on {details?.date && details?.date.split("T")[0]} {details?.date && details?.date.split("T")[1].split(".")[0]}</div>
                        <div>{details?.about}</div>
                        </div>
                        <div className="flex justify-between">
                           <button onClick={async()=>{
                              const fd = new FormData()
                                setnot(false)
                                setdis("")
                              if(details?.imgurl){
                                 fd.append("file",details?.imgurl)
                                 fd.append("username",data?.username)
                                 fd.append("name",details?.name)
                                 fd.append("price",details?.price)
                                 fd.append("about",details.about)
                              }
                              try {
                                  const resp = await axios.post("https://food-cafe-hfd09w34u-khaleeds-projects-02dea468.vercel.app/auth/cart",fd)
                                  setnot(true)
                                  setdis(resp.data.msg)
                                  setTimeout(() => {
                                    setnot(false)
                                   setdis("")
                                  }, 5000);
                              } catch (err) {
                                 console.log(err)
                                 setnot(true)
                                 setdis("There was an error adding to cart " + err)
                                 setTimeout(() => {
                                    setnot(false)
                                   setdis("")
                                  }, 5000);
                              }
                           }} className=" hover:opacity-50 m-[10px] p-[10px] w-4/5 mx-auto text-white bg-blue-500">Add to cart</button>
                           <button className=" hover:opacity-50 m-[10px] p-[10px] w-4/5 mx-auto text-white bg-blue-500">Order</button>
                           
                        </div>

                       </div>
                     </div>
                       </div>
                 }
         </div>
      )
     }
     const getpostdata =async()=>{
       try {
         const resp = await axios.get("https://food-cafe-hfd09w34u-khaleeds-projects-02dea468.vercel.app/auth/posts")
        setpost(resp.data)
      
       } catch (err) {
         console.log(err)
       }
     }
     const blob = new Blob([new Uint8Array(data?.img?.data)])
     const ui = URL.createObjectURL(blob)
     useEffect(()=>{
        getdata()
        getpostdata()
   
     },[])
     const [toggle,settoggle] = useState<Boolean>(false)
     const logout =()=>{
      localStorage.removeItem("token")
   }
    return (
      
        <div className="bg-gray-900 min-h-screen text-white">
             {sta ? <div className="fixed w-screen h-screen text-black z-60 backdrop-blur-xl grid place-content-center">
                <div className="bg-white sm:w-[600px] w-4/5 rounded-xl grid place-content-center border-2">
                   <div className="text-center">Opps session timed out</div>
                   <button className="m-[10px] w-full bg-blue-500 text-white p-[10px] rounded-xl mx-auto" onClick={logout}><a href="">Relogin</a></button>
                </div>
            </div> : null}
            {not ? <div className="bg-white text-black p-[10px] fixed text-center w-full md:w-4/5 top-[60px] ">{dis}</div> : null}
         <div className="flex">
         <div className=" h-screen w-1/5 fixed right-0 z-40 md:block hidden border-2 flex flex-col h-full p-[10px] ">
         <ul>
         <li className=" w-full rounded-xl bg-gray-600 hover:bg-gray-600 p-[10px] mx-auto text-center m-[10px]" ><a href="/home" >Home</a></li>
            <li className=" w-full rounded-xl hover:bg-gray-600 p-[10px] mx-auto text-center m-[10px]" ><a href="/profile" >Profile</a></li>
            <li className=" w-full rounded-xl hover:bg-gray-600 p-[10px] mx-auto text-center m-[10px]" ><a href="/cart" >Cart</a></li>
            
            {data?._rank === "A" ?  <li className=" w-full rounded-xl hover:bg-gray-600 p-[10px] mx-auto text-center m-[10px]" ><a href="/post" >Add new food</a></li> : null}
            <li className=" w-full rounded-xl hover:bg-gray-600 p-[10px] mx-auto text-center m-[10px]" onClick={logout} ><a href="" >Logout</a></li>

         </ul>
         {!data?.img?.data.length  ? <div className="w-full mx-auto rounded-xl bg-blue-500 p-[10px] ">
            <div className="mx-auto">Dear {data?.username} add a profile photo to your account today</div>
            <button className="bg-white p-[10px] text-black rounded-xl m-[10px]"><a href="/profile">add photo</a></button>
         </div> : null }
         </div>
            <div className="w-full md:w-4/5   ">
               <div className="w-full p-[10px] mx-auto shadow-xl flex justify-between">
                  <div onClick={()=>settoggle(true)} className={!toggle ? "p-[10px] w-[50px] h-[50px] md:hidden shadow-xl rounded-full m-[10px]" : "hidden"}>A</div>
                  <div onClick={()=>settoggle(false)} className={toggle ? "p-[10px] w-[50px] h-[50px] md:hidden shadow-xl rounded-full m-[10px]" : "hidden"}>B</div>
                  <div className={toggle ? "md:hidden fixed top-[60px] w-2/5 bg-blue-500 text-white left-0 " : "hidden"}>
                  <ul>
         <li className=" w-full rounded-xl bg-gray-600 hover:bg-gray-600 p-[10px] mx-auto text-center m-[10px]" ><a href="/home" >Home</a></li>
            <li className=" w-full rounded-xl hover:bg-gray-600 p-[10px] mx-auto text-center m-[10px]" ><a href="/profile" >Profile</a></li>
            <li className=" w-full rounded-xl hover:bg-gray-600 p-[10px] mx-auto text-center m-[10px]" ><a href="/cart" >Cart</a></li>
            
            {data?._rank === "A" ?  <li className=" w-full rounded-xl hover:bg-gray-600 p-[10px] mx-auto text-center m-[10px]" ><a href="/post" >Add new food</a></li> : null}
            <li className=" w-full rounded-xl hover:bg-gray-600 p-[10px] mx-auto text-center m-[10px]" onClick={logout} ><a href="" >Logout</a></li>

         </ul>
                  </div>

                <input type="text" className="bg-inherit outline-none p-[10px]" placeholder="Search Foods...." />
                <div className="font-bold text-2xl text-blue-500">FoodCafe</div>
                <div className=" text-gray-600 flex flex-row"><img src={ui} className="rounded-full w-[50px] h-[50px] border-2  mx-[10px]" /><div className="mx-[10px]  text-xl">Hi {data?.username}</div></div>
                </div>
                 {postdisplay()}
            </div>         
         </div>
        </div>
    )
}