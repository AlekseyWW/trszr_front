import { useState, useRef, useEffect } from "react";
import css from "./CategoryItem.module.css";
import Link from "../Link";
import Icon from "../Icon";
import { camelize } from ".";


const CategoryItem = ({ slug, name }) => {
    return (
      <Link
        href="/cat/[category]"
        as={"/cat/" + slug}
        slug={slug}
        activeClassName={css.item_active}
        shallow
      >
        <div className={css.item}>
          <span className={css.inner}>
            <span> {name} </span>
            {slug && <Icon name={camelize(slug)} className={css.icon} />}
          </span>
        </div>
      </Link>
    );
};

export default CategoryItem;