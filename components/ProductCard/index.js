import Link from "next/link";

import css from './ProductCard.module.css';

const ProductCard = ({ name, image, slug, category }) => (
  <Link href="/[category]/[product]" as={`${category}/${slug}`}>
    <a className={css.card}>
      <img className={css.image} src={`${process.env.api}/${image}`} />
      <span className={css.name}>
        <span className={css.black}>{name.split(",")[0]}</span>
        <span>
          {name.split(",")[1]}
        </span>
      </span>
    </a>
  </Link>
);

export default ProductCard;