import queryString from 'query-string';
import { useRouter } from "next/router";
import FilterItem from "./FilterItem";
import FilterItemPicture from "./FilterItemPicture";
import cx from 'classnames';
import css from './Filter.module.css';
import { useEffect, useState } from 'react';
import Axios from 'axios';

const Filter = ({pictured, lines}) => {
    const router = useRouter();
    const [pictures, setPictures] = useState(pictured);
    const { query, search } = router;
    const { category, ...params } = query;
    const onChange = (e) => {
        const { name, value } = e.target
        const arr = params[name] ? params[name].split(",") : [];
        if (arr.indexOf(value) === -1) {
            arr.push(value)
        } else {
            arr.splice(arr.indexOf(value), 1);
        }
        params[name] = arr.join(",");
        router.push(
            `/[category]?${queryString.stringify(params)}`,
            `/${category}?${queryString.stringify(params)}`,
            { shallow: true }
        );
            
    }
    const isActive = (id, name) => {
        return params[name] && params[name].split(",").indexOf(id.toString()) !== -1
    };

    useEffect(() => {
      Axios.get(
        `${process.env.api}/api/categories?${queryString.stringify({ category: query.category})}`
      ).then(res => {
        const { data } = res;
        setPictures(data.data);
      });
    }, [query.category])

    return (
      <div className={css.filter}>
        <div className={css.line}>
          {pictures.map((item, id) => (
            <FilterItemPicture
              isActive={isActive(item.id, "categories")}
              type="categories"
              onChange={onChange}
              key={`item-${id}`}
              {...item}
              link="/"
            />
          ))}
        </div>
        <div className={cx(css.line, css.line_gray)}>
            <div className={cx(css.inner)}>
                {lines.map((item, id) => (
                    <FilterItem
                    type="cultures"
                    isActive={isActive(item.id, "cultures")}
                    onChange={onChange}
                    key={`item-${id}`}
                    {...item}
                    link="/"
                    />
                ))}
            </div>
        </div>
      </div>
    );
}

export default Filter;