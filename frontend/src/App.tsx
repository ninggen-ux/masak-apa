import Home from "./assets/tsx/pages/Home.tsx";
import Navbar from "./assets/tsx/pages/Navbar.tsx";
import Login from "./assets/tsx/pages/Login.tsx";
import SignUp from "./assets/tsx/pages/SignUp.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./assets/sass/pages/main.scss";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navbar />}>
                    <Route index element={<Home />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/sign-up" element={<SignUp />} />
            </Routes>
        </BrowserRouter>
    );
}
