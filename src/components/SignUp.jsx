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
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState(true);

  const handleEmailChange = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);

    // const emailChecker = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const emailChecker = /\S+@\S+\.\S+/;
    const validEmail = emailChecker.text(inputEmail);
    setIsValidEmail(validEmail);
  };

  const handleChange = (e) => {
    const inputPassword = e.target.value;
    setPassword(inputPassword);

    // Perform password validation
    const valid = validatePassword(inputPassword);
    setIsValid(valid);
  };

  const validatePassword = (password) => {
    // Password validation rules (customize as needed)
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);

    return (
      password.length >= minLength && hasUpperCase && hasLowerCase && hasDigit
    );
  };
  const defaultToken = "UYKbvW0PJmNdtAZBinu0N9Tds9e2";
  localStorage.setItem("User Token", defaultToken);
  const handleSubmit = async (e) => {
    e.preventDefault();

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        // console.log(userCredential);
        const userToken = userCredential.user.accessToken;
        // console.log(userToken);
        navigate("/sign-in");

        sessionStorage.setItem("Auth Token", userToken);

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // console.log(errorCode, errorMessage);
        window.alert(errorCode, errorMessage);
        // ..
      });
  };

  return (
    <>
      <section className=" px-8 flex justify-center items-center  h-screen  bg-gradient-to-r  from-[#f5ebed]  to-[#e8dafe]">
        <div className="   sm:w-1/2 lg:w-1/3 shadow-xl shadow-[#d7cde7] px-12 py-16 bg-white rounded-lg ">
          <img className="w-[50px]" alt="gallery-icon" src={gallery_icon} />
          <span className="font-bold text-4xl text-black font-sans">
            Hey, there, <br /> Sign Up!
          </span>
          <p className="mt-2 text-gray-900">Image Gallery dey for you</p>
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
              onChange={handleEmailChange}
              name="email"
              type="email"
              style={{ borderColor: isValidEmail ? "none" : "red" }}
              required
              className=" mt-1 outline-none bg-[#f1f2ff] p-3 rounded-sm"
            />
            {!isValidEmail && (
              <p style={{ color: "red" }}>Invalid email format</p>
            )}
            <label className="mt-3">Password</label>
            <input
              onChange={handleChange}
              value={password}
              name="password"
              type="password"
              required
              style={{ borderColor: isValid ? "initial" : "red" }}
              className="mt-1 outline-none bg-[#f1f2ff] p-3 rounded-sm"
            />
            {!isValid && (
              <p style={{ color: "red" }}>
                {" "}
                Must have uppercase, lowercase, digit and min. of 8 letters{" "}
              </p>
            )}
            <button
              type="submit"
              className="mt-5 bg-[#5d4cc3] text-white py-3 rounded-md"
            >
              Sign Up
            </button>
          </form>
          <p className="mt-3">
            Have an account already?{" "}
            <Link style={{ color: "#5d4cc3" }} to="/sign-in">
              {" "}
              Sign In{" "}
            </Link>
          </p>
        </div>
      </section>
    </>
  );
};

export default SignUp;
