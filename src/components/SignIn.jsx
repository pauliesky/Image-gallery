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
  const [isValid, setIsValid] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user.reloadUserInfo.localId;
        let authToken = sessionStorage.getItem("Auth Token");
        // console.log(authToken);
        if (authToken) {
          navigate("/image-gallery");
        }
        if (!authToken) {
          toast.error("Kindly Sign Up");
        }
        // navigate("/image-gallery");
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
              value={email}

              onChange={handleEmailChange}
              className=" mt-1 outline-none bg-[#f1f2ff] p-3 rounded-sm"
            />
             {!isValidEmail && (
              <p style={{ color: "red" }}>Invalid email format</p>
            )}
            <label className="mt-3">Password</label>
            <input
              name="password"
              type="password"
              value={password}

              onChange={handleChange}
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
