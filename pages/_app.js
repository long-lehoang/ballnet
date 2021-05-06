import { Provider } from 'react-redux'
import '../styles/globals.scss'
import { CookiesProvider } from "react-cookie"
import store from '../store'
import '../styles/DateTimePicker.css';
import '../styles/Calendar.css';
import '../styles/Clock.css';

function MyApp({ Component, pageProps }) {
  return (
    <CookiesProvider>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </CookiesProvider>
  )
}

export default MyApp
