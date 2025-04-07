import img from "../../img/auth-img/1.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPointLeft } from "@fortawesome/free-regular-svg-icons";
import { motion } from "motion/react";
import { ChangeEvent, FormEvent, useState } from "react";
import {
    signupFormVariant,
    signupFormH1Variant,
    signupFormInputVariant,
    signupFormInputItemVariant,
    signupFormButtonVariant,
    signupFormButtonSubmitVariant,
    signupFormButtonPVariant,
} from "../components/signup/SignUpVariant.tsx";
import "../../sass/pages/sign-up.scss";

export default function SignUp() {
    interface SignupForm {
        username: string;
        email: string;
        password: string;
        confirmPassword: string;
    }

    const [signupForm, setSignupForm] = useState<SignupForm>({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    async function submitSignupForm(e: FormEvent) {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3000/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: signupForm.username,
                    email: signupForm.email,
                    password: signupForm.password,
                }),
            });
            const responseJson = await response.json();
            console.log(responseJson);
        } catch (err) {
            console.error(err);
        }
    }

    function formInputChangeHandler(e: ChangeEvent<HTMLInputElement>) {
        const { value, name } = e.target;
        setSignupForm((prevState) => {
            return { ...prevState, [name]: value };
        });
    }

    return (
        <div className="signup">
            <motion.form
                className="signup__form"
                variants={signupFormVariant}
                initial="initial"
                animate="animate"
                onSubmit={submitSignupForm}
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
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={signupForm.username}
                            autoComplete="username"
                            onChange={formInputChangeHandler}
                        />
                    </motion.div>
                    <motion.div
                        className="signup__form__input__item"
                        variants={signupFormInputItemVariant}
                    >
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            value={signupForm.email}
                            autoComplete="email"
                            onChange={formInputChangeHandler}
                        />
                    </motion.div>
                    <motion.div
                        className="signup__form__input__item"
                        variants={signupFormInputItemVariant}
                    >
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={signupForm.password}
                            autoComplete="new-password"
                            onChange={formInputChangeHandler}
                        />
                    </motion.div>
                    <motion.div
                        className="signup__form__input__item"
                        variants={signupFormInputItemVariant}
                    >
                        <label htmlFor="confirm-password">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirm-password"
                            name="confirmPassword"
                            autoComplete="new-password"
                            value={signupForm.confirmPassword}
                            onChange={formInputChangeHandler}
                        />
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
