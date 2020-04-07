import App from 'next/app'
import Axios from "axios";
import '../styles.css';

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps, globalProps }) {
    console.log({ api: process.env.api });
    console.log({ api: process.env.prdod });
    
    return <Component {...pageProps}  {...globalProps} />;
}

MyApp.getInitialProps = async (appContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`;
    const appProps = await App.getInitialProps(appContext);
    const { data: categories } = await Axios.get(
        `${process.env.api}/api/categories?main=true`
    );
    const { data: cultures } = await Axios.get(`${process.env.api}/api/cultures`);
    
    return {
        ...appProps,
        globalProps: {
            categories: categories.data,
            cultures: cultures.data
        }
    };
}
