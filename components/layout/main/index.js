import styles from './styles.module.scss';
import Head from 'next/head';
import Header from '../header';

export default function LayoutMain({children}){
    return (
        <div className={styles.container}>
            <Head>
                <title>BallNet</title>
                <link rel="icon" href="/logo.png" />
            </Head>

            <main className={styles.main}>
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