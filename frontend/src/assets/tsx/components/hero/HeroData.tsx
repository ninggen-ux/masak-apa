import img1 from "../../../img/hero-img/1.png";
import img2 from "../../../img/hero-img/2.png";
import img3 from "../../../img/hero-img/3.png";
import img4 from "../../../img/hero-img/4.png";

interface FoodImgList {
    id: number;
    img: string;
}

interface FoodTagLine {
    id: number;
    title: string;
    text: string;
    active: boolean;
}

const foodImgList: FoodImgList[] = [
    {
        id: 1,
        img: img1,
    },
    {
        id: 2,
        img: img2,
    },
    {
        id: 3,
        img: img3,
    },
    {
        id: 4,
        img: img4,
    },
];

const foodTagLine: FoodTagLine[] = [
    {
        id: 1,
        title: "Cook with What You Have",
        text: "Smart recipe suggestions based on your ingredients!",
        active: true,
    },
    {
        id: 2,
        title: "AI-Powered Recipes",
        text: "No more wasted ingredients—get the perfect meal ideas instantly!",
        active: true,
    },
    {
        id: 3,
        title: "From Leftovers to Delicacies",
        text: "Turn what's in your kitchen into a delicious dish!",
        active: true,
    },
    {
        id: 4,
        title: "Find Recipes, Effortlessly",
        text: "Enter your ingredients, let AI do the rest!",
        active: true,
    },
];

export { foodImgList, foodTagLine };
