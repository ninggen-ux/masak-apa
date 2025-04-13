import HomeMenuFoodListItemIngredientsUlLi from "./HomeMenuFoodListItemIngredientsUlLi.tsx";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons/faAngleDown";
import { motion, AnimatePresence } from "motion/react";

interface Props {
    ingredients: string[];
    name: string;
    url: string;
    homeMenuFormSearchFood: string[];
}

export default function HomeMenuFoodListItem(props: Props) {
    const [isIngredientsOpen, setIsIngredientsOpen] = useState<boolean>(false);

    const sameIngredients = props.ingredients.filter((item) => {
        return props.homeMenuFormSearchFood.includes(item);
    });

    /**
     * Handler untuk sameIngredients di letakkan di child, karena
     * di parent codenya sudah terlalu panjang.
     */

    const homeMenuFoodListItemIngredientsMap = props.ingredients.map((item) => {
        return (
            <HomeMenuFoodListItemIngredientsUlLi
                ingredient={item}
                isIncludes={props.homeMenuFormSearchFood.includes(item)}
            />
        );
    });

    const homeMenuFoodListItemIngredientsUlVariants = {
        initial: {},
        animate: {
            transition: {
                staggerChildren: 0.2,
            },
        },
        exit: {
            transition: {
                when: "afterChildren",
                staggerDirection: -1,
                staggerChildren: 0.2,
            },
        },
    };

    return (
        <motion.div
            className="home__menu__food-list__item"
            whileHover={{ scale: 1.03 }}
        >
            <div className="home__menu__food-list__item__text">
                <h3>{props.name}</h3>
                <a href={props.url} target="_blank">
                    {props.url}
                </a>
            </div>
            <div className="home__menu__food-list__item__ingredients">
                <button
                    onClick={() => {
                        setIsIngredientsOpen((prevState) => {
                            return !prevState;
                        });
                    }}
                >
                    Bahan - Bahan{" "}
                    <FontAwesomeIcon
                        icon={faAngleDown}
                        style={{
                            transform: isIngredientsOpen
                                ? "rotate(180deg)"
                                : "rotate(0deg)",
                        }}
                    />
                </button>
                <AnimatePresence>
                    {isIngredientsOpen && (
                        <motion.ul
                            variants={homeMenuFoodListItemIngredientsUlVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                        >
                            {homeMenuFoodListItemIngredientsMap}
                        </motion.ul>
                    )}
                </AnimatePresence>
            </div>
            <p>Terdapat {sameIngredients.length} bahan yang sama</p>
        </motion.div>
    );
}
