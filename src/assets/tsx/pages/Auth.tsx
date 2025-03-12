import Login from "../components/auth/Login.tsx";
import img1 from "../../img/auth-img/1.png";
import img2 from "../../img/auth-img/2.png";
import "../../sass/auth.scss";

export default function Auth() {
    interface AuthImgList {
        id: number;
        img: string;
    }

    const authImgList: AuthImgList[] = [
        {
            id: 1,
            img: img1,
        },
        {
            id: 2,
            img: img2,
        },
    ];

    return (
        <main className="auth">
            <Login />
            <img src={authImgList[0].img} alt="Makanan" />
        </main>
    );
}
