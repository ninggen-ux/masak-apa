import Hero from "./assets/tsx/pages/Hero.tsx";
import Navbar from "./assets/tsx/pages/Navbar.tsx";
import Login from "./assets/tsx/pages/Login.tsx";
import SignUp from "./assets/tsx/pages/SignUp.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./assets/sass/main.scss";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navbar />}>
                    <Route index element={<Hero />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/sign-up" element={<SignUp />} />
            </Routes>
        </BrowserRouter>
    );
}
