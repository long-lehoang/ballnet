import { Provider } from 'react-redux'
import '../styles/globals.scss'
import store from '../store'

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
