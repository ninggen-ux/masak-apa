import img from "../../img/auth-img/2.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPointLeft } from "@fortawesome/free-regular-svg-icons";
import "../../sass/login.scss";

export default function Login() {
    return (
        <div className="login">
            <img src={img} alt="Makanan" />
            <form className="login__form">
                <h1>Login</h1>
                <div className="login__form__input">
                    <div className="login__form__input__item">
                        <label htmlFor="email">Email</label>
                        <input type="text" id="email" />
                    </div>
                    <div className="login__form__input__item">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" />
                        <div className="login__form__input__item__forget-password">
                            <button type="button">Forget Password?</button>
                        </div>
                    </div>
                </div>
                <div className="login__form__button">
                    <button
                        className="login__form__button__submit"
                        type="submit"
                    >
                        Login
                    </button>
                    <p>
                        Dosen't have account yet?{" "}
                        <Link to="/sign-up">SignUp</Link>
                    </p>
                </div>
                <Link className="login__form__back-button" to="/">
                    <FontAwesomeIcon icon={faHandPointLeft} />
                    Back
                </Link>
            </form>
        </div>
    );
}
