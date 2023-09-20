import { Link, useNavigate } from "react-router-dom";
import gallery_icon from "../assets/gallery.png";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./Firebase";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate("/image-gallery");
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        toast.error("Kindly Sign Up");
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };
  return (
    <>
      <section className=" px-8 flex justify-center items-center  h-screen  bg-gradient-to-r  from-[#f5ebed]  to-[#e8dafe]">
        <div className="   sm:w-1/2 lg:w-1/3 shadow-xl shadow-[#d7cde7] px-12 py-16 bg-white rounded-lg ">
          <img className="w-[50px]" alt="gallery-icon" src={gallery_icon} />
          <span className="font-bold text-4xl text-black font-sans">
            Hey, there, <br />
            Login In!
          </span>
          <p className="mt-2 text-gray-900">Come see beauty</p>
          <form onSubmit={handleSubmit} className=" mt-5 flex flex-col">
            <label className="mt-3">Email</label>
            <input
              name="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              className=" mt-1 outline-none bg-[#f1f2ff] p-3 rounded-sm"
            />
            <label className="mt-3">Password</label>
            <input
              name="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 outline-none bg-[#f1f2ff] p-3 rounded-sm"
            />
            <button
              type="submit"
              className="mt-5 bg-[#5d4cc3] text-white py-3 rounded-md"
            >
              Sign In
            </button>
          </form>
          <p className="mt-3">
            {" Don't have an account? "}
            <Link style={{ color: "#5d4cc3" }} to="/">
              Sign Up
            </Link>
          </p>
        </div>
        <ToastContainer
          autoClose={2000}
          hideProgressBar={true}
          position="top-center"
        />
      </section>
    </>
  );
};

export default SignIn;
