import LayoutMain from '../../components/layout/main'
import checkLogin from '../../lib/user'
import { useSelector } from 'react-redux'

export default function Match() {

    checkLogin();

    return (
        <LayoutMain>
        </LayoutMain>
    )
}