import { ChangeEvent, FormEvent, useState } from "react";
import "../../../sass/components/otp/otp__reset-pass.scss";

/**
 *  Saya sebenarnya bingung, halaman sebenarnya bisa di buat berdiri sendiri,
 *  tapi itu akan membuat nama filenya menjadi panjang. Jadi, karena secara
 *  halaman ini masih bisa di hitung sebagai anaknya Otp, jadi saya jadikan
 *  anak dari Otp saja, dari pada namanya jadi panjagan.
 */

export default function OtpResetPass() {
    interface OtpResetPassForm {
        newPassword: string;
        confirmPassword: string;
    }

    const [otpResetPassForm, setOtpResetPassForm] = useState<OtpResetPassForm>({
        newPassword: "",
        confirmPassword: "",
    });

    console.log(otpResetPassForm);

    function submitOtpForm(e: FormEvent) {
        e.preventDefault();

        console.log(otpResetPassForm);
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
