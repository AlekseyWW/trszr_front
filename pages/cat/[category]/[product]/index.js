import Layout from "../../../../components/Layout";
import ProductFull from "../../../../components/ProductFull";
import Container from "../../../../components/Container";
import Axios from "axios";


const Product = ({ categories, product, cultures, isServer }) => (
    <Container>
      <ProductFull {...product} isServer={isServer} />
    </Container>
);

Product.getInitialProps = async ({ query }) => {
  const { product, categories, cultures } = query;
  const url = `${process.env.api}/api/products/${product}`;
  const { data: {data} } = await Axios.get(url);
  return {
    product: data,
  };
};

export default Product;
