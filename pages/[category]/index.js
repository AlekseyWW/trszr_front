import Layout from '../../components/Layout';
import Filter from "../../components/Filter";
import ProductCard from '../../components/ProductCard';
import css from './Category.module.css';
import Container from '../../components/Container';

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

const products = [
  {
    image: "/images/product.png",
    title: "Агритокс, ВК(500 Г/Л)",
    slug: "/udobrenia/agritoks"
  },
  {
    image: "/images/product.png",
    title: "Агритокс, ВК(500 Г/Л)",
    slug: "/udobrenia/agritoks"
  },
  {
    image: "/images/product.png",
    title: "Агритокс, ВК(500 Г/Л)",
    slug: "/udobrenia/agritoks"
  },
  {
    image: "/images/product.png",
    title: "Агритокс, ВК(500 Г/Л)",
    slug: "/udobrenia/agritoks"
  },
  {
    image: "/images/product.png",
    title: "Агритокс, ВК(500 Г/Л)",
    slug: "/udobrenia/agritoks"
  },
  {
    image: "/images/product.png",
    title: "Агритокс, ВК(500 Г/Л)",
    slug: "/udobrenia/agritoks"
  },
  {
    image: "/images/product.png",
    title: "Агритокс, ВК(500 Г/Л)",
    slug: "/udobrenia/agritoks"
  },
  {
    image: "/images/product.png",
    title: "Агритокс, ВК(500 Г/Л)",
    slug: "/udobrenia/agritoks"
  }
]
const Home = () => (
  <Layout title="Точка роста">
    <Container>
      <Filter {...{ pictured, lines }} />
      <div className={css.grid}>
        {products.map((product, id) => (
          <ProductCard key={`prod-${id}`} {...product} />
        ))}
      </div>
      <div className={css.more}>Показать ещё</div>
    </Container>
  </Layout>
);

export default Home;
