import { footerData } from "../components/footer/FooterData";
import FooterItemList from "../components/footer/FooterItemList";
import "../../sass/pages/footer.scss";

export default function Footer() {
    const footerItemListMap = footerData.map((item) => {
        return (
            <FooterItemList key={item.id} judul={item.judul} list={item.list} />
        );
    });

    return (
        <div className="footer">
            <div className="footer__item">{footerItemListMap}</div>
            <span className="footer__copyright">© Copyright 2025 MasakApa</span>
        </div>
    );
}
