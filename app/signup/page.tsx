"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

const SignUp = () => {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onSignUp = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      if (response.status === 201) {
        toast.success("User created successfully");
        router.push("/login");
      } else {
        toast.error("Failed to create user");
      }
    } catch (error: unknown) {
      let errorMessage = "An unknown error occurred";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className=" flex flex-col items-center justify-center min-h-screen py-2 ">
      <div className="flex flex-col items-center justify-center border border-gray-300 rounded p-5">
        <h1 className="text-2xl text-white mb-2">
          {loading ? "Processing..." : "Sign Up Page"}
        </h1>
        <hr />
        <label htmlFor="username">username:</label>
        <input
          className="border border-gray-300 rounded p-2 mb-4 w-64"
          type="text"
          id="username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="Enter your username"
        />
        <label htmlFor="email">email:</label>
        <input
          className="border border-gray-300 rounded p-2 mb-4 w-64"
          type="email"
          id="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Enter your email"
        />
        <label htmlFor="password">password:</label>
        <input
          className="border border-gray-300 rounded p-2 mb-4 w-64"
          type="password"
          id="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Enter your password"
        />
        <p className={buttonDisabled ? "text-red-400" : "text-green-500"}>
          {buttonDisabled ? "Please fill in all fields" : "You can Sign Up!"}
        </p>

        <button
          className="bg-blue-500 text-white rounded p-2 mb-4 w-64 hover:bg-blue-600 cursor-pointer transition-colors duration-200"
          onClick={onSignUp}
          disabled={buttonDisabled}
        >
          Sign Up
        </button>
        <Link href="/login" className="text-blue-500 hover:underline">
          Already have an account?{" "}
          <span className="font-bold hover:underline">Log in</span>
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
