import { Provider } from 'react-redux'
import '../styles/globals.scss'
import { CookiesProvider } from "react-cookie"
import store from '../store'
import '../styles/DateTimePicker.css';
import '../styles/Calendar.css';
import '../styles/Clock.css';
import { IntlProvider } from 'react-intl';
import { useRouter } from "next/router"

const languages = {
    vi: require('../locale/vi.json'),
    en: require('../locale/en.json')
};
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

function MyApp({ Component, pageProps }) {
    const router = useRouter()
    const { locale, defaultLocale } = router;
    const messages = languages[locale];

    return (
        <CookiesProvider>
            <Provider store={store}>
                <IntlProvider messages={messages} locale={locale} defaultLocale={defaultLocale}>
                    <Component {...pageProps} />
                </IntlProvider>
            </Provider>
        </CookiesProvider>
    )
}

export default MyApp
