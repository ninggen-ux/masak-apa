import HomeMenuFoodListItem from "./HomeMenuFoodListItem.tsx";
import HomeMenuFoodRec from "./HomeMenuFoodRec.tsx";
import { ChangeEvent, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../../../../sass/components/home/home__menu.scss";

interface Props {
    userData: string;
}

export default function HomeMenu(props: Props) {
    interface HomeMenuForm {
        searchFood: string[];
    }

    interface HomeMenuFoodsData {
        id: string;
        ingredients: string[];
        name: string;
        url: string;
    }

    const navigate = useNavigate();

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
            } else if (responseJson.message === "User tidak terdaftar") {
                navigate("/login");
            } else if (responseJson.status === "fail") {
                setHomeMenuFoodsData([
                    {
                        id: "",
                        ingredients: [""],
                        name: responseJson.message,
                        // Error code diletakkan disini, untuk menghemat line code.
                        url: "",
                    },
                ]);
            }
            /**
             * Handler errornya dibuat seperti di atas, karena jika tidak ada
             * data maka react akan error dan jika tidak mempertihungkan "fail"
             * maka data yang seharusnya sudah terhapus akan tetap ada.
             */
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
                    placeholder="Contoh: rice, chicken, egg"
                />
            </form>
            <HomeMenuFoodRec userData={props.userData} />
            <div className="home__menu__food-list">
                {homeMenuFoodsData[0].id === "" ? (
                    <h3>{homeMenuFoodsData[0].name}</h3>
                ) : (
                    homeMenuFoodListItemMap
                )}
            </div>
        </section>
    );
}
