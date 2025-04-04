import img from "../../../../img/hero-img/1.png";

export default function HomeMenuFoodRecContainerItem() {
    return (
        <a className="home__menu__food-rec__container__item" href="#">
            <img src={img} alt="Gambar Makanan" />
            <h2>Nama Menu</h2>
        </a>
    );
}
