import Login from "../components/auth/Login.tsx";
import SignUp from "../components/auth/SignUp.tsx";
import { useState } from "react";
import "../../sass/auth.scss";

export default function Auth() {
    const [authSwitch, setAuthSwitch] = useState<string>("login");

    /**
     * Akan di revisi karena fitur seperti ini sangat menyusahkan dalam
     * perawatan.
     */

    return (
        <main className="auth">
            {authSwitch === "login" && <Login setAuthSwitch={setAuthSwitch} />}
            {authSwitch === "signup" && (
                <SignUp setAuthSwitch={setAuthSwitch} />
            )}
        </main>
    );
}
