import { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPointLeft } from "@fortawesome/free-regular-svg-icons";
import Swal from "sweetalert2";
import "../../sass/pages/Otp.scss";

export default function Otp() {
    interface OtpForm {
        email: string;
    }

    const [otpForm, setOtpForm] = useState<OtpForm>({
        email: "",
    });

    console.log(otpForm);

    async function submitOtpForm(e: FormEvent) {
        e.preventDefault();

        try {
            if (!otpForm.email) {
                throw new Error("Mohon masukkan email anda!!!");
            }

            Swal.fire({
                title: "Loading...",
                text: "Tolong tunggu sebentar",
                allowOutsideClick: false,
                allowEscapeKey: false,
                didOpen: () => {
                    Swal.showLoading();
                },
            });

            const response = await fetch("http://localhost:3000/otp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(otpForm),
            });

            const responseJson = await response.json();

            if (responseJson.status === "success") {
                Swal.fire({
                    icon: "success",
                    title: "Berhasil mengirimkan email",
                    text: `${responseJson.message}, silahkan pencet OK untuk beralih ke Gmail`,
                }).then((result) => {
                    if (result.isConfirmed || result.isDismissed) {
                        window.open("https://mail.google.com/", "_blank");
                    }
                });
            } else if (responseJson.status === "fail") {
                throw new Error(responseJson.message);
            }

            console.log(responseJson);
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

    function formInputChangeHandler(e: ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setOtpForm((prevState) => {
            return { ...prevState, [name]: value };
        });
    }

    return (
        <div className="otp">
            <div className="otp__container">
                <div className="otp__container__text">
                    <h1>Lupa password anda?</h1>
                    <p>
                        Tenang, kami siap membantu! Masukkan email Anda dan kami
                        akan mengirimkan tautan reset password.
                    </p>
                </div>
                <form
                    className="otp__container__email"
                    onSubmit={submitOtpForm}
                >
                    <input
                        type="email"
                        name="email"
                        onChange={formInputChangeHandler}
                        placeholder="Masukkan email anda"
                    />
                    <button type="submit">Kirim email</button>
                </form>
            </div>
            <Link className="otp__back-button" to="/login">
                <FontAwesomeIcon icon={faHandPointLeft} />
                Kembali
            </Link>
        </div>
    );
}
