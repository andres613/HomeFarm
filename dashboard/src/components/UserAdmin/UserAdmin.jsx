import Cookies from 'universal-cookie';
import { UserForm } from '../UserForm/UserForm.jsx';
import { userHandler } from '../../utils/httpClient.js';

const cookies = new Cookies();

export const UserAdmin = () => {
    const isAdmin = cookies.get('userType') == "admin" ? true : false;

    const request = (isAdminModule, option, newUser) => {
        return userHandler(isAdminModule, option, newUser);
    }

    return (
        <UserForm
            isAdmin={isAdmin}
            request={request}
        />
    );
}
