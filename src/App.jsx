import "./App.css";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ImageGallery from "./components/ImageGallery";

// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

function App() {
  // const navigate = useNavigate;

  // useEffect(() => {
  //   let authToken = sessionStorage.getItem("Auth Token");

  //   if (authToken) {
  //     navigate("/image-gallery");
  //   }
  // }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
   <Route path="/image-gallery" element={<ImageGallery />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
