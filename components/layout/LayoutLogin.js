import Head from "next/head";
import styles from "./login.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFutbol } from '@fortawesome/free-solid-svg-icons';

export default function LayoutLogin({children}){
    return (
        <div className={styles.container}>
            <Head>
                <title>BallNet</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <div className={styles.banner}>
                    <div className={styles.title}>
                        <div className={styles.logo}>
                            <FontAwesomeIcon icon={faFutbol}></FontAwesomeIcon>
                        </div>
                        <div className={styles.name}>
                            BallNet
                        </div>
                    </div>
                    <div className={styles.sub_title}>
                        BallNet gắn kết những người chơi thể thao lại với nhau, cùng nhau tạo nên một cộng đồng thể thao lành mạnh.
                    </div>
                    <div className={styles.image}>
                        <img src="/banner.svg" alt=""/>
                    </div>
                </div>
                <div className={styles.form}>
                    {children}
                </div>
            </main>
        </div>
    )
}