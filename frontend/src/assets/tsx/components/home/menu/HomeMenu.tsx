import HomeMenuFoodListItem from "./HomeMenuFoodListItem";
import HomeMenuFoodRecContainerItem from "./HomeMenuFoodRecContainerItem.tsx";
import "../../../../sass/components/home/home__menu.scss";

export default function HomeMenu() {
    return (
        <section className="home__menu">
            <form className="home__menu__form">
                <label htmlFor="searchFood">Hari ini mau masak apa?</label>
                <input
                    id="searchFood"
                    type="text"
                    placeholder="Masukkan bahan yang anda punya"
                />
            </form>
            <div className="home__menu__food-rec">
                <h2>Yuk Cobain Resep ini</h2>
                <div className="home__menu__food-rec__container">
                    <HomeMenuFoodRecContainerItem />
                    <HomeMenuFoodRecContainerItem />
                    <HomeMenuFoodRecContainerItem />
                </div>
            </div>
            <div className="home__menu__food-list">
                <HomeMenuFoodListItem />
                <HomeMenuFoodListItem />
                <HomeMenuFoodListItem />
                <HomeMenuFoodListItem />
                <HomeMenuFoodListItem />
                <HomeMenuFoodListItem />
                <HomeMenuFoodListItem />
                <HomeMenuFoodListItem />
            </div>
        </section>
    );
}
