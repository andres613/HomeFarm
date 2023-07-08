import { Link, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { login } from "../../utils/httpClient.js"
import Cookies from 'universal-cookie';
import styles from './Login.module.css';

const cookies = new Cookies();

export const Login = () => {

    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ user, setUser ] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const startSession = await login(email, password);

        if(startSession) {
            cookies.set('id', startSession.id, { path: "/", sameSite: "lax" }); //accesible desde todos lados
            cookies.set('name', startSession.name, { path: "/", sameSite: "lax" });
            cookies.set('username', startSession.username, { path: "/", sameSite: "lax" });
            cookies.set('email', startSession.email, { path: "/", sameSite: "lax" });
            cookies.set('userType', startSession.userType, { path: "/", sameSite: "lax" });
        
            setUser(startSession);
        } else {
            alert("Email o password incorrecto!!")
        }
    }

    useEffect(() => {
        if(cookies.get('username')) {
            setUser(cookies.get('username'));
          
            {user && <Navigate to="/dashboard" state={user} replace={true} />}
        }
    }, [])

    return (
        <div className={styles.login} >
            {user && <Navigate to="/dashboard" state={user} replace={true} />}
            <div className={styles.blur} >
                <img
                    className={styles.avatarImg}
                    src="./HOMEFARM.png"
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
                            <Link className={styles.signupNow} to="/signin">
                                Signup Now
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
