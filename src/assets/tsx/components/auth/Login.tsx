export default function Login() {
    return (
        <form className="auth__login">
            <h1>Login</h1>
            <div className="auth__login__input">
                <div className="auth__login__input__item">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" />
                </div>
                <div className="auth__login__input__item">
                    <label htmlFor="email">Email</label>
                    <input type="text" id="email" />
                </div>
                <div className="auth__login__input__item">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" />
                </div>
                <div className="auth__login__input__item">
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input type="password" id="confirm-password" />
                </div>
            </div>
            <div className="auth__login__button">
                <button className="auth__login__button__submit" type="submit">
                    Login
                </button>
                <p>
                    Dosen't have account yet?{" "}
                    <button type="button">Sign In</button>
                </p>
            </div>
        </form>
    );
}
