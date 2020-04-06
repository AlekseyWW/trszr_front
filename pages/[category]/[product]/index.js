import Layout from "../../../components/Layout";
import ProductFull from "../../../components/ProductFull";
import Container from "../../../components/Container";
import Axios from "axios";


const Product = ({ categories, product }) => (
  <Layout categories={categories} title="Точка роста">
    <Container>
      <ProductFull {...product} />
    </Container>
  </Layout>
);

Product.getInitialProps = async ({ query }) => {
  const { product, categories, cultures } = query;
  // const { data } = await Axios.get(
  //   `http://trszr.ru.test/api/categories?${queryString.stringify(query)}`
  // );
  const url = `http://trszr.ru.test/api/products/${product}`
  const { data: {data} } = await Axios.get(url);
  console.log({ data });
  
  return {
    product: data,
  };
};

export default Product;
