import FooterItemListItem from "./FooterItemListItem";

interface Props {
    judul: string;
    list: {
        id: number;
        ket: string;
        link?: string;
    }[];
}

export default function FooterItemList(props: Props) {
    const footerItemListItemMap = props.list.map((item) => {
        return (
            <FooterItemListItem key={item.id} ket={item.ket} link={item.link} />
        );
    });

    return (
        <div className="footer__item__list">
            <h2 className="footer__item__list__judul">{props.judul}</h2>
            {footerItemListItemMap}
        </div>
    );
}
