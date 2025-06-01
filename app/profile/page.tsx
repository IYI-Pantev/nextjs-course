"use client";
import axios from "axios";
// import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
const ProfilePage = () => {
  const router = useRouter();
  const [data, setData] = useState(" ");
  const onLogOut = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: unknown) {
      let errorMessage = "An unknown error occurred";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast.error(`Error logging out: ${errorMessage}`);
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    setData(res.data.data.username);
  };

  return (
    <div className="flex flex-col items-center justify-center  py-2">
      <h1 className="text-2xl text-white mb-2">Profile Page</h1>
      <h2 className="text-white">
        {data === " " ? "===" : <Link href={`/profile/${data}`}>{data}</Link>}
      </h2>
      <hr />
      <p className="text-white">Welcome to your profile!</p>
      <hr />
      <button
        onClick={onLogOut}
        className="bg-red-500 text-white py-2 px-4
       rounded hover:bg-red-600 transition-colors
        duration-200 hover:cursor-pointer mt-5"
      >
        Logout
      </button>
      <button
        onClick={getUserDetails}
        className="bg-blue-500 text-white py-2 px-4
       rounded hover:bg-blue-600 transition-colors
        duration-200 hover:cursor-pointer mt-5"
      >
        User Details
      </button>
    </div>
  );
};

export default ProfilePage;
