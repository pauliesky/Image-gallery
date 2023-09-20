// import React from 'react'
import gallery_icon from "../assets/gallery.png";
import { useState } from "react";
// import { Redirect } from "react-router-dom";
// import firebase from "./Firebase";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./Firebase";

const SignUp = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        navigate("/sign-in");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ..
      });
  };

  return (
    <>
      <section className=" px-8 flex justify-center items-center  h-screen  bg-gradient-to-r  from-[#f5ebed]  to-[#e8dafe]">
        <div className="   sm:w-1/2 lg:w-1/3 shadow-xl shadow-[#d7cde7] px-12 py-16 bg-white rounded-lg ">
          <img className="w-[50px]" alt="gallery-icon" src={gallery_icon} />
          <span className="font-bold text-4xl text-black font-sans">
            Hey, there, <br /> Satisfy your eyes!
          </span>
          <p className="mt-2 text-gray-900">
            Lets get started on your first sight
          </p>
          <form onSubmit={handleSubmit} className=" mt-5 flex flex-col">
            <label className="">Name</label>
            <input
              name="name"
              type="name"
              className="mt-1 outline-none bg-[#f1f2ff] p-3 rounded-sm"
            />
            <label className="mt-3">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              type="email"
              className=" mt-1 outline-none bg-[#f1f2ff] p-3 rounded-sm"
            />
            <label className="mt-3">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              name="password"
              type="password"
              className="mt-1 outline-none bg-[#f1f2ff] p-3 rounded-sm"
            />
            <button
              type="submit"
              className="mt-5 bg-[#5d4cc3] text-white py-3 rounded-md"
            >
              Sign Up
            </button>
          </form>
          <p className="mt-3">
            Have an account already? <Link to="/sign-in"> Sign In </Link>
          </p>
        </div>
      </section>
    </>
  );
};

export default SignUp;
