export default function Gen(){
    return(
        <div className="min-h-screen grid place-content-center bg-gray-900 text-white">
            <div className="text-center text-3xl font-bold m-[10px] mx-auto">Welcome to <span className="text-blue-500">FoodCafe</span></div>
           <div className="mx-auto md:w-[600px] w-[4/5]shadow-xl">
           
             <div className="flex justify-between mx-auto">
                <button className="bg-blue-500 p-[10px] m-[10px] w-full mx-auto rounded-xl"><a href="/login">Login</a></button>
                <button className="bg-blue-500 p-[10px] m-[10px] w-full mx-auto rounded-xl"><a href="/reg">Register</a></button>
             </div>
           </div>
          

        </div>
    )
}