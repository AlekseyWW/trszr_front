import App from 'next/app'
import Axios from "axios";
import '../styles.css';
import PagesContext from '../store';
import Layout from '../components/Layout';
import "swiper/css/swiper.css";
import { Provider } from '../components/Modal';
import { YMaps } from "react-yandex-maps";
import { useContext, useEffect } from 'react';

class Props {
  data = null;
  getData() {
    return this.data
  }
  set(data) {
    this.data = data
  }
};
const siteProps = new Props();
export default function MyApp({ Component, pageProps, globalProps, isServer }) {
    useEffect(() => {
      siteProps.set(globalProps)
    }, [])
    return (
      <PagesContext.Provider value={globalProps}>
        <Provider>
          <YMaps>
            <Layout>
              <Component {...pageProps} {...globalProps} isServer={isServer} />
            </Layout>
          </YMaps>
        </Provider>
      </PagesContext.Provider>
    );
}

MyApp.getInitialProps = async (appContext) => {
    const appProps = await App.getInitialProps(appContext);
    let globalProps = siteProps.getData();
    if (!globalProps) {
      const { data: { categories } } = await Axios.get(
          `${process.env.api}/api/categories?main=true`
      );

      const { data: pages } = await Axios.get(
          `${process.env.api}/api/pages`
      );
      const { data: settings } = await Axios.get(
          `${process.env.api}/api/settings`
      );
  
      const { data: cultures } = await Axios.get(`${process.env.api}/api/cultures`);
      const settingsObject = {};
      settings.data.forEach(item => {
        settingsObject[item.key.split('.')[1]] = item.value;
      })
      globalProps = {
        categories: categories,
        cultures: cultures.data,
        pages: pages.data,
        settings: settingsObject,
      }
    }
    
    return {
      ...appProps,
      isServer: !process.browser,
      globalProps
    };
}
