import img from "../../img/auth-img/1.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPointLeft } from "@fortawesome/free-regular-svg-icons";
import { motion } from "motion/react";
import "../../sass/pages/sign-up.scss";

export default function SignUp() {
    const signupFormVariant = {
        initial: {},
        animate: {
            transition: {
                staggerChildren: 1,
            },
        },
    };

    const signupFormH1Variant = {
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

    const signupFormInputVariant = {
        initial: {},
        animate: {
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const signupFormInputItemVariant = {
        initial: {
            opacity: 0,
            x: -15,
        },
        animate: {
            opacity: 1,
            x: 0,
        },
    };

    const signupFormButtonVariant = {
        initial: {},
        animate: {
            transition: {
                staggerChildren: 0.3,
            },
        },
    };

    const signupFormButtonSubmitVariant = {
        initial: {
            opacity: 0,
            scale: 0.9,
        },
        animate: {
            opacity: 1,
            scale: 1,
        },
    };

    const signupFormButtonPVariant = {
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
        <div className="signup">
            <motion.form
                className="signup__form"
                variants={signupFormVariant}
                initial="initial"
                animate="animate"
            >
                <motion.h1 variants={signupFormH1Variant}>Sign Up</motion.h1>
                <motion.div
                    className="signup__form__input"
                    variants={signupFormInputVariant}
                >
                    <motion.div
                        className="signup__form__input__item"
                        variants={signupFormInputItemVariant}
                    >
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" />
                    </motion.div>
                    <motion.div
                        className="signup__form__input__item"
                        variants={signupFormInputItemVariant}
                    >
                        <label htmlFor="email">Email</label>
                        <input type="text" id="email" />
                    </motion.div>
                    <motion.div
                        className="signup__form__input__item"
                        variants={signupFormInputItemVariant}
                    >
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" />
                    </motion.div>
                    <motion.div
                        className="signup__form__input__item"
                        variants={signupFormInputItemVariant}
                    >
                        <label htmlFor="confirm-password">
                            Confirm Password
                        </label>
                        <input type="password" id="confirm-password" />
                    </motion.div>
                </motion.div>
                <motion.div
                    className="signup__form__button"
                    variants={signupFormButtonVariant}
                >
                    <motion.button
                        className="signup__form__button__submit"
                        type="submit"
                        variants={signupFormButtonSubmitVariant}
                    >
                        sign up
                    </motion.button>
                    <motion.p variants={signupFormButtonPVariant}>
                        Already have account? <Link to="/login">Login</Link>
                    </motion.p>
                </motion.div>
                <Link className="signup__form__back-button" to="/">
                    <FontAwesomeIcon icon={faHandPointLeft} />
                    Back
                </Link>
            </motion.form>
            <img src={img} alt="Makanan" />
        </div>
    );
}
