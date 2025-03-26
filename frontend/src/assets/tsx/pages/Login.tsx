import img from "../../img/auth-img/2.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPointLeft } from "@fortawesome/free-regular-svg-icons";
import { motion } from "motion/react";
import "../../sass/login.scss";

export default function Login() {
    const loginFormVariant = {
        initial: {},
        animate: {
            transition: {
                staggerChildren: 1,
            },
        },
    };

    const loginFormH1Variant = {
        initial: {
            opacity: 0,
            scale: 0.9,
        },
        animate: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 1,
            },
        },
    };

    const loginFormInputVariant = {
        initial: {},
        animate: {
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const loginFormInputItemVariant = {
        initial: {
            opacity: 0,
            x: -15,
        },
        animate: {
            opacity: 1,
            x: 0,
            transition: {
                delayChildren: 0.2,
            },
        },
    };

    const loginFormInputItemForgetPassword = {
        initial: {
            opacity: 0,
            x: -15,
        },
        animate: {
            opacity: 1,
            x: 0,
        },
    };

    const loginFormButtonVariant = {
        initial: {},
        animate: {
            transition: {
                staggerChildren: 0.3,
            },
        },
    };

    const loginFormButtonSubmitVariant = {
        initial: {
            opacity: 0,
            scale: 0.9,
        },
        animate: {
            opacity: 1,
            scale: 1,
        },
    };

    const loginFormButtonPVariant = {
        initial: {
            opacity: 0,
            scale: 0.9,
        },
        animate: {
            opacity: 1,
            scale: 1,
        },
    };

    return (
        <div className="login">
            <img src={img} alt="Makanan" />
            <motion.form
                className="login__form"
                variants={loginFormVariant}
                initial="initial"
                animate="animate"
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
                        <input type="text" id="email" />
                    </motion.div>
                    <motion.div
                        className="login__form__input__item"
                        variants={loginFormInputItemVariant}
                    >
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" />
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
