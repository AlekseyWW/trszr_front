import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import Fertilizer from "../../assets/fertilizer.svg";
import Protect from "../../assets/protect.svg";
import Seed from "../../assets/seed.svg";

import Logo from "../../assets/logo.svg";
import Icon from "../../assets/icon.svg";
import css from './Layout.module.css';

const Layout = ({ children, title }) => {
  const router = useRouter();
  console.log({ router });
  const isHomePage = router.pathname === '/';
  return (
    <div className={css.container}>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className={css.header}>
          <div>
            <div className={css.hamburger}>
              <i className={css.hamburger__item}></i>
              <i className={css.hamburger__item}></i>
              <i className={css.hamburger__item}></i>
            </div>
          </div>
          {isHomePage ? (
            <>
              <div className={css.icon}>
                <Icon />
              </div>
              <div className={css.logo}>
                <Link href="/">
                  <a>
                    <Logo />
                  </a>
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className={css.categories}>
                <Link href="/cat">
                  <div className={css.categories__item}>
                    <span> Удобрения </span>
                    <Fertilizer />
                  </div>
                </Link>
                <Link href="/cat">
                  <div className={css.categories__item}>
                    <span> Защита растений </span>
                    <Protect />
                  </div>
                </Link>
                <Link href="/cat">
                  <div className={css.categories__item}>
                    <span> Семена </span>
                    <Seed />
                  </div>
                </Link>
              </div>
              <div className={css.icon}>
                <Icon />
              </div>
            </>
          )}
        </div>
        {children}
      </main>
      <footer></footer>
    </div>
  );
}

export default Layout;