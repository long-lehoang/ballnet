import LayoutLogin from "../components/layout/login";
import LoginForm from "../components/login";
import { parseCookies } from "../lib/cookie";

export default function Login() {
    return (
        <LayoutLogin>
            <LoginForm />
        </LayoutLogin>
    );
}

Login.getInitialProps = async ({ req, res }) => {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

    const data = parseCookies(req).user
    if (res) {
        if (!((data === undefined) || (Object.keys(data).length === 0 && data.constructor === Object))) {
            res.writeHead(301, { Location: "/", 'Cache-Control': 'no-cache' })
            res.end()
        }
    }
    return {

    }
}