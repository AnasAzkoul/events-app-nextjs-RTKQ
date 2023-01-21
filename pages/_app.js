import Head from 'next/head';
import { store } from '../app/store';
import { Provider } from 'react-redux';
import { useSelector } from 'react-redux';

import Layout from '../components/layout/layout';
import Notification from '../components/ui/Notification';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  

  // console.log(title, message, status, isOpen);

  return (
    <Provider store={store}>
      <Layout>
        <Head>
          <title>Next Events</title>
          <meta name='description' content='NextJS Events' />
          <meta
            name='viewport'
            content='initial-scale=1.0, width=device-width'
          />
        </Head>
        <Component {...pageProps} />
        {/* <Notification title='Test' message='This is a Test' status='pending'/> */}
      </Layout>
    </Provider>
  );
}

export default MyApp;
