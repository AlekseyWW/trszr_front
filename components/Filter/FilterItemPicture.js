import { useState, useEffect} from 'react';
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
}) => {

  const [active, setActive] = useState(false);
  
  const onMouseUp = () => {
    setActive(false)
  }

  useEffect(() => {
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mouseup', onMouseUp);
    }
  }, []);

  const onMouseDown = () => {
    setActive(true)
  }



  return (
    <button
      onClick={onChange}
      type="button"
      value={id}
      name={type}
      onTouchStart={onMouseDown}
      onMouseDown={onMouseDown}
      className={cx(css.item, {
        [css.item_active]: isActive,
        [css.item_press]: active,
        [css.loading]: loading,
      })}
    >
      <span className={css.image}>
        <img src={`${process.env.api}/storage/${image}`} />
      </span>
      <span className={css.title}>{name || '          '}</span>
    </button>
  )
};

export default FilterItemPicture;