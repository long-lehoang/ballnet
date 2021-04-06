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
import Loading from '../commons/Loading';

export default function HomePage({ posts }) {
    return (
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
                {posts.map((element,key) => {
                    return(
                    <LazyLoad key={key} height={200} placeholder={<Loading/>}>                       
                        <Post key={key} post={element}></Post>
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