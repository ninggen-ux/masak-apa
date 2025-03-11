import { foodImgList, foodTagLine } from "../components/hero/HeroData.tsx";
import logo from "../../img/hero-img/5.png";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import "../../sass/hero.scss";

export default function Hero() {
    const [numberCount, setNumberCount] = useState<number>(0);

    useEffect(() => {
        const interfal = setInterval(() => {
            setNumberCount((prevState) => {
                return prevState < 3 ? prevState + 1 : 0;
            });
        }, 5000);

        return () => clearInterval(interfal);
    }, []);

    return (
        <main className="main">
            <div className="main__text">
                <img src={logo} alt="Logo" />
                <div className="main__text__content">
                    <div>
                        <AnimatePresence mode="wait">
                            <motion.h1
                                key={foodTagLine[numberCount].id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                            >
                                {foodTagLine[numberCount].title}
                            </motion.h1>
                        </AnimatePresence>
                        <AnimatePresence mode="wait">
                            <motion.p
                                key={foodTagLine[numberCount].id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                            >
                                {foodTagLine[numberCount].text}
                            </motion.p>
                        </AnimatePresence>
                    </div>
                    <div>
                        <a href="#">Get Started</a>
                    </div>
                </div>
            </div>
            <div className="main__food-img">
                <AnimatePresence mode="wait">
                    <motion.img
                        src={foodImgList[numberCount].img}
                        alt="Gambar Makanan"
                        key={foodImgList[numberCount].id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                    />
                </AnimatePresence>
            </div>
        </main>
    );
}
