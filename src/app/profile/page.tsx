"use client";

import axios from "axios";
import Link from "next/link";
import React, {useState} from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState('') 
  const logout = async () => {
    try{
      await axios.get('/api/users/logout')
      toast.success('Logout successful');
      router.push('/login');

    }catch(error: any){
      console.log(error.message);
      toast.error(error.message);
    }
  }

  const getUserDetails = async () => {
    const res = await axios.get('/api/users/me')
    console.log(res.data);
    setData(res.data.data._id);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr/>
      <p>Profile Page</p>
      <h2>{data === '' ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
      <hr/>
      <button 
      onClick={logout}
      className="p-2 border border-red-400 rounded-lg m-4 focus:outline-none focus:border-red-900">
        Logout
      </button>
      <hr/>
      <button 
      onClick={getUserDetails}
      className="p-2 border bg-green-400 rounded-lg m-4 focus:outline-none focus:bg-green-900">
        Get User Details
      </button>
    </div>
  )
}
