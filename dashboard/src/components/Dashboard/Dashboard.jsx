import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import Cookies from 'universal-cookie';
import styles from './Dashboard.module.css'

const cookies = new Cookies();

export const Dashboard = ({ title, children }) => {

    const closeSession = () => {
        cookies.remove('id', { path: "/", sameSite: "lax" });
        cookies.remove('name', { path: "/", sameSite: "lax" });
        cookies.remove('username', { path: "/", sameSite: "lax" });
        cookies.remove('email', { path: "/", sameSite: "lax" });
        window.location.href='./';
    }

    useEffect(() => {
        if(!cookies.get('username')) {
            window.location.href='./';
        }
    })

    return (
        <div className={styles.gridContainer}>
            <header className={styles.header}>
                <div>
                    <h6>{ title }</h6>
                    <h1>{ children }</h1>
                </div>
                <Link
                    className={styles.closeSession} 
                    onClick={closeSession} 
                    to="./"
                >
                    Cerrar Sesion
                </Link>
            </header>
            <nav className={styles.navbar}>NAVBAR</nav>
            <aside className={styles.sidebar}>SIDEBAR</aside>
            <article className={styles.main}>MAIN</article>
            <footer className={styles.footer}>FOOTER</footer>
        </div>
    )
}
