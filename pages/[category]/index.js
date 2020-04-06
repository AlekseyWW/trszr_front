import { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import Filter from "../../components/Filter";
import ProductCard from '../../components/ProductCard';
import css from './Category.module.css';
import Container from '../../components/Container';
import Axios from 'axios';
import queryString from "query-string";
import { useContext } from 'react/cjs/react.production.min';
import { useRouter } from "next/router";
const pictured = [
  {
    title: "Гербициды",
    image: "/images/group.jpg"
  },
  {
    title: "Гербициды",
    image: "/images/group.jpg"
  },
  {
    title: "Гербициды",
    image: "/images/group.jpg"
  },
  {
    title: "Гербициды",
    image: "/images/group.jpg"
  },
  {
    title: "Гербициды",
    image: "/images/group.jpg"
  },
  {
    title: "Гербициды",
    image: "/images/group.jpg"
  },
  {
    title: "Гербициды",
    image: "/images/group.jpg"
  },
]
const lines = [
  {
    title: "Морковь"
  },
  {
    title: "Морковь"
  },
  {
    title: "Морковь"
  },
  {
    title: "Морковь"
  },
  {
    title: "Морковь"
  },
  {
    title: "Морковь"
  },
  {
    title: "Морковь"
  },
  {
    title: "Морковь"
  },
  {
    title: "Морковь"
  },
  {
    title: "Морковь"
  },
  {
    title: "Морковь"
  },
]


const Category = ({ categories, cultures, cats, prods }) => {
  const router = useRouter();
  const [products, setProducts] = useState(prods.data);
  const [currentPage, setCurrentPage] = useState(prods.meta ? prods.meta.current_page : 1);

  const fetchMoreProducts = async () => {
      const { data } = await Axios.get(
        `http://trszr.ru.test/api/products?${router.query}&page=${currentPage + 1}`
      );
      setProducts([...products, ...data.data]);
      setCurrentPage(data.meta.current_page);
  }

  useEffect(() => {
    Axios.get(
      `http://trszr.ru.test/api/products?${queryString.stringify(router.query)}`
    ).then(res => {
      const { data } = res;
      setProducts(data.data);
      setCurrentPage(data.meta ? data.meta.current_page : 1);
    });
  }, [router.query]);
  
  return (
    <Layout categories={categories} title="Точка роста">
      <Container>
        <Filter lines={cultures} pictured={cats} />
        <div className={css.grid}>
          {products && products.map((product, id) => (
            <ProductCard key={`prod-${id}`} {...product} category={router.query.category}/>
          ))}
        </div>
        <button onClick={fetchMoreProducts} className={css.more}>Показать ещё</button>
      </Container>
    </Layout>
  );
};

Category.getInitialProps = async({query}) => {
  const { category: slug, categories, cultures } = query;
  const { data } = await Axios.get( `http://trszr.ru.test/api/categories?${queryString.stringify(query)}` );
  const { data: products } = await Axios.get(
    `http://trszr.ru.test/api/products?${queryString.stringify(query)}`
  );
  
  return {
    cats: data.data,
    prods: products
  };
};

export default Category;
