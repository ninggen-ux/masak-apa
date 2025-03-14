import img from "../../../img/auth-img/2.png";
import { Dispatch, SetStateAction } from "react";

interface Props {
    setAuthSwitch: Dispatch<SetStateAction<string>>;
}

export default function Login({ setAuthSwitch }: Props) {
    return (
        <div className="auth__login">
            <img src={img} alt="Makanan" />
            <form className="auth__login__form">
                <h1>Login</h1>
                <div className="auth__login__form__input">
                    <div className="auth__login__form__input__item">
                        <label htmlFor="email">Email</label>
                        <input type="text" id="email" />
                    </div>
                    <div className="auth__login__form__input__item">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" />
                        <div className="auth__login__form__input__item__forget-password">
                            <button type="button">Forget Password?</button>
                        </div>
                    </div>
                </div>
                <div className="auth__login__form__button">
                    <button
                        className="auth__login__form__button__submit"
                        type="submit"
                    >
                        Login
                    </button>
                    <p>
                        Dosen't have account yet?{" "}
                        <button
                            type="button"
                            onClick={() => {
                                setAuthSwitch("signup");
                            }}
                        >
                            SignUp
                        </button>
                    </p>
                </div>
            </form>
        </div>
    );
}
