import Head from "next/head";
import styles from "./styles.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFutbol } from '@fortawesome/free-solid-svg-icons';
import { FormattedMessage } from "react-intl";
import MessageBox from '../../commons/MessageBox';
import LoadingBox from '../../commons/LoadingBox';

export default function LayoutLogin({ children }) {
    return (
        <div className={styles.container}>
            <Head>
                <title>BallNet</title>
                <link rel="icon" href="/logo.png" />
            </Head>

            <main className={styles.main}>
                <MessageBox></MessageBox>
                <LoadingBox></LoadingBox>
                <div className={styles.banner}>
                    <div className={styles.title}>
                        <div className={styles.logo}>
                            <FontAwesomeIcon icon={faFutbol}></FontAwesomeIcon>
                        </div>
                        <div className={styles.name}>
                            <FormattedMessage id="BallNet" />
                        </div>
                    </div>
                    <div className={styles.sub_title}>
                        <FormattedMessage id="Slogan" />
                    </div>
                    <div className={styles.image}>
                        <img src="/banner.svg" alt="" />
                    </div>
                </div>
                <div className={styles.form}>
                    {children}
                </div>
            </main>
        </div>
    )
}