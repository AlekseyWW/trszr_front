import css from "./Filter.module.css";

const FilterItemPicture = ({ title, image }) => (
  <div className={css.item}>
    <img className={css.image} src={image} />
    <span className={css.title}>{title}</span>
  </div>
);

export default FilterItemPicture;