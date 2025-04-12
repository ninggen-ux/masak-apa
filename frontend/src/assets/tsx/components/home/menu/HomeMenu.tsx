import HomeMenuFoodListItem from "./HomeMenuFoodListItem";
import HomeMenuFoodRecContainerItem from "./HomeMenuFoodRecContainerItem.tsx";
import { ChangeEvent, useState, useRef } from "react";
import "../../../../sass/components/home/home__menu.scss";

export default function HomeMenu() {
    interface HomeMenuForm {
        searchFood: string[];
    }

    const [homeMenuForm, setHomeMenuForm] = useState<HomeMenuForm>({
        searchFood: [""],
    });

    const timeOutRef = useRef<number | undefined>(undefined);

    console.log(homeMenuForm);

    function formInputChangeHandler(eventOne: ChangeEvent<HTMLInputElement>) {
        const { name, value } = eventOne.target;

        const homeMenuFormTrim = value
            .split(",")
            .map((item) => item.trim())
            .filter((item) => item !== "");

        setHomeMenuForm((prevState) => {
            return {
                ...prevState,
                [name]: homeMenuFormTrim,
            };
        });

        if (timeOutRef.current) {
            clearTimeout(timeOutRef.current);
        }

        timeOutRef.current = window.setTimeout(async () => {
            try {
                const response = await fetch("http://localhost:3000/search", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(homeMenuFormTrim),
                    credentials: "include",
                });

                const responseJson = await response.json();

                console.log(responseJson);
            } catch (err) {
                console.error(err);
            }
        }, 1000);
    }

    return (
        <section className="home__menu">
            <form className="home__menu__form">
                <label htmlFor="search__food">Hari ini mau masak apa?</label>
                <input
                    id="search__food"
                    type="text"
                    name="searchFood"
                    onChange={formInputChangeHandler}
                    placeholder="Contoh: nasi, ayam, telur"
                />
            </form>
            <div className="home__menu__food-rec">
                <h2>Yuk Cobain Resep ini</h2>
                <div className="home__menu__food-rec__container">
                    <HomeMenuFoodRecContainerItem />
                    <HomeMenuFoodRecContainerItem />
                    <HomeMenuFoodRecContainerItem />
                </div>
            </div>
            <div className="home__menu__food-list">
                <HomeMenuFoodListItem />
                <HomeMenuFoodListItem />
                <HomeMenuFoodListItem />
                <HomeMenuFoodListItem />
                <HomeMenuFoodListItem />
                <HomeMenuFoodListItem />
                <HomeMenuFoodListItem />
                <HomeMenuFoodListItem />
            </div>
        </section>
    );
}
