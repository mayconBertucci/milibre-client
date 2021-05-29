import '../styles/globals.scss';

import { Header } from "../components/partials/Header";
import { Footer } from '../components/partials/Footer';
import { UserProvider } from './../contexts/UserContext';
import { UserRegProvider } from '../contexts/UserRegContext';
import { SearchDataProvider } from '../contexts/SearchContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'; 

function MyApp({ Component, pageProps }) {
  return (
      <UserProvider>
        <UserRegProvider>
            <SearchDataProvider>
            <ToastContainer />
                <Header />
                <Component {...pageProps} />
                <Footer />
            </SearchDataProvider>
        </UserRegProvider>
      </UserProvider>
  );
}

export default MyApp
