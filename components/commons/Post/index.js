import { faClock, faComment, faEllipsisV, faHeart, faShare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './styles.module.scss';
import Comment from './Comment'
import { useState } from 'react';
export default function Post(){
    const [comment, toggleComment] = useState(false);

    return(
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.col}>
                    <div className={styles.avatar}>
                        <img src="/avatar.jpg"></img>
                    </div>
                    <div className={styles.text}>
                        <div className={styles.name}>
                            <span>Le Hoang Long</span>
                        </div>
                        <div className={styles.time}>
                            <FontAwesomeIcon icon={faClock} className={styles.iconTime}></FontAwesomeIcon>
                            <span className={styles.text}>5 min ago</span>
                        </div>
                    </div>
                </div>
                <div className={styles.col}>
                    <button className={styles.btn}><FontAwesomeIcon icon={faEllipsisV}></FontAwesomeIcon></button>
                </div>
            </div>
            <div className={styles.body}>
                <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam luctus hendrerit metus, ut ullamcorper quam finibus at. Etiam id magna sit amet...</span>
            </div>
            <hr></hr>
            <div className={styles.reaction}>
                <div className={styles.col}>
                    <div className={styles.like}>
                        <button>
                            <FontAwesomeIcon icon={faHeart} className={styles.iconLike}></FontAwesomeIcon>
                            <span className={styles.txtLike}>Like 20</span>
                        </button>
                    </div>
                    <div className={comment ? styles.activeComment : styles.comment}>
                        <button onClick={()=>{toggleComment(!comment)}}>
                            <FontAwesomeIcon icon={faComment} className={styles.iconComment}></FontAwesomeIcon>
                            <span className={styles.txtComment}>Comment 20</span>
                        </button>
                    </div>
                </div>
                <div className={styles.col}>
                    <button className={styles.share}>
                        <FontAwesomeIcon icon={faShare} className={styles.iconShare}></FontAwesomeIcon>
                        <span className={styles.txtShare}>Share 20</span>
                    </button>
                </div>

            </div>
            {comment ? <Comment/> : <div></div>}
        </div>
    )
}