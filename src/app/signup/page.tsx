"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  })

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignup = async() => {
    try{
      setLoading(true);
      console.log("Data is going", user);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup successful", response.data);
      router.push("/login")
    }catch(error: any){
      console.log("Signup failed", error.message);
      toast.error(error.message);
    }finally{
      setLoading(false);
    }
  }

  useEffect(() => {
    if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
      setButtonDisabled(false);
    }else{
      setButtonDisabled(true);
    }
  }, [user])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
           <h1 className="text-6xl text-white">{loading ? "Loading" : "Sign Up" }</h1>
           <hr/>
           <label htmlFor="username">Username</label>
           <input 
           id="username"
           type="text"
           value={user.username}
           onChange={(e) => setUser({...user, username: e.target.value})}
           placeholder="User name"
           className="p-2 text-black"
           />
           <hr/>
           <label htmlFor="email">Email</label>
           <input 
           id="email"
           type="email"
           value={user.email}
           onChange={(e) => setUser({...user, email: e.target.value})}
           placeholder="User email"
           className="p-2 text-black"
           />
           <hr/>
           <label htmlFor="password">Password</label>
           <input 
           id="password"
           type="password"
           value={user.password}
           onChange={(e) => setUser({...user, password: e.target.value})}
           placeholder="Password"
           className="p-2 text-black"
           />
           <button
           onClick={onSignup}
           className="p-2 border border-gray-300 rounded-lg m-4 focus:outline-none focus:border-gray-600"
           >
            {buttonDisabled ? "No Signup" : "Signup"}
           </button>
           <Link href="/login">Visit Login</Link>
    </div>
  )
}
