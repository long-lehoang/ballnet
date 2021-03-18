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
import LazyLoad from 'react-lazyload';

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

    useEffect(()=>{
        const token = localStorage.getItem('access_token');
        axios.get(POSTS_API,{
            headers:{
                'Authorization': token
            }
        }).then((response)=>{
            setPosts(extractData(response.data.data.data).sort(function(a, b) {
                let time1 = new Date(a.updated_at);
                let time2 = new Date(b.updated_at);

                return time2 - time1;
              })
            );
        }).catch((error)=>{
            console.log(error);
        })
    },[false]);

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
                    <LazyLoad key={element.id} placeholder="Loading...">                       
                        <Post key={element.id} post={element}></Post>
                    </LazyLoad>
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