import { Link, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Monitor } from "../Monitor/Monitor.jsx";
import { AverageOfMeasurementsDuringTheDay } from '../AverageOfMeasurements/AverageOfMeasurementsDuringTheDay.jsx';
import { Menu } from '../Menu/Menu.jsx';
import { Main } from '../Main/Main.jsx';
import { useModuleContext } from '../Provider/ModuleProvider';
import Cookies from 'universal-cookie';
import styles from './Dashboard.module.css'

const cookies = new Cookies();

export const Dashboard = ({ title, children }) => {
    const [ user, setUser ] = useState("user");
    const module = useModuleContext();

    const closeSession = () => {
        cookies.remove('id', { path: "/", sameSite: "lax" });
        cookies.remove('name', { path: "/", sameSite: "lax" });
        cookies.remove('username', { path: "/", sameSite: "lax" });
        cookies.remove('email', { path: "/", sameSite: "lax" });
        cookies.remove('userType', { path: "/", sameSite: "lax" });
            
        setUser(null);
    }

    useEffect(() => {
        if(user) {
            
            {!user && <Navigate to="/" state={user} replace={true} />}
        }
    }, [])

    return (
        <div className={styles.gridContainer}>
            {!user && <Navigate to="/" state={user} replace={true} />}
            <header className={styles.header}>
                <div>
                    <p>{children}</p>
                    <img
                        className={styles.avatarImg}
                        src="./HOMEFARM.png"
                        alt="Login icon"
                    />
                </div>
                <Link
                    className={styles.closeSession}
                    onClick={closeSession}
                    to="./"
                >
                    <img
                        className={styles.logoutImage}
                        src="./logout.png"
                        alt="Exit"
                        width={50}
                    />
                    <span className={styles.logoutText} > Salir </span>
                </Link>
            </header>
            <nav className={styles.navbar}>
                <Menu />
                <div className={styles.AverageOfMeasurementsDuringTheDayInNav}>
                    <AverageOfMeasurementsDuringTheDay measurementsReport={"AverageOfMeasurementsDuringTheDay"} />
                </div>
            </nav>
            <aside className={styles.sidebar}>
                <Monitor />
            </aside>
            <article className={styles.main}>
                <Main module={module} />
            </article>
            <footer className={styles.footer}>
                <p>&copy;2023 Copyright <a href="#">{title}</a> | Design by Andres Restrepo </p>
            </footer>
        </div>
    )
}
