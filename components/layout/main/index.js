import styles from './styles.module.scss';
import Head from 'next/head';
import Header from '../header';
import MessageBox from '../../commons/MessageBox';
import { FormattedMessage } from 'react-intl';

export default function LayoutMain({ children }) {
    return (
        <div className={styles.container}>
            <Head>
                <title>BallNet</title>
                <link rel="icon" href="/logo.png" />
            </Head>

            <main className={styles.main}>
                <MessageBox></MessageBox>
                <header className={styles.header}>
                    <Header></Header>
                </header>
                <div className={styles.body}>
                    {children}
                </div>
            </main>
        </div>
    )
}