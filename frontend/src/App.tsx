import Home from "./assets/tsx/pages/Home.tsx";
import Navbar from "./assets/tsx/pages/Navbar.tsx";
import Login from "./assets/tsx/pages/Login.tsx";
import SignUp from "./assets/tsx/pages/SignUp.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import "./assets/sass/pages/main.scss";

export default function App() {
    useEffect(() => {
        async function getUserData() {
            try {
                const response = await fetch(
                    "http://localhost:3000/auth/status",
                    {
                        method: "GET",
                        credentials: "include",
                    }
                );

                const responseJson = await response.json();

                console.log(responseJson);
            } catch (err) {
                console.error(err);
            }
        }

        getUserData();
    }, []);

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
