import css from "./Filter.module.css";
import Link from "next/link";
import cx from "classnames";


const FilterItemPicture = ({
  name,
  image,
  id,
  onChange,
  type,
  isActive,
  loading,
}) => (
  <button
    onClick={onChange}
    type="button"
    value={id}
    name={type}
    className={cx(css.item, {
      [css.item_active]: isActive,
      [css.loading]: loading,
    })}
  >
    <span className={css.image}>
      <img src={`${process.env.api}/storage/${image}`} />
    </span>
    <span className={css.title}>{name || '          '}</span>
  </button>
);

export default FilterItemPicture;