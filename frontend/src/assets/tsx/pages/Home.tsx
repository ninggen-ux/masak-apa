import HomeHero from "../components/home/hero/HomeHero.tsx";
import HomeMenu from "../components/home/menu/HomeMenu.tsx";
import "../../sass/pages/home.scss";

export default function Home() {
    return (
        <main className="home">
            <HomeHero />
            <HomeMenu />
        </main>
    );
}
