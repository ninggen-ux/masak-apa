import img from "../../../../img/hero-img/1.png";
import { motion } from "motion/react";

export default function HomeMenuFoodRecContainerItem() {
    return (
        <motion.a
            className="home__menu__food-rec__container__item"
            href="#"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
        >
            <img src={img} alt="Gambar Makanan" />
            <h2>Nama Menu</h2>
        </motion.a>
    );
}
