import React, { useState,useEffect } from "react"
import axios from "axios"

export default function Post(){
    const [data,setdata] = useState({
date_created:"",
email:"",
username:"",
img:{type:"", data: []},
_number:0,
_password:"",
_rank:""
    })
    const [sta,setsta] = useState<Boolean>(false)
    const blob = new Blob([new Uint8Array(data?.img?.data)])
    const ui = URL.createObjectURL(blob)
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
     useEffect(()=>{
        getdata()
     },[])
     const [not , setnot ] = useState<Boolean>(false)
     const [dis,setdis] = useState<String>("")
     const [toggle,settoggle] = useState<Boolean>(false)
     const [file,setfile] = useState<any>()
     const [url,seturl] = useState<any>()
     const [name,setname] = useState<any>()
     const [price,setprice] = useState<any>()
     const [about , setabout ] = useState<any>()

     const handlepost =async()=>{
              const formdata = new FormData()
              if(name && price && file && about){
                formdata.append("name",name)
                formdata.append("price",price)
                formdata.append("about",about)
                formdata.append("file",file)
              }
              setnot(false)
              setdis("")

            try {
                const resp = await axios.post("https://food-cafe-hfd09w34u-khaleeds-projects-02dea468.vercel.app/auth/post",formdata)
                setnot(true)
                setdis(resp.data.msg)
                setTimeout(() => {
                    setnot(false)
                    setdis("")
                }, 5000);
            } catch (err) {
                
                setnot(true)
                setdis("An error occured ()" + err)
                setTimeout(() => {
                    setnot(false)
                    setdis("")
                }, 5000);
            }
     }
    
     const handlfilechange = (e:React.ChangeEvent<HTMLInputElement>) =>{
        if(e.target.files){
            seturl(URL.createObjectURL(e.target.files[0]))
            setfile(e.target.files[0])
        }
            
     }
     const na =(e:React.ChangeEvent<HTMLInputElement>) =>{
        setname(e.target.value)
     }
     const pr =(e:React.ChangeEvent<HTMLInputElement>) =>{
        setprice(e.target.value)
     }
     const ab =(e:React.ChangeEvent<HTMLTextAreaElement>)=>{
        setabout(e.target.value)
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
            <li className=" w-full rounded-xl hover:bg-gray-600 p-[10px] mx-auto text-center m-[10px]" ><a href="" >Profile</a></li>
            <li className=" w-full rounded-xl hover:bg-gray-600 p-[10px] mx-auto text-center m-[10px]" ><a href="" >Cart</a></li>
           
            {data?._rank === "A" ?  <li className=" w-full bg-gray-600 rounded-xl hover:bg-gray-600 p-[10px] mx-auto text-center m-[10px]" ><a href="/post" >Add new food</a></li> : null}
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
            <li className=" w-full rounded-xl hover:bg-gray-600 p-[10px] mx-auto text-center m-[10px]" ><a href="/profile" >Profile</a></li>
            <li className=" w-full rounded-xl hover:bg-gray-600 p-[10px] mx-auto text-center m-[10px]" ><a href="/cart" >Cart</a></li>
            
            {data?._rank === "A" ?  <li className=" w-full rounded-xl bg-gray-600 hover:bg-gray-600 p-[10px] mx-auto text-center m-[10px]" ><a href="/post" >Add new food</a></li> : null}
            <li className=" w-full rounded-xl hover:bg-gray-600 p-[10px] mx-auto text-center m-[10px]" onClick={logout} ><a href="" >Logout</a></li>

         </ul>
                  </div>
                  

                <input type="text" className="bg-inherit outline-none p-[10px]" placeholder="Search Foods...." />
                <div className="font-bold text-2xl text-blue-500">FoodCafe</div>
                <div className=" text-gray-600 flex flex-row"><img src={ui} className="rounded-full w-[50px] h-[50px] border-2  mx-[10px]" /><div className="mx-[10px]  text-xl">Hi {data?.username}</div></div>
                </div>
                <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  {not ? <div className="bg-white text-black p-[10px] fixed text-center w-full md:w-4/5 top-[60px] ">{dis}</div> : null}
                <div className="w-full grid place-content-center p-[10px]">

                   <div className="w-full   p-[10px]">
                      <div className="text-center m-[10px] font-bold text-2xl"> Add a new product to the menue </div>
                      <div className="mx-auto m-[10px]">
                        <div>Input Product name:</div>
                        <input onChange={na} type="text" className=" p-[10px] bg-inherit mx-auto w-full outline-none border-b-white border-b-4" placeholder="Input product name" />
                      </div>
                      <div className="mx-auto m-[10px]">
                        <div>Input Product Price:</div>
                        <input onChange={pr} type="number" className=" p-[10px] bg-inherit mx-auto w-full outline-none border-b-white border-b-4" placeholder="Input Price" />
                      </div>
                      <div className="mx-auto m-[10px]">
                        <div>Write about this Product:</div>
                        <textarea onChange={ab} className=" p-[10px] bg-inherit mx-auto w-full outline-none border-b-white border-b-4" placeholder="About this new product......" ></textarea>
                      </div>
                      <div className="mx-auto m-[10px]">
                        <div>Product picture (What this product looks like):</div>
                        <input type="file" onChange={handlfilechange} className=" p-[10px] bg-inherit mx-auto w-full outline-none " placeholder="About this new product......" />
                        
                        {url ? <img src={url} className="w-full mx-auto m-[10px] rounded-xl "  /> : null}
                      </div>
                      <div className="mx-auto m-[10px]">
                        <button onClick={handlepost} className="bg-blue-500 p-[10px] mx-auto w-full m-[10px] text-white rounded-xl">Post</button>
                      </div>

                   </div>
                </div>

               
            </div>         
         </div>
        </div>
    )
}