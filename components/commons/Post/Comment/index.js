import styles from './styles.module.scss';

export default function Comment(){
    return(
        <div className={styles.comments}>
            <hr></hr>
            <div className={styles.input}>
                <img src="/avatar.jpg"></img>
                <input placeholder="Type a comment"></input>
            </div>
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