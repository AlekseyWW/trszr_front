import css from './ProductFull.module.css';

const ProductFull = ({ name, image, description }) => (
  <div className={css.product}>
    <div className={css.view}>
      <img src={`http://trszr.ru.test/${image}`} />
    </div>
    <div className={css.info}>
      <h1>{name}</h1>
      <div>{description}</div>
    </div>
  </div>
);

export default ProductFull;