import styles from './styles.module.scss';

export default function MatchSuggest(){
    return(
        <div className={styles.container}>
            <div className={styles.header}>
                <span>Match &#40;suggestion&#41;</span>
            </div>
            <div className={styles.body}>
                <div className={styles.element}>
                    <div className={styles.team}>
                        <img src="/logo_team" className={styles.logo}></img>
                        <span className={styles.member}>5/7</span>
                        <span>:</span>
                        <span className={styles.member}>5/7</span>
                        <img src="/logo_team" className={styles.logo}></img>
                    </div>
                    <div className={styles.time}>
                        <span>Tomorrow, 20:00 UTC+07</span>
                    </div>
                    <div className={styles.location}>
                        <span>Phu Tho Stadium</span>
                    </div>
                    <div className={styles.type}>
                        <span>Bong Da &#40;5 vs 5&#41;</span>
                    </div>
                    <div className={styles.btn}>
                        <button className={styles.btnJoin}>Join</button>
                        <button className={styles.btnShare}>Share</button>
                    </div>
                </div>

                <div className={styles.element}>
                    <div className={styles.team}>
                        <img src="/logo_team" className={styles.logo}></img>
                        <span className={styles.member}>5/7</span>
                        <span>:</span>
                        <span className={styles.member}>5/7</span>
                        <img src="/logo_team" className={styles.logo}></img>
                    </div>
                    <div className={styles.time}>
                        <span>Tomorrow, 20:00 UTC+07</span>
                    </div>
                    <div className={styles.location}>
                        <span>Phu Tho Stadium</span>
                    </div>
                    <div className={styles.type}>
                        <span>Bong Da &#40;5 vs 5&#41;</span>
                    </div>
                    <div className={styles.btn}>
                        <button className={styles.btnJoin}>Join</button>
                        <button className={styles.btnShare}>Share</button>
                    </div>
                </div>

                <div className={styles.element}>
                    <div className={styles.team}>
                        <img src="/logo_team" className={styles.logo}></img>
                        <span className={styles.member}>5/7</span>
                        <span>:</span>
                        <span className={styles.member}>5/7</span>
                        <img src="/logo_team" className={styles.logo}></img>
                    </div>
                    <div className={styles.time}>
                        <span>Tomorrow, 20:00 UTC+07</span>
                    </div>
                    <div className={styles.location}>
                        <span>Phu Tho Stadium</span>
                    </div>
                    <div className={styles.type}>
                        <span>Bong Da &#40;5 vs 5&#41;</span>
                    </div>
                    <div className={styles.btn}>
                        <button className={styles.btnJoin}>Join</button>
                        <button className={styles.btnShare}>Share</button>
                    </div>
                </div>
            </div>
        </div>
    )
}