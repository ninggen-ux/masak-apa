import HomeMenuFoodRecContainerItem from "./HomeMenuFoodRecContainerItem.tsx";
import { useEffect, useState } from "react";

interface Props {
    userData: string;
}

export default function HomeMenuFoodRec(props: Props) {
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
                            name: "",
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
    }, [props.userData]);

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
            {homeMenuFoodRecData[0].id !== "" && (
                <>
                    <h2>Yuk Cobain Resep ini!</h2>
                    <div className="home__menu__food-rec__container">
                        {homeMenuFoodRecContainerItemMap}
                    </div>
                </>
            )}
        </div>
    );
}
