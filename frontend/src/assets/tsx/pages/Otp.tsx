import { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPointLeft } from "@fortawesome/free-regular-svg-icons";
import "../../sass/pages/Otp.scss";

export default function Otp() {
    interface OtpForm {
        email: string;
    }

    const [otpForm, setOtpForm] = useState<OtpForm>({
        email: "",
    });

    console.log(otpForm);

    function submitOtpForm(e: FormEvent) {
        e.preventDefault();

        console.log(otpForm);
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
