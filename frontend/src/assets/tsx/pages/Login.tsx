import img from "../../img/auth-img/2.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPointLeft } from "@fortawesome/free-regular-svg-icons";
import { motion } from "motion/react";
import { FormEvent, ChangeEvent, useState } from "react";
import {
    loginFormVariant,
    loginFormH1Variant,
    loginFormInputVariant,
    loginFormInputItemVariant,
    loginFormInputItemForgetPassword,
    loginFormButtonVariant,
    loginFormButtonSubmitVariant,
    loginFormButtonPVariant,
} from "../components/login/LoginVariant.tsx";
import "../../sass/pages/login.scss";

export default function Login() {
    interface Login {
        email: string;
        password: string;
    }

    const [loginForm, setLoginForm] = useState<Login>({
        email: "",
        password: "",
    });

    async function submitLoginForm(e: FormEvent) {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(loginForm),
            });
            const responseJson = await response.json();
            console.log(responseJson);
        } catch (err) {
            console.error(err);
        }
    }

    function formInputChangeHandler(e: ChangeEvent<HTMLInputElement>) {
        const { value, name } = e.target;
        setLoginForm((prevState) => {
            return { ...prevState, [name]: value };
        });
    }

    return (
        <div className="login">
            <img src={img} alt="Makanan" />
            <motion.form
                className="login__form"
                variants={loginFormVariant}
                initial="initial"
                animate="animate"
                onSubmit={submitLoginForm}
            >
                <motion.h1 variants={loginFormH1Variant}>Login</motion.h1>
                <motion.div
                    className="login__form__input"
                    variants={loginFormInputVariant}
                >
                    <motion.div
                        className="login__form__input__item"
                        variants={loginFormInputItemVariant}
                    >
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            onChange={formInputChangeHandler}
                            autoComplete="email"
                            value={loginForm.email}
                        />
                    </motion.div>
                    <motion.div
                        className="login__form__input__item"
                        variants={loginFormInputItemVariant}
                    >
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            onChange={formInputChangeHandler}
                            autoComplete="current-password"
                            value={loginForm.password}
                        />
                        <motion.div
                            className="login__form__input__item__forget-password"
                            variants={loginFormInputItemForgetPassword}
                        >
                            <button type="button">Forget Password?</button>
                        </motion.div>
                    </motion.div>
                </motion.div>
                <motion.div
                    className="login__form__button"
                    variants={loginFormButtonVariant}
                >
                    <motion.button
                        className="login__form__button__submit"
                        type="submit"
                        variants={loginFormButtonSubmitVariant}
                    >
                        Login
                    </motion.button>
                    <motion.p variants={loginFormButtonPVariant}>
                        Dosen't have account yet?{" "}
                        <Link to="/sign-up">SignUp</Link>
                    </motion.p>
                </motion.div>
                <Link className="login__form__back-button" to="/">
                    <FontAwesomeIcon icon={faHandPointLeft} />
                    Back
                </Link>
            </motion.form>
        </div>
    );
}
