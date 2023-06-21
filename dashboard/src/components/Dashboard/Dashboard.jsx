import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { Monitor } from "../Monitor/Monitor.jsx";
import { AverageOfMeasurementsDuringTheDay } from '../AverageOfMeasurements/AverageOfMeasurementsDuringTheDay.jsx';
import { AverageOfMeasurementsDuringTheMonth } from '../AverageOfMeasurements/AverageOfMeasurementsDuringTheMonth.jsx';
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
                    <img
                        className={styles.logoutImage}
                        src="./logout.png"
                        alt="Exit"
                        width={30}
                    />
                    <span className={styles.logoutText} > Exit </span>
                </Link>
            </header>
            <nav className={styles.navbar}>
                NAVBAR
                ALEVINOS
                BIOFLOC
                <div className={styles.AverageOfMeasurementsDuringTheDayInNav}>
                    <AverageOfMeasurementsDuringTheDay measurementsReport={"AverageOfMeasurementsDuringTheDay"} />
                </div>
            </nav>
            <aside className={styles.sidebar}>
                <Monitor />
            </aside>
            <article className={styles.main}>
                <div className={styles.AverageOfMeasurementsDuringTheDayInMain}>
                    <AverageOfMeasurementsDuringTheDay measurementsReport={"AverageOfMeasurementsDuringTheDay"} />
                </div>
                <div className={styles.AverageOfMeasurementsDuringTheMonth}>
                    <AverageOfMeasurementsDuringTheMonth measurementsReport={"AverageOfMeasurementsDuringTheMonth"} />
                </div>
            </article>
            <footer className={styles.footer}>FOOTER</footer>
        </div>
    )
}
