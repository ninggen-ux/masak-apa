import { motion } from "motion/react";

interface Props {
    ingredient: string;
    isIncludes: boolean;
}

export default function HomeMenuFoodListItemIngredientsUlLi(props: Props) {
    const homeMenuFoodListItemIngredientsUlLiVariants = {
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
            style={{ color: props.isIncludes ? "#e50046" : "black" }}
            variants={homeMenuFoodListItemIngredientsUlLiVariants}
        >
            {props.ingredient}
        </motion.li>
    );
}
