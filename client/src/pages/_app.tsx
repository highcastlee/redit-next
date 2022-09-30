import '../styles/globals.css';

import type { AppProps } from 'next/app';
import { AuthProvider } from '../context/auth';
import Axios from 'axios';
import NavBar from '../components/NavBar';
import { useRouter } from 'next/router';
import { SWRConfig } from 'swr';
import axios from 'axios';

function MyApp({ Component, pageProps }: AppProps) {
  Axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL + '/api';
  Axios.defaults.withCredentials = true;

  const { pathname } = useRouter();
  const authRoutes = ['/register', '/login'];
  const authRoute = authRoutes.includes(pathname);

  const fetcher = async (url: string) => {
    try {
      const res = await axios.get(url);
      return res.data;
    } catch (error: any) {
      throw error.response.data;
    }
  };

  return (
    <>
      <SWRConfig value={{ fetcher }}>
        <AuthProvider>
          {!authRoute && <NavBar />}
          <div className={authRoute ? '' : 'pt-12 bg-gray-200 min-h-screen'}>
            <Component {...pageProps} />
          </div>
        </AuthProvider>
      </SWRConfig>
    </>
  );
}

export default MyApp;
