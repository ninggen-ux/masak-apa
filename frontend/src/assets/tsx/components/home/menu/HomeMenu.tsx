import HomeMenuFoodListItem from "./HomeMenuFoodListItem";
import HomeMenuFoodRecContainerItem from "./HomeMenuFoodRecContainerItem.tsx";
import { ChangeEvent, useState, useRef } from "react";
import "../../../../sass/components/home/home__menu.scss";

export default function HomeMenu() {
    interface HomeMenuForm {
        searchFood: string[];
    }

    interface HomeMenuFoodsData {
        id: string;
        ingredients: string[];
        name: string;
        url: string;
    }

    const [homeMenuForm, setHomeMenuForm] = useState<HomeMenuForm>({
        searchFood: [""],
    });

    const [homeMenuFoodsData, setHomeMenuFoodsData] = useState<
        HomeMenuFoodsData[]
    >([
        {
            id: "",
            ingredients: [""],
            name: "",
            url: "",
        },
    ]);

    console.log(homeMenuFoodsData);

    const timeOutRef = useRef<number | undefined>(undefined);

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

                if (responseJson.status === "success") {
                    setHomeMenuFoodsData(responseJson.foodsData);
                } else if (responseJson.status === "fail") {
                    setHomeMenuFoodsData([
                        {
                            id: "",
                            ingredients: [""],
                            name: "",
                            url: "",
                        },
                    ]);
                }
                /**
                 * Handler errornya dibuat seperti di atas, karena jika tidak ada
                 * data maka react akan error dan jika tidak mempertihungkan "fail"
                 * maka data yang seharusnya sudah terhapus akan tetap ada.
                 */
            } catch (err) {
                // Catch akan di hapus saat Production
                console.error(err);
            }
        }, 1000);
    }

    const homeMenuFoodListItemMap = homeMenuFoodsData.map((item) => {
        return (
            <HomeMenuFoodListItem
                key={item.id}
                ingredients={item.ingredients}
                name={item.name}
                url={item.url}
                homeMenuFormSearchFood={homeMenuForm.searchFood}
            />
        );
    });

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
                <h2>Yuk Cobain Resep ini!</h2>
                <div className="home__menu__food-rec__container">
                    <HomeMenuFoodRecContainerItem />
                    <HomeMenuFoodRecContainerItem />
                    <HomeMenuFoodRecContainerItem />
                </div>
            </div>
            {homeMenuFoodsData[0].id !== "" && (
                <div className="home__menu__food-list">
                    {homeMenuFoodListItemMap}
                </div>
            )}
        </section>
    );
}
