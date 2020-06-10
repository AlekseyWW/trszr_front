import queryString from 'query-string';
import { useRouter } from "next/router";
import FilterItem from "./FilterItem";
import FilterItemPicture from "./FilterItemPicture";
import cx from 'classnames';
import css from './Filter.module.css';
import { useEffect, useState, useCallback } from 'react';
import Axios from 'axios';
import Swiper from "react-id-swiper";
import Icon from '../Icon';
import { useMemo } from 'react';

const SimpleSwiper = ({ children, slidesPerView, ...props }) => {
  const [swiper, setSwiper] = useState(null);
  const [isEnd, setIsEnd] = useState(true);
  const [isBeginning, setIsBeginning] = useState(true);

  useEffect(() => {
    if (swiper !== null) {
      setIsEnd(swiper.isEnd);
      setIsBeginning(swiper.isBeginning);
      swiper.on("transitionEnd", function () {
        console.log({ swiper});
        
        setIsEnd(swiper.isEnd);
        setIsBeginning(swiper.isBeginning);
      });
    }
  }, [swiper]);

  const goNext = () => {
    if (swiper !== null) {
      swiper.slideNext();
    }
  };

  const goPrev = () => {
    if (swiper !== null) {
      swiper.slidePrev();
    }
  };
  const params = {
    slidesPerView: "auto",
    slideClass: css.slide,
    containerClass: css.container,
    simulateTouch: true,
    ...props,
  };

  const nextClass = cx(css.next, isEnd ? css.hidden_nav : "");
  const prevClass = cx(css.prev, isBeginning ? css.hidden_nav : "");
  
  return (
    <>
      <Swiper getSwiper={setSwiper} {...params}>
        {children}
      </Swiper>
      <button onClick={goPrev} className={prevClass}>
        <Icon name="back" />
      </button>
      <button onClick={goNext} className={nextClass}>
        <Icon name="back" />
      </button>
    </>
  );
};

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
          {pictures.length > 0 && (
            <SimpleSwiper>
              {pictures.map((item, id) => (
                <div>
                  <FilterItemPicture
                    isActive={isActive(item.id, "categories")}
                    type="categories"
                    onChange={onChange}
                    key={`item-${id}`}
                    {...item}
                    loading={loading}
                    link="/"
                  />
                </div>
              ))}
            </SimpleSwiper>
          )}
          {loading && !pictured.length && (
            <FilterItemPicture loading={loading} />
          )}
        </div>
        <div className={cx(css.line, css.line_gray)}>
          <div className={cx(css.inner)}>
            {lines.length > 0 && (
              <SimpleSwiper slidesPerView={6} freeMode>
                {lines.map((item, id) => (
                  <div>
                    <FilterItem
                      type="cultures"
                      isActive={isActive(item.id, "cultures")}
                      onChange={onChange}
                      key={`item-${id}`}
                      {...item}
                      link="/"
                    />
                  </div>
                ))}
              </SimpleSwiper>
            )}
          </div>
        </div>
      </div>
    );
}

export default Filter;