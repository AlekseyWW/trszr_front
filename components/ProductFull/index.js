import css from './ProductFull.module.css';

const ProductFull = ({ title, image, description }) => (
  <div className={css.product}>
    <div className={css.view}>
      <img src={image} />
    </div>
    <div className={css.info}>
      <h1>{title}</h1>
      <div>{description}</div>
    </div>
  </div>
);

export default ProductFull;