import { motion } from "motion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons/faAngleDown";

interface Props {
    ingredients: string[];
    name: string;
    url: string;
}

export default function HomeMenuFoodRecContainerItem(props: Props) {
    return (
        <motion.div
            className="home__menu__food-rec__container__item"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
        >
            <motion.a href={props.url} whileHover={{ color: "#e50046" }}>
                {props.name}
            </motion.a>
            <div className="home__menu__food-rec__container__item__ingredients">
                <button>
                    Bahan - Bahan <FontAwesomeIcon icon={faAngleDown} />
                </button>
                <ul></ul>
            </div>
        </motion.div>
    );
}
