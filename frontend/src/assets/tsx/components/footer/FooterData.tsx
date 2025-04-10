interface FooterDataItemList {
    id: number;
    ket: string;
    link?: string;
}

interface FooterDataItem {
    id: number;
    judul: string;
    list: FooterDataItemList[];
}

const footerData: FooterDataItem[] = [
    {
        id: 1,
        judul: "ABOUT US",
        list: [
            {
                id: 1,
                ket: "MasakApa merupakan website yang membantu pengguna dalam menentukan menu masakan dengan bahan yang tersedia ",
            },
        ],
    },

    {
        id: 2,
        judul: "CONTACT US",
        list: [
            {
                id: 1,
                ket: "masakapa25@gmail.com",
                link: "mailto:masakapa25@gmail.com",
            },
        ],
    },
];

export { footerData };
