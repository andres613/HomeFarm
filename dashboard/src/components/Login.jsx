import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from './Login.module.css';

export const Login = () => {

    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
    }

    return (
        <div className={styles.login} >
            <div className={styles.blur} >
                <img
                    className={styles.avatarImg}
                    src="./HOMEFARM2.png"
                    alt="Login icon"
                />
                <h2>Login Form</h2>
                <form onSubmit={handleSubmit} >
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder=" Enter Email"
                        className={styles.email}
                        id='email'
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        value={email}
                        required
                    />
                    <label>Password</label>
                    <input
                        type="password"
                        placeholder=" Enter Password"
                        className={styles.pass}
                        id='pass'
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        value={password}
                        required
                    />
                    <input
                        type="submit"
                        value="Login"
                    />
                    <div className={styles.remember} >
                         <div className={styles.signup} >
                            Don't have account?
                            <Link className={styles.signupNow} to="#">
                                Signup Now
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
