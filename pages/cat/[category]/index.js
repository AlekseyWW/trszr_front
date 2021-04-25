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
import { CSSTransition, TransitionGroup } from "react-transition-group";
const duration = 350;

const transitionStyles = {
  entering: css.entering,
  entered: css.entered,
  exiting: css.exiting,
  exited: css.exited,
};


const Category = ({ categories, cultures, cats, prods, price }) => {
  const router = useRouter();
  const [products, setProducts] = useState(prods.data);
  const [curQuery, setCurQuery] = useState(router.query);
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
    if (curQuery !== router.query) {
      setLoading(true);
      Axios.get(
        `${process.env.api}/api/products?${queryString.stringify(router.query)}`
      ).then(res => {
        const { data } = res;
        setProducts(data.data);
        setCurQuery(router.query);
        setCurrentPage(data.meta ? data.meta.current_page : 1);
        setLoading(false);
      });
    }
  }, [router.query]);

  return (
    <Container className={css.container}>
      <Filter lines={curQuery.category === 'sem' ? [] : cultures} pictured={cats || []} />
      <TransitionGroup className={css.grid}>
        {products.map((product, id) => (
          <CSSTransition
            key={product.id}
            timeout={175}
            className={css.item}
            classNames={{
              appear: css.item_appear,
              appearActive: css.item_active_appear,
              appearDone: css.item_done_appear,
              enter: css.item_enter,
              enterActive: css.item_active_enter,
              enterDone: css.item_done_enter,
              exit: css.item_exit,
              exitActive: css.item_active_exit,
              exitDone: css.item_done_exit,
            }}
          >
            <li>
              <ProductCard
                // loading={loading}
                {...product}
                category={router.query.category}
              />
            </li>
          </CSSTransition>
        ))}
      </TransitionGroup>
      {/* 
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
        )} */}
      {prods.meta && products.length > 0 && prods.meta.total > products.length && (
        <button onClick={fetchMoreProducts} className={css.more}>
          Показать ещё
        </button>
      )}
    </Container>
  );
};

Category.getInitialProps = async({query}) => {
  const { data: { categories: cats, price } } = await Axios.get( `${process.env.api}/api/categories?${queryString.stringify(query)}` );
  const { data: products } = await Axios.get(
    `${process.env.api}/api/products?${queryString.stringify(query)}`
  );
  return {
    cats: cats,
    price: price,
    prods: products
  };
};

export default Category;
