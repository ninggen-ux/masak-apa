import Hero from "./assets/tsx/pages/Hero.tsx";
import Navbar from "./assets/tsx/pages/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./assets/sass/main.scss";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navbar />}>
                    <Route index element={<Hero />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
