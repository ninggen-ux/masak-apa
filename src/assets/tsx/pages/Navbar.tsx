import { Outlet, Link } from "react-router-dom";
import "../../sass/navbar.scss";

export default function Navbar() {
    return (
        <div className="main-container">
            <header className="header">
                <nav className="header__nav">
                    <span>MasakApa</span>
                    <div>
                        <Link to="/sign-up">Sign Up</Link>
                        <Link to="/login">Log In</Link>
                    </div>
                </nav>
            </header>
            <Outlet />
        </div>
    );
}
