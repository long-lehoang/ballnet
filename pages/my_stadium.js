import LayoutMain from '../components/layout/main'
import { parseCookies } from '../lib/cookie'

export default function MyStadium() {
    return (
        <LayoutMain>
        </LayoutMain>
    )
}

MyStadium.getInitialProps = async ({ req, res, next }) => {
    const data = parseCookies(req).user
    if (res) {
        if ((data === undefined) || (Object.keys(data).length === 0 && data.constructor === Object)) {
            res.writeHead(301, { Location: "/login", 'Cache-Control': 'no-cache' })
            res.end()
        }
    }
    const user = JSON.parse(data || '')
    return {}
}