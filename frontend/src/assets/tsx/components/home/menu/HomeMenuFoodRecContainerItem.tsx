import { motion, AnimatePresence } from "motion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons/faAngleDown";
import HomeMenuFoodRecContainerItemIngredientsUlLi from "./HomeMenuFoodRecContainerItemIngredientsUlLi.tsx";

interface Props {
    ingredients: string[];
    name: string;
    url: string;
}

export default function HomeMenuFoodRecContainerItem(props: Props) {
    const [isIngredientsOpen, setIsIngredientsOpen] = useState<boolean>(false);

    const homeMenuFoodRecContainerItemIngredientsUlLiMap =
        props.ingredients.map((item) => {
            return (
                <HomeMenuFoodRecContainerItemIngredientsUlLi
                    ingredient={item}
                />
            );
        });

    const homeMenuFoodRecContainerItemIngredientsUlVariants = {
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
            className="home__menu__food-rec__container__item"
            whileHover={{ scale: 1.03 }}
        >
            <motion.a
                href={`https://${props.url}`}
                target="_blank"
                whileHover={{ color: "#e50046", textDecoration: "underline" }}
            >
                {props.name}
            </motion.a>
            <div className="home__menu__food-rec__container__item__ingredients">
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
                            variants={
                                homeMenuFoodRecContainerItemIngredientsUlVariants
                            }
                            initial="initial"
                            animate="animate"
                            exit="exit"
                        >
                            {homeMenuFoodRecContainerItemIngredientsUlLiMap}
                        </motion.ul>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}
