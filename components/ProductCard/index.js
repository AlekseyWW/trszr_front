import Link from "next/link";

import css from './ProductCard.module.css';

const ProductCard = ({ title, image, slug }) => (
  <Link href="/[category]/[product]" as={slug}>
    <a className={css.card}>
      <img className={css.image} src={image} />
      <span className={css.title}>
        <span className={css.black}>{title.split(",")[0]}</span>
        <span>{title.split(",")[1]}</span>
      </span>
    </a>
  </Link>
);

export default ProductCard;