import { useState, useEffect } from 'react';
import Layout from '../../../components/Layout';
import Filter from "../../../components/Filter";
import ProductCard from '../../../components/ProductCard';
import css from './Category.module.css';
import Container from '../../../components/Container';
import Axios from 'axios';
import queryString from "query-string";
import { useContext } from 'react/cjs/react.production.min';
import { useRouter } from "next/router";
import cx from "classnames";
import Icon from '../../../components/Icon';
import { Transition } from 'react-transition-group';
import ModalWrapper from '../../../components/ModalWrapper';

const duration = 350;

const transitionStyles = {
  entering: css.entering,
  entered: css.entered,
  exiting: css.exiting,
  exited: css.exited,
};


const Category = ({ categories, cultures, cats, prods }) => {
  const router = useRouter();
  const [products, setProducts] = useState(prods.data);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(prods.meta ? prods.meta.current_page : 1);
  const fetchMoreProducts = async () => {
      const { data } = await Axios.get(
        `${process.env.api}/api/products?${queryString.stringify(router.query)}&page=${currentPage + 1}`
      );
      setProducts([...products, ...data.data]);
      setCurrentPage(data.meta.current_page);
  }

  useEffect(() => {
    setLoading(true);
    Axios.get(
      `${process.env.api}/api/products?${queryString.stringify(router.query)}`
    ).then(res => {
      const { data } = res;
      setProducts(data.data);
      setCurrentPage(data.meta ? data.meta.current_page : 1);
      setLoading(false);
    });
  }, [router.query]);

  
  return (
    <Container className={css.container}>
      <Filter lines={cultures} pictured={cats} />
      <div className={css.grid}>
        {!loading &&
          products &&
          products.map((product, id) => (
            <ProductCard
              key={`prod-${id}`}
              {...product}
              category={router.query.category}
            />
          ))}

        {loading && (
          <>
            <ProductCard loading/>
            <ProductCard loading/>
            <ProductCard loading/>
            <ProductCard loading/>
            <ProductCard loading/>
            <ProductCard loading/>
            <ProductCard loading/>
            <ProductCard loading/>
            <ProductCard loading/>
          </>
        )}
      </div>
      {(prods.meta && products.length > 0 &&  prods.meta.total > products.length) && <button onClick={fetchMoreProducts} className={css.more}>
        Показать ещё
      </button>}
    </Container>
  );
};

Category.getInitialProps = async({query}) => {
  const { category: slug, categories, cultures } = query;
  const { data } = await Axios.get( `${process.env.api}/api/categories?${queryString.stringify(query)}` );
  const { data: products } = await Axios.get(
    `${process.env.api}/api/products?${queryString.stringify(query)}`
  );
  
  return {
    cats: data.data,
    prods: products
  };
};

export default Category;
