import HomeMenuFoodRecContainerItem from "./HomeMenuFoodRecContainerItem.tsx";
import { useEffect, useState } from "react";

export default function HomeMenuFoodRec() {
    interface HomeMenuFoodRecData {
        id: string;
        ingredients: string[];
        name: string;
        url: string;
    }

    const [homeMenuFoodRecData, setHomeMenuFoodRecData] = useState<
        HomeMenuFoodRecData[]
    >([
        {
            id: "",
            ingredients: [""],
            name: "",
            url: "",
        },
    ]);

    useEffect(() => {
        async function getHomeMenuFoodRec() {
            try {
                const response = await fetch(
                    "http://localhost:3000/search/recomendations",
                    {
                        method: "GET",
                        credentials: "include",
                    }
                );

                const responseJson = await response.json();

                if (responseJson.status === "success") {
                    setHomeMenuFoodRecData(responseJson.foodsData);
                } else if (responseJson.status === "fail") {
                    setHomeMenuFoodRecData([
                        {
                            id: "",
                            ingredients: [""],
                            name: responseJson.message,
                            // Error code diletakkan disini, untuk menghemat line code.
                            url: "",
                        },
                    ]);
                }

                console.log(responseJson);
            } catch (err) {
                console.log(err);
            }
        }

        getHomeMenuFoodRec();
    }, []);

    const homeMenuFoodRecContainerItemMap = homeMenuFoodRecData.map((item) => {
        return (
            <HomeMenuFoodRecContainerItem
                key={item.id}
                ingredients={item.ingredients}
                name={item.name}
                url={item.url}
            />
        );
    });

    return (
        <div className="home__menu__food-rec">
            <h2>Yuk Cobain Resep ini!</h2>
            <div className="home__menu__food-rec__container">
                {homeMenuFoodRecContainerItemMap}
            </div>
        </div>
    );
}
