import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useUserContext } from '../Provider/UserProvider.jsx';
import { useChangeUserContext } from '../Provider/UserProvider.jsx';
import { login } from "../../utils/httpClient.js"
import { UserForm } from '../UserForm/UserForm.jsx';
import Cookies from 'universal-cookie';
import styles from './Login.module.css';

const cookies = new Cookies();

export const Login = () => {
    const user = useUserContext();
    const changeUser = useChangeUserContext();

    const loginHandler = user => {
        if(user) {
            cookies.set('id', user.id, { path: "/", sameSite: "lax" }); //accesible desde todos lados
            cookies.set('userType', user.userType, { path: "/", sameSite: "lax" });

            changeUser(user);
        } else {
            alert("Email o password incorrecto!!")
        }
    }

    const request = async (isAdmin, option, userData, oldUser) => {
        const { email, password } = userData;
        const response = await login(email, password);
        loginHandler(response.data)
    };

    useEffect(() => {
        if(cookies.get('id')) {
            changeUser(cookies.get('id'));
          
            {user && <Navigate to="/dashboard" state={user} replace={true} />}
        } else {
            changeUser(null);
        }
    }, [])

    return (
        <div className={styles.login} >
            {user && <Navigate to="/dashboard" state={user} replace={true} />}
            <UserForm request={request} responseHandler={loginHandler} />
        </div>
    );
}
