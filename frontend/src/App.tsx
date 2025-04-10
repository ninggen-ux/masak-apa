import Home from "./assets/tsx/pages/Home.tsx";
import Navbar from "./assets/tsx/pages/Navbar.tsx";
import Login from "./assets/tsx/pages/Login.tsx";
import SignUp from "./assets/tsx/pages/SignUp.tsx";
import Otp from "./assets/tsx/pages/Otp.tsx";
import OtpResetPass from "./assets/tsx/components/otp/OtpResetPass.tsx";
import Footer from "./assets/tsx/pages/Footer.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import "./assets/sass/pages/main.scss";

export default function App() {
    const [userData, setUserData] = useState<string>("");

    const [isUserLogin, setIsUserLogin] = useState<string>("");
    /**
     *  isUserLogin hanya di gunakan untuk mengriset getUserData()
     *  jadi, isUserLogin bukan untuk mendapatkan data hanya untuk
     *  mengriset getUserData().
     */

    useEffect(() => {
        async function getUserData() {
            /**
             * Tidak di gunakan try...catch karena hanya untuk mengambil data
             * (untuk sekarang masih ada, untuk keperluan develepment).
             */
            try {
                const response = await fetch(
                    "http://localhost:3000/auth/status",
                    {
                        method: "GET",
                        credentials: "include",
                    }
                );

                const responseJson = await response.json();

                if (responseJson.status === "success") {
                    setUserData(responseJson.data.user_metadata.username);
                } else if (responseJson.status === "fail") {
                    throw new Error(responseJson.message);
                }

                console.log(responseJson);
            } catch (err) {
                console.error(err);
            }
        }

        getUserData();
    }, [isUserLogin, userData]);

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <Navbar userData={userData} setUserData={setUserData} />
                    }
                >
                    <Route index element={<Home />} />
                </Route>
                <Route
                    path="/login"
                    element={<Login setIsUserLogin={setIsUserLogin} />}
                />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/otp" element={<Otp />} />
                <Route path="/otp-reset-pass" element={<OtpResetPass />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}
