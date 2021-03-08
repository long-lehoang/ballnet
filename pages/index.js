import LayoutMain from '../components/layout/main'
import HomePage from '../components/home'
import checkLogin from '../lib/user'
import { useSelector } from 'react-redux'

export default function Home() {

    checkLogin();

    return (
        <LayoutMain>
            <HomePage></HomePage>
        </LayoutMain>
    )
}
