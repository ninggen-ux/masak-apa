import img1 from "../../../../img/hero-img/1.png";
import img2 from "../../../../img/hero-img/2.png";
import img3 from "../../../../img/hero-img/3.png";
import img4 from "../../../../img/hero-img/4.png";

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
        title: "Masak dengan Bahan yang Ada",
        text: "Rekomendasi resep cerdas berdasarkan bahan yang kamu miliki!",
        active: true,
    },
    {
        id: 2,
        title: "Resep dengan Kecerdasan AI",
        text: "Tidak ada lagi bahan terbuang—dapatkan ide masakan sempurna secara instan!",
        active: true,
    },
    {
        id: 3,
        title: "Makanan Sisa Menjadi Lezat",
        text: "Ubah bahan sisa jadi hidangan menggugah selera!",
        active: true,
    },
    {
        id: 4,
        title: "Temukan Resep dengan Mudah",
        text: "Masukkan bahan yang kamu punya, biarkan AI bekerja untukmu!",
        active: true,
    },
];

export { foodImgList, foodTagLine };
