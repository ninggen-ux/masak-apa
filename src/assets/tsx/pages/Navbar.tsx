import { Outlet } from "react-router-dom";
import "../../sass/navbar.scss";

export default function Navbar() {
    return (
        <div className="main-container">
            <header className="header">
                <nav className="header__nav">
                    <span>MasakApa</span>
                    <div>
                        <a href="#">Sign Up</a>
                        <a href="#">Log In</a>
                    </div>
                </nav>
            </header>
            <Outlet />
        </div>
    );
}
