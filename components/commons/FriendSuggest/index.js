import Link from 'next/link';
import styles from './styles.module.scss';

export default function FriendSuggest(){
    return(
        <div className={styles.container}>
            <div className={styles.header}>
                <span>Friends &#40;suggestion&#41;</span>
            </div>
            <div className={styles.body}>
                <div className={styles.element}>
                    <div className={styles.col}>
                        <div className={styles.avatar}>
                            <img src="/avatar.jpg"></img>                   
                        </div>
                        <div className={styles.description}>
                            <div className={styles.name}>
                                <Link href="/long-lehoang"><span>Le Hoang Long</span></Link>
                            </div>
                            <div className={styles.location}>
                                <span>TP.Ho Chi Minh</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.col}>
                        <button className={styles.btn}>+</button>
                    </div>
                </div>  

                <div className={styles.element}>
                    <div className={styles.col}>
                        <div className={styles.avatar}>
                            <img src="/avatar.jpg"></img>                   
                        </div>
                        <div className={styles.description}>
                            <div className={styles.name}>
                                <Link href="/long-lehoang"><span>Le Hoang Long</span></Link>
                            </div>
                            <div className={styles.location}>
                                <span>TP.Ho Chi Minh</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.col}>
                        <button className={styles.btn}>+</button>
                    </div>
                </div> 

                <div className={styles.element}>
                    <div className={styles.col}>
                        <div className={styles.avatar}>
                            <img src="/avatar.jpg"></img>                   
                        </div>
                        <div className={styles.description}>
                            <div className={styles.name}>
                                <Link href="/long-lehoang"><span>Le Hoang Long</span></Link>
                            </div>
                            <div className={styles.location}>
                                <span>TP.Ho Chi Minh</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.col}>
                        <button className={styles.btn}>+</button>
                    </div>
                </div> 

                <div className={styles.element}>
                    <div className={styles.col}>
                        <div className={styles.avatar}>
                            <img src="/avatar.jpg"></img>                   
                        </div>
                        <div className={styles.description}>
                            <div className={styles.name}>
                                <Link href="/long-lehoang"><span>Le Hoang Long</span></Link>
                            </div>
                            <div className={styles.location}>
                                <span>TP.Ho Chi Minh</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.col}>
                        <button className={styles.btn}>+</button>
                    </div>
                </div> 

                <div className={styles.element}>
                    <div className={styles.col}>
                        <div className={styles.avatar}>
                            <img src="/avatar.jpg"></img>                   
                        </div>
                        <div className={styles.description}>
                            <div className={styles.name}>
                                <Link href="/long-lehoang"><span>Le Hoang Long</span></Link>
                            </div>
                            <div className={styles.location}>
                                <span>TP.Ho Chi Minh</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.col}>
                        <button className={styles.btn}>+</button>
                    </div>
                </div>               
            </div>
        </div>
    )
}