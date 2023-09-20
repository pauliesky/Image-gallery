import "./App.css";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ImageGallery from "./components/ImageGallery";

function App() {
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
