import { foodImgList, foodTagLine } from "./HomeHeroData.tsx";
import logo from "../../../../img/hero-img/logo.png";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import "../../../../sass/components/home/home__hero.scss";

export default function HomeHero() {
    const [numberCount, setNumberCount] = useState<number>(0);
    // Untuk perulangan/iterasi di gambar dan judul

    useEffect(() => {
        const interfal = setInterval(() => {
            setNumberCount((prevState) => {
                return prevState < 3 ? prevState + 1 : 0;
            });
        }, 5000);

        return () => clearInterval(interfal);
    }, []);

    return (
        <section className="home__hero">
            <div className="home__hero__text">
                <img src={logo} alt="Logo" />
                <div className="home__hero__text__content">
                    <div>
                        <AnimatePresence mode="wait">
                            <motion.h1
                                key={`title-key-${foodTagLine[numberCount].id}`}
                                /**
                                 * Terkadang Keynya saya buat seperti ini
                                 * `title-key-${foodTagLine[numberCount].id}`,
                                 * untuk menghindari persamaan key dengan
                                 * element lain, yang bisa menyebabkan
                                 * banyak hal tidak terduga di UI.
                                 */
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                            >
                                {foodTagLine[numberCount].title}
                            </motion.h1>
                        </AnimatePresence>
                        <AnimatePresence mode="wait">
                            <motion.p
                                key={`teks-key-${foodTagLine[numberCount].id}`}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                            >
                                {foodTagLine[numberCount].text}
                            </motion.p>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
            <div className="home__hero__food-img">
                <AnimatePresence mode="wait">
                    <motion.img
                        src={foodImgList[numberCount].img}
                        alt="Gambar Makanan"
                        key={`img-key-${foodImgList[numberCount].id}`}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                    />
                </AnimatePresence>
            </div>
        </section>
    );
}
