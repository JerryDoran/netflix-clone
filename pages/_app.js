import '../styles/globals.css';
import { AuthContextProvider } from '../context/AuthContext';
import { RecoilRoot } from 'recoil';

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <AuthContextProvider>
        <Component {...pageProps} />
      </AuthContextProvider>
    </RecoilRoot>
  );
}

export default MyApp;
