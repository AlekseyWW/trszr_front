import css from './ProductFull.module.css';

const ProductFull = ({ name, image, description, ...props }) => {
  console.log({ props});
  
  return (
    <div className={css.product}>
      <div className={css.view}>
        <img src={`http://trszr.ru.test/${image}`} />
      </div>
      <div className={css.info}>
        <h1>{name}</h1>
        <div className={css.block}>
          <p>{description}</p>
        </div>
        <div className={css.block}>
          <h3>Состав: </h3>
          <p>{props.consist}</p>
        </div>
        <div className={css.block}>
          <h3>Фасовка: </h3>
          <p>{props.packing}</p>
        </div>
        <div className={css.block}>
          <h3>Расход: </h3>
          <p>{props.rate}</p>
        </div>
        <div className={css.block}>
          <h3>Производитель: </h3>
          <p>{props.manufacturer}</p>
        </div>
        <div className={css.block}>
          <h3>Категория: </h3>
          <p>{props.category}</p>
        </div>
      </div>
    </div>
  )
};

export default ProductFull;