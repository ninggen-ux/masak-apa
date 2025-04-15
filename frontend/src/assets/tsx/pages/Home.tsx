import HomeHero from "../components/home/hero/HomeHero.tsx";
import HomeMenu from "../components/home/menu/HomeMenu.tsx";
import "../../sass/pages/home.scss";

interface Props {
    userData: string;
}

export default function Home(props: Props) {
    return (
        <main className="home">
            <HomeHero />
            <HomeMenu userData={props.userData} />
        </main>
    );
}
