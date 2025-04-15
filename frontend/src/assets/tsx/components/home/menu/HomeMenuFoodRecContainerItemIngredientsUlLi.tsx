import { motion } from "motion/react";

interface Props {
    ingredient: string;
}

export default function HomeMenuFoodRecContainerItemIngredientsUlLi(
    props: Props
) {
    const homeMenuFoodRecContainerItemIngredientsUlLiVariants = {
        initial: {
            opacity: 0,
            x: -10,
        },
        animate: {
            opacity: 1,
            x: 0,
        },
        exit: {
            opacity: 0,
            x: -10,
        },
    };

    return (
        <motion.li
            variants={homeMenuFoodRecContainerItemIngredientsUlLiVariants}
        >
            {props.ingredient}
        </motion.li>
    );
}
