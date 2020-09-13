import { useState, useEffect, useContext, useCallback } from "react";
import Layout from '../../components/Layout';
import Filter from "../../components/Filter";
import ProductCard from '../../components/ProductCard';
import css from './Search.module.css';
import Container from '../../components/Container';
import Axios from 'axios';
import queryString from "query-string";
import { useRouter } from "next/router";
import parse from "html-react-parser";
import cx from "classnames";
import Icon from '../../components/Icon';
import { Transition } from 'react-transition-group';
import { Map, Placemark } from "react-yandex-maps";
import ContactForm from '../../components/Forms/ContactForm';
import PagesContext from '../../store';
import ContactBlock from "../../components/ContactsBlock";

const duration = 300;

const transitionStyles = {
  entering: css.entering,
  entered: css.entered,
  exiting: css.exiting,
  exited: css.exited,
};


const Search = ({ result, searchText }) => {
  console.log({ result, searchText});
  const [activeType, setActiveType] = useState('')
  const [activeId, setActiveId] = useState('')
  const isOpen = useCallback((type, id) => {
    return type === activeType && id === activeId
  }, [activeType, activeId])

  const onChange = (type, id) => {
    setActiveType(isOpen(type, id) ? '' : type);
    setActiveId(isOpen(type, id) ? '' : id);
  }
  console.log({result: result.substance});
  return (
    <Container className={css.inner}>
      <h1>Поиск</h1>
      <p>Результат поиска по тексту: <b>{searchText}</b></p>
      <div>
        {result && <div>
          <div className={css.block}>
            <h3>Товары:</h3>

            <div className={css.grid}>
            {result.products.map(product => <ProductCard
                  key={`prod-${product.id}`}
                  {...product}
                  category={product.category.parent.slug}
                />)}
            </div>
          </div>
          {result.categories.length > 0 && <div className={css.block}>
            <h3>Категории:</h3>
            {result.categories.map(category => category.products.length > 0 && <div className={css.item}>
                <button onClick={() => onChange('category', category.id)} className={cx(css.button, isOpen('category', category.id) ? css.open : css.close)}>{category.name}</button>
                <div className={cx(css.grid, isOpen('category', category.id) ? css.open : css.close)}>
                {category.products.map(product => <ProductCard
                    key={`prod-${product.id}`}
                    {...product}
                    category={product.category.parent.slug}
                  />)}
                </div>
            </div>)}
          </div>}
          {Object.keys(result.substance).length > 0 && <div className={css.block}>
            <h3>Действуешее вещество:</h3>
            {Object.keys(result.substance).map((key, id) => <div className={css.item}>
                <button onClick={() => onChange('substance', id)} className={cx(css.button, isOpen('substance', id) ? css.open : css.close)}>{key}</button>
                <div className={cx(css.grid, isOpen('substance', id) ? css.open : css.close)}>
                {result.substance[key].map(product => <ProductCard
                    key={`prod-${product.id}`}
                    {...product}
                    category={product.category.parent.slug}
                  />)}
                </div>
            </div>)}
          </div>}
          {result.manufacturers.length > 0 && <div className={css.block}>
            <h3>Производители: </h3>
            {result.manufacturers.map(manufacturer => manufacturer.products.length > 0 && <div className={css.item}>
              <button onClick={() => onChange('manufacturer', manufacturer.id)} className={cx(css.button, isOpen('manufacturer', manufacturer.id) ? css.open : css.close)}>{manufacturer.name}</button>
              <div className={cx(css.grid, isOpen('manufacturer', manufacturer.id) ? css.open : css.close)}>
              {manufacturer.products.map(product => <ProductCard
                  key={`prod-${product.id}`}
                  {...product}
                  category={product.category.parent.slug}
                />)}
              </div>
            </div>)}
          </div>}
          {result.cultures.length > 0 && <div className={css.block}>
            <h3>Культуры:</h3>
            {result.cultures.map(culture => culture.products.length > 0 && <div className={css.item}>
              <button onClick={() => onChange('culture', culture.id)} className={cx(css.button, isOpen('culture', culture.id) ? css.open : css.close)}>{culture.name}</button>
              <div className={cx(css.grid, isOpen('culture', culture.id) ? css.open : css.close)} >
              {culture.products.map(product => <ProductCard
                  key={`prod-${product.id}`}
                  {...product}
                />)}
              </div>
            </div>)}
          </div>}
        </div>}
      </div>
    </Container>
  );
};

Search.getInitialProps = async({query}) => {
  const { data: result } = await Axios.get(`${process.env.api}/api/search?search=${encodeURI(query.search)}`);
  return {
    result,
    searchText: query.search
  };
};

export default Search;
