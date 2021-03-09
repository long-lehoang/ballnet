import styles from './styles.module.scss';
import Info from './info';
import CreatePostForm from '../commons/CreatePostForm'
import Post from '../commons/Post';
import StadiumSuggest from '../commons/StadiumSuggest';
import MatchSuggest from '../commons/MatchSuggest';
import FriendSuggest from '../commons/FriendSuggest';
import FriendRequest from '../commons/FriendRequest';
import CreateForm from '../commons/CreatePostForm/CreateForm';
import axios from 'axios';
import { POSTS_API } from '../../config/config';

function extractData(data){
    if (is_array(data))
    data.forEach(element => {
        extractData(element);
    });
    return 
}

export default function HomePage(){
    // let data;
    // axios.get(POSTS_API).then((response)=>{
    //     data = response.data.data;
    // });
    // data.forEach(element => {
    
    // });
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
                    <CreateForm></CreateForm>
                </div>
                <div className={styles.row}>
                    <CreatePostForm></CreatePostForm>
                </div>
                <div className={styles.row}>
                    <Post></Post>
                </div>
                <div className={styles.row}>
                    <Post></Post>
                </div>
                <div className={styles.row}>
                    <Post></Post>
                </div>
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