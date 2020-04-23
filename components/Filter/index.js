import queryString from 'query-string';
import { useRouter } from "next/router";
import FilterItem from "./FilterItem";
import FilterItemPicture from "./FilterItemPicture";
import cx from 'classnames';
import css from './Filter.module.css';
import { useEffect, useState, useCallback } from 'react';
import Axios from 'axios';

const Filter = ({pictured, lines}) => {
    const router = useRouter();
    const [pictures, setPictures] = useState(pictured);
    const [loading, setLoading] = useState(false);
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
            `/cat/[category]?${queryString.stringify(params)}`,
            `/cat/${category}?${queryString.stringify(params)}`,
            { shallow: true }
        );
            
    }
    const isActive = useCallback((id, name) => {
        return params[name] && params[name].split(",").indexOf(id.toString()) !== -1
    }, [params]);

    useEffect(() => {
      setLoading(true);
      Axios.get(
        `${process.env.api}/api/categories?${queryString.stringify({ category: query.category})}`
      ).then(res => {
        const { data } = res;
        setPictures(data.data);
        setLoading(false);
      });
    }, [query.category]);
    
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
              loading={loading}
              link="/"
            />
          ))}
          {loading && !pictured.length && (
              <FilterItemPicture loading={loading} />
          )}
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