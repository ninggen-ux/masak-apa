import { ChangeEvent, FormEvent, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "../../../sass/components/otp/otp__reset-pass.scss";

/**
 *  Saya sebenarnya bingung, halaman sebenarnya bisa di buat berdiri sendiri,
 *  tapi itu akan membuat nama filenya menjadi panjang. Jadi, karena secara
 *  halaman ini masih bisa di hitung sebagai anaknya Otp, jadi saya jadikan
 *  anak dari Otp saja, dari pada namanya jadi panjagan.
 */

export default function OtpResetPass() {
    const navigate = useNavigate();
    interface OtpResetPassForm {
        newPassword: string;
        confirmPassword: string;
    }

    const [otpResetPassForm, setOtpResetPassForm] = useState<OtpResetPassForm>({
        newPassword: "",
        confirmPassword: "",
    });

    console.log(otpResetPassForm);

    async function submitOtpForm(e: FormEvent) {
        e.preventDefault();
        try {
            if (!otpResetPassForm.newPassword) {
                throw new Error("Mohon masukkan password baru!!!");
            } else if (!otpResetPassForm.confirmPassword) {
                throw new Error("Mohon masukkan konfirmasi password!!!");
            } else if (
                otpResetPassForm.newPassword !==
                otpResetPassForm.confirmPassword
            ) {
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

            const response = await fetch(
                "http://localhost:3000/otp-change-password",
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(otpResetPassForm),
                }
            );

            const responseJson = await response.json();

            if (responseJson.status === "success") {
                Swal.fire({
                    icon: "success",
                    title: "Berhasil mengganti password",
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
        } catch (err) {
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
        const { name, value } = e.target;
        setOtpResetPassForm((prevState) => {
            return { ...prevState, [name]: value };
        });
    }

    return (
        <div className="otp__reset-pass">
            <div className="otp__reset-pass__container">
                <div className="otp__reset-pass__container__text">
                    <h1>Ganti password</h1>
                    <p>
                        Yay! Ganti password baru dan jangan sampai lupa lagi ya!
                    </p>
                </div>
                <form
                    className="otp__reset-pass__container__form"
                    onSubmit={submitOtpForm}
                >
                    <div className="otp__reset-pass__container__form__item">
                        <label htmlFor="new-password">Password baru</label>
                        <input
                            type="password"
                            name="newPassword"
                            id="new-password"
                            onChange={formInputChangeHandler}
                        />
                    </div>
                    <div className="otp__reset-pass__container__form__item">
                        <label htmlFor="confirm-password">
                            Konfirmasi password
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            id="confirm-password"
                            onChange={formInputChangeHandler}
                        />
                    </div>
                    <button type="submit">Lanjutkan</button>
                </form>
            </div>
        </div>
    );
}
