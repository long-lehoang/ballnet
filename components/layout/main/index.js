import styles from './styles.module.scss';
import Head from 'next/head';
import Header from '../header';
import MessageBox from '../../commons/MessageBox';
import LoadingBox from '../../commons/LoadingBox';

export default function LayoutMain({ children }) {
    return (
        <div className={styles.container}>
            <Head>
                <title>BallNet</title>
                <link rel="icon" href="/logo.png" />
                <meta name="description" content="Ballnet is social networking for sporter."/>  
            </Head>

            <main className={styles.main}>
                <MessageBox></MessageBox>
                <LoadingBox></LoadingBox>
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