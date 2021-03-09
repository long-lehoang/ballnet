import styles from './styles.module.scss';
import Info from './info';
import CreatePostForm from '../commons/CreatePostForm'
import Post from '../commons/Post';
import StadiumSuggest from '../commons/StadiumSuggest';
import MatchSuggest from '../commons/MatchSuggest';
import FriendSuggest from '../commons/FriendSuggest';
import FriendRequest from '../commons/FriendRequest';
import axios from 'axios';
import { POSTS_API } from '../../config/config';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

function extractData(data,result = []){
    if(Array.isArray(data))
    data.forEach(element => {
        if(Array.isArray(element))
        element.forEach(subele => {
            result.push(subele);
        });
        else result.push(element);
    });
    else result.push(data);
    return result;
}

export default function HomePage(){
    const [posts, setPosts] = useState([]);
    const token = useSelector(state => state.token);
    let data = [];
    useEffect(()=>{
        if(token != ''){
            fetchPosts();
        }
    },[token])
    
    async function fetchPosts(){
        const response = await axios.get(POSTS_API,{
            headers:{
                'Authorization': token
            }
        });
        setPosts(extractData(response.data.data.data));
    }

    return(
        <div className={styles.container}>
            <div className={styles.col_1}>
                <div className={styles.row} >
                    <Info></Info>
                </div>
                <div className={styles.row}>
                    <StadiumSuggest></StadiumSuggest>
                </div>
                <div className={styles.row}>
                    <FriendRequest></FriendRequest>
                </div>
            </div>
            <div className={styles.col_2} >
                <div className={styles.row}>
                    <CreatePostForm></CreatePostForm>
                </div>
                {posts.map(element => {
                    return(
                    <div className={styles.row}>
                        <Post post={element}></Post>
                    </div>
                    )
                })}
                
            </div>
            <div className={styles.col_3}>
                <div className={styles.row}>
                    <MatchSuggest></MatchSuggest>
                </div>
                <div className={styles.row}>
                    <FriendSuggest></FriendSuggest>
                </div>
            </div>
        </div>
    )
}