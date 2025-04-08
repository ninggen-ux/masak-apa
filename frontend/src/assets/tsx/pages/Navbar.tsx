import { Outlet, Link } from "react-router-dom";
import Swal from "sweetalert2";
import "../../sass/pages/navbar.scss";

interface Props {
    userData: string;
}

export default function Navbar(props: Props) {
    async function signOut() {
        try {
            Swal.fire({
                title: "Loading...",
                text: "Tolong tunggu sebentar",
                allowOutsideClick: false,
                allowEscapeKey: false,
                didOpen: () => {
                    Swal.showLoading();
                },
            });

            const response = await fetch("http://localhost:3000/signout", {
                method: "DELETE",
                credentials: "include",
            });

            const responseJson = await response.json();

            if (responseJson.status === "success") {
                Swal.fire({
                    icon: "success",
                    title: "Berhasil kaluar dari akun",
                    text: responseJson.message,
                });
            } else if (responseJson.status === "fail") {
                throw new Error(responseJson.message);
            }
        } catch (err) {
            if (err instanceof Error) {
                /**
                 * Harus mengecek apakah err itu instance dari Error
                 * jika tidak, message tidak akan di kenali oleh TS.
                 */
                if (err.message !== undefined) {
                    Swal.fire({
                        icon: "error",
                        title: "Terjadi Kesalahan",
                        text: err.message,
                    });
                } else if (typeof err === "string") {
                    Swal.fire({
                        icon: "error",
                        title: "Terjadi Kesalahan",
                        text: err,
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Terjadi Kesalahan",
                        text: "Terjadi error yang tidak terduga",
                    });
                }
            }
            console.error(err);
        }
    }

    return (
        <div className="main-container">
            <header className="header">
                <nav className="header__nav">
                    <span>MasakApa</span>
                    {props.userData ? (
                        <div>
                            <button onClick={signOut}>Sign Out</button>
                        </div>
                    ) : (
                        <div>
                            <Link to="/sign-up">Sign Up</Link>
                            <Link to="/login">Log In</Link>
                        </div>
                    )}
                </nav>
            </header>
            <Outlet />
        </div>
    );
}
