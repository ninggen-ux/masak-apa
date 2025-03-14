import img from "../../../img/auth-img/1.png";
import { Dispatch, SetStateAction } from "react";

interface Props {
    setAuthSwitch: Dispatch<SetStateAction<string>>;
}

export default function SignUp({ setAuthSwitch }: Props) {
    return (
        <div className="auth__signup">
            <form className="auth__signup__form">
                <h1>Sign Up</h1>
                <div className="auth__signup__form__input">
                    <div className="auth__signup__form__input__item">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" />
                    </div>
                    <div className="auth__signup__form__input__item">
                        <label htmlFor="email">Email</label>
                        <input type="text" id="email" />
                    </div>
                    <div className="auth__signup__form__input__item">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" />
                    </div>
                    <div className="auth__signup__form__input__item">
                        <label htmlFor="confirm-password">
                            Confirm Password
                        </label>
                        <input type="password" id="confirm-password" />
                    </div>
                </div>
                <div className="auth__signup__form__button">
                    <button
                        className="auth__signup__form__button__submit"
                        type="submit"
                    >
                        sign up
                    </button>
                    <p>
                        Already have account?{" "}
                        <button
                            type="button"
                            onClick={() => {
                                setAuthSwitch("login");
                            }}
                        >
                            Login
                        </button>
                    </p>
                </div>
            </form>
            <img src={img} alt="Makanan" />
        </div>
    );
}
