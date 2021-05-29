import styles from './styles.module.scss';
import Info from './info';
import CreatePostForm from '../commons/CreatePostForm'
import Post from '../commons/Post';
import StadiumSuggest from '../commons/StadiumSuggest';
import MatchSuggest from '../commons/MatchSuggest';
import FriendSuggest from '../commons/FriendSuggest';
import FriendRequest from '../commons/FriendRequest';
import { useState } from 'react';
import LazyLoad from 'react-lazyload';
import Loading from '../commons/Loading';

export default function HomePage({ posts }) {
    const [list, setList] = useState(posts);
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
                    <CreatePostForm list={list} setList={setList}></CreatePostForm>
                </div>
                {list.map((element,key) => {
                    return(
                    <LazyLoad key={element.id} height={200} placeholder={<Loading/>}>                       
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