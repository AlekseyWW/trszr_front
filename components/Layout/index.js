import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import css from './Layout.module.css';
import Header from "../Header";
import Menu from "../Menu";

const Layout = ({ children, title, categories, cultures }) => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isHomePage = router.pathname === "/";

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }
  console.log({ categories});
  
  return (
    <div className={css.container}>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header
          isHomePage={isHomePage}
          toggleMenu={toggleMenu}
          categories={categories}
        />
        {children}
      </main>
      <Menu in={isMenuOpen} toggleMenu={toggleMenu} categories={categories} cultures={cultures} />
      <footer></footer>
    </div>
  );
};

export default Layout;