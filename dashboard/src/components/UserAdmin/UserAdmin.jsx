import Cookies from 'universal-cookie';
import { UserForm } from '../UserForm/UserForm.jsx';
import { userHandler } from '../../utils/httpClient.js';

const cookies = new Cookies();

export const UserAdmin = () => {
    const isAdmin = cookies.get('userType') == "admin" ? true : false;

    const userAdmin = formData => {
        let user = {};
        (Object.keys(formData)).map(item => {
            if(item !== 'confirmPassword')
                user[item] = formData[item];
        })

        user.name = user.name.replace(/^\s+|\s+$|\s+(?=\s)/g, '');

        return user;
    }

    const request = (isAdminModule, option, newUser, oldUser) => {
        return userHandler(isAdminModule, option, newUser, oldUser);
    }

    return (
        <UserForm
            isAdmin={isAdmin}
            userAdmin={userAdmin}
            request={request}
        />
    );
}
