import { BallBeat } from 'react-pure-loaders';
import { useSelector } from 'react-redux';
export default function LoadingBox() {
    const loading = useSelector(state=>state.loading);
    return (
        <div>
            <BallBeat
                color={'#123abc'}
                loading={loading}
            />
        </div>
    )
}