import img from "../../img/auth-img/2.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPointLeft } from "@fortawesome/free-regular-svg-icons";
import { motion } from "motion/react";
import {
    FormEvent,
    ChangeEvent,
    useState,
    Dispatch,
    SetStateAction,
} from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
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

interface Props {
    setIsUserLogin: Dispatch<SetStateAction<string>>;
}

export default function Login(props: Props) {
    const navigate = useNavigate();
    interface LoginForm {
        email: string;
        password: string;
    }

    const [loginForm, setLoginForm] = useState<LoginForm>({
        email: "",
        password: "",
    });

    async function submitLoginForm(e: FormEvent) {
        e.preventDefault();
        try {
            /**
             * Loading di letakkan di bawah error handler karenan,
             * saking cepatnya pengecekkan error, Swal tidak
             * sampai merender Loading.
             */
            if (!loginForm.email) {
                throw new Error("Mohon mengisi bagian Email!!!");
            } else if (!loginForm.password) {
                throw new Error("Mohon mengisi bagian Password!!!");
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

            const response = await fetch("http://localhost:3000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(loginForm),
                credentials: "include",
            });
            const responseJson = await response.json();

            if (responseJson.status === "success") {
                props.setIsUserLogin(responseJson.message);
                Swal.fire({
                    icon: "success",
                    title: "Berhasil masuk ke akun",
                    text: responseJson.message,
                }).then((result) => {
                    if (result.isConfirmed || result.isDismissed) {
                        navigate("/");
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
                            type="email"
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
                            <Link to="/otp">Lupa Password?</Link>
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
                        Belum punya akun? <Link to="/sign-up">SignUp</Link>
                    </motion.p>
                </motion.div>
                <Link className="login__form__back-button" to="/">
                    <FontAwesomeIcon icon={faHandPointLeft} />
                    Kembali
                </Link>
            </motion.form>
        </div>
    );
}
