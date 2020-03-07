import Layout from "../../../components/Layout";
import ProductFull from "../../../components/ProductFull";
import Container from "../../../components/Container";

const product = {
  title: "АГРИТОКС",
  image: "/images/product.png",
  description:
    "Предназначен для защиты садов и виноградников, также он прекрасно работает и в качестве партнера в баковых смесях с гербицидами, фунгицидами, инсектицидами и удобрениями на всех других культурах."
};
const Product = () => <Layout title="Точка роста">
    <Container>
        <ProductFull {...product} />
    </Container>
</Layout>;

export default Product;
