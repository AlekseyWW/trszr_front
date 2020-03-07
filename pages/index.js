import Head from 'next/head'
import Logo from '../assets/logo.svg'
import Icon from '../assets/icon.svg'
import Fertilizer from '../assets/fertilizer.svg'
import Protect from '../assets/protect.svg'
import Seed from '../assets/seed.svg'
import { MainCategoriesGroup } from "../components/MainCategory";
import Layout from '../components/Layout'

const colors = {
  yellow: "#FFE711",
  green: "#166C00",
}
const Home = () => (
  <Layout title="Точка роста">
    <MainCategoriesGroup
      items={[
        {
          image: "../images/fertilizer.jpg",
          title: "Удобрения",
          slug: "/ydobrenia",
          Icon: Fertilizer
        },
        {
          image: "../images/protect.jpg",
          title: "Защита растений",
          slug: "zaschita",
          Icon: Protect
        },
        {
          image: "../images/seed.jpg",
          title: "Семена",
          slug: "semena",
          Icon: Seed
        }
      ]}
    />
  </Layout>
);

export default Home
