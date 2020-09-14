import Link from "next/link";
import cx from "classnames";

import css from './ProductCard.module.css';

const ProductCard = ({ name, image, slug, category, manufacturer, loading, className }) =>
  !loading ? (
    <Link href="/cat/[category]/[product]" as={`/cat/${category}/${slug}`}>
      <a className={cx(css.card, className && className)}>
        <span className={css.media}>
          {image ? <img
            className={css.image}
            src={`${process.env.api}/storage/${image}`}
          /> : <span className={css.manufacturer}>{manufacturer}</span>}
        </span>
        <span className={css.name}>
          <span className={css.black}>{name.split(",")[0]}</span>
          <span>{name.split(",")[1]}</span>
        </span>
      </a>
    </Link>
  ) : (
    <div className={`${css.card} ${css.dump}`}>
      <span className={css.image} />
      <span className={css.name}></span>
    </div>
  );

export default ProductCard;