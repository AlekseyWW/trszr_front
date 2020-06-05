import { useState, useEffect, useContext } from "react";
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
          {result.categories.map(category => category.products.length > 0 && <div className={css.block}>
            <h3>Категория: {category.name}</h3>
            <div className={css.grid}>
            {category.products.map(product => <ProductCard
                key={`prod-${product.id}`}
                {...product}
                category={product.category.parent.slug}
              />)}
              </div>
          </div>)}
          {result.manufacturers.map(manufacturer => manufacturer.products.length > 0 && <div className={css.block}>
            <h3>Производитель: {manufacturer.name}</h3>
            <div className={css.grid}>
            {manufacturer.products.map(product => <ProductCard
                key={`prod-${product.id}`}
                {...product}
                category={product.category.parent.slug}
              />)}
            </div>
          </div>)}
          {result.cultures.map(culture => culture.products.length > 0 && <div className={css.block}>
            <h3>Культура: {culture.name}</h3>
            <div className={css.grid}>
            {culture.products.map(product => <ProductCard
                key={`prod-${product.id}`}
                {...product}
              />)}
            </div>
          </div>)}
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
