import styles from './styles.module.scss';
import CreatePostForm from '../../commons/CreatePostForm'
import Post from '../../commons/Post';
import axios from 'axios';
import { useEffect, useState } from 'react';
import LazyLoad from 'react-lazyload';
import Loading from '../../commons/Loading';
import { POSTS_API } from '../../../config/config';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

function extractData(data, result = []) {
    if (Array.isArray(data))
        data.forEach(element => {
            if (Array.isArray(element))
                element.forEach(subele => {
                    result.push(subele);
                });
            else result.push(element);
        });
    else result.push(data);
    return result;
}

export default function Feed({username, permission}) {
    const token = useSelector(state => state.token)
    const [posts, setPosts] = useState([]);

    useEffect(()=>{
        axios.get(POSTS_API + 'self/' + username, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            setPosts(extractData(response.data.data).sort(function (a, b) {
                let time1 = new Date(a.updated_at);
                let time2 = new Date(b.updated_at);
    
                return time2 - time1;
            }));
        }).catch((error) => {
            console.log(error);
        })

    },[null])

    return (
        <div className={styles.container}>
            {permission ? <div className={styles.row}>
                <CreatePostForm></CreatePostForm>
            </div> : ''}
            {posts.map((element, key) => {
                return (
                    <LazyLoad key={key} height={200} placeholder={<Loading />}>
                        <Post key={key} post={element}></Post>
                    </LazyLoad>
                )
            })}
        </div>
    )
}