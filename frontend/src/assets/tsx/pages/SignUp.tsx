import img from "../../img/auth-img/1.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPointLeft } from "@fortawesome/free-regular-svg-icons";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { motion } from "motion/react";
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
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
    const navigate = useNavigate();
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

    const [passwordRequirement, setPasswordRequirement] =
        useState<boolean>(false);

    async function submitSignupForm(e: FormEvent) {
        e.preventDefault();
        try {
            /**
             * Loading di letakkan di bawah error handler karenan,
             * saking cepatnya pengecekkan error, Swal tidak
             * sampai merender Loading.
             */
            if (!signupForm.username) {
                throw new Error("Mohon mengisi bagian Username!!!");
            } else if (!signupForm.email) {
                throw new Error("Mohon mengisi bagian Email!!!");
            } else if (!signupForm.password) {
                throw new Error("Mohon mengisi bagian Password!!!");
            } else if (!signupForm.confirmPassword) {
                throw new Error("Mohon mengisi bagian Confirm Password!!!");
            } else if (signupForm.password !== signupForm.confirmPassword) {
                throw new Error("Password dan Confirm Password, tidak sama!!!");
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

            if (responseJson.status === "success") {
                Swal.fire({
                    icon: "success",
                    title: "Berhasil mebambahkan akun",
                    text: responseJson.message,
                }).then((result) => {
                    if (result.isConfirmed || result.isDismissed) {
                        navigate("/login");
                    }
                });
            } else if (responseJson.status === "fail") {
                throw new Error(responseJson.message);
            }

            console.log(responseJson);
        } catch (err: unknown) {
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
                        <label htmlFor="username">Nama pengguna</label>
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
                            type="email"
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
                        <label htmlFor="password">
                            Password{" "}
                            <motion.button
                                type="button"
                                whileTap={{ scale: 0.9 }}
                                onMouseOver={() => setPasswordRequirement(true)}
                                onMouseOut={() => setPasswordRequirement(false)}
                                onClick={() =>
                                    setPasswordRequirement((prevState) => {
                                        return !prevState;
                                    })
                                }
                            >
                                <FontAwesomeIcon
                                    className="signup__form__input__item__label__icon"
                                    icon={faCircleExclamation}
                                />
                                {passwordRequirement && (
                                    <span>
                                        Minimal 8 karakter, huruf besar dan
                                        kecil, angka dan karakter khusus
                                    </span>
                                )}
                            </motion.button>
                        </label>
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
                            Konfirmasi Password
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
                        Sudah punya Akun? <Link to="/login">Login</Link>
                    </motion.p>
                </motion.div>
                <Link className="signup__form__back-button" to="/">
                    <FontAwesomeIcon icon={faHandPointLeft} />
                    Kembali
                </Link>
            </motion.form>
            <img src={img} alt="Makanan" />
        </div>
    );
}
