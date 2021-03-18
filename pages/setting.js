import LayoutMain from '../components/layout/main'
import checkLogin from '../lib/user'
import { useSelector } from 'react-redux'

export default function Setting() {

    checkLogin();

    return (
        <LayoutMain>
        </LayoutMain>
    )
}