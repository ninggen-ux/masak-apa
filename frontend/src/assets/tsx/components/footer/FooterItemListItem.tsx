interface Props {
    ket: string;
    link?: string;
}

export default function FooterItemListItem(props: Props) {
    return props.link ? (
        <a
            className="footer__item__list__item"
            href={props.link}
            target="_blank"
        >
            {props.ket}
        </a>
    ) : (
        <p className="footer__item__list__item">{props.ket}</p>
    );
}
