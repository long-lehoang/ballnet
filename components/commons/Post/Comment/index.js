import { useState } from 'react';
import { useSelector } from 'react-redux';
import { AVATAR, HOST } from '../../../../config/config';
import styles from './styles.module.scss';

export default function Comment(props){
    const profile = useSelector(state => state.profile);
    const [comment, setComment] = useState();

    return(
        <div className={styles.comments}>
            <hr></hr>
            <form className={styles.input} onSubmit={(event)=>{
                    event.preventDefault();
                    props.handleComment(comment);
                    setComment("");
                }}>
                <img src={profile.avatar == null ? AVATAR : HOST+profile.avatar} className={styles.avatar}></img>
                <input placeholder="Type a comment" value={comment} onChange={(event)=>{setComment(event.target.value)}}></input>
            </form>
            <div className={styles.comment}>
                <img src="/avatar.jpg" className={styles.avatar}></img>
                <div className={styles.content}>
                    <div className={styles.group}>
                        <div className={styles.name}>Lee Hoang Long</div>
                        <div className={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam luctus hendrerit metus, ut ullamcorper quam finibus at. Etiam id magna sit amet...</div>
                    </div>

                </div>
            </div>
        </div>
    )
}