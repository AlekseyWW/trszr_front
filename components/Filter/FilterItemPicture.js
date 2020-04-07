import css from "./Filter.module.css";
import Link from "next/link";
import cx from "classnames";


const FilterItemPicture = ({ name, image, id, onChange, type, isActive }) => (
  <button
    onClick={onChange}
    type="button"
    value={id}
    name={type}
    className={cx(css.item, { [css.item_active]: isActive })}
  >
    <img className={css.image} src={`${process.env.api}/${image}`} />
    <span className={css.title}>{name}</span>
  </button>
);

export default FilterItemPicture;