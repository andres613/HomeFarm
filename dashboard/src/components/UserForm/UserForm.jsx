import { useEffect, useState } from 'react';
import { userValidator } from '../../utils/userValidator.js';
import { CrudOptions } from '../CrudOptions/CrudOptions.jsx';
import { Message } from '../Message/Message';
import styles from './UserForm.module.css';

export const UserForm = ({ isAdmin, request }) => {
    const userFormInput = document.getElementsByClassName('singInContainer');

    const [ userWasFound, setUserWasFound ] = useState(false);
    const [ id, setId ] = useState("");
    const [ oldUser, setOldUser ] = useState("");
    const [ name, setName ] = useState("");
    const [ phone, setPhone ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ confirmPassword, setConfirmPassword ] = useState("");
    const [ message, setMessage ] = useState([]);
    const [ sendButton, setSendButton ] = useState({text:'Enviar', class:'send'});

    const nameInputHandler = e => setName(e.target.value.replace(/[^A-Za-z\s]*$/, ''));
    const idInputHandler = e => setId(e.target.value.replace(/[^0-9.]/g, '').replace(/(\.*)\./g, '$1'));
    const phoneInputHandler = e => setPhone(e.target.value.replace(/[^0-9.]/g, '').replace(/(\.*)\./g, '$1'));
    const emailInputHandler = e => setEmail(e.target.value);
    const passwordInputHandler = e => setPassword(e.target.value);
    const confirmPasswordInputHandler = e => setConfirmPassword(e.target.value);

    const setDefaultValuesInFields = _ => {
        setId(() => {
            if(_) return _.id; 
            return '';
        });
        setName(() => {
            if(_) return _.name; 
            return '';
        });
        setPhone(() => {
            if(_) return _.phone; 
            return '';
        });
        setEmail(() => {
            if(_) return _.email; 
            return '';
        });
        setPassword("");
        setConfirmPassword("");
        setMessage("");
    };

    const handleSubmit = async (e) => {
        let option = e.target.id;
        let formData = {id, name, phone, email, password, confirmPassword};

        switch (option) {
            case 'send':
                operationUser(isAdmin, option, formData, sendUser);
                break;

            case 'search':
                operationUser(isAdmin, option, formData, searchUser);
                break;

            case 'update':
                operationUser(isAdmin, option, formData, sendUser);
                break;

            case 'delete':
                operationUser(isAdmin, option, formData, deleteUser);
                break;

            default:
                clear();
                break;
        }
    }


    const clear = _ => {
        setDefaultValuesInFields();
        setUserWasFound(false);
    };


    const operationUser = async (isAdmin, option, formData, callback) => {
        if(option == 'send' || option == 'update'){
            let userValidatorResponse = await userValidator(isAdmin, formData);
            setMessage(userValidatorResponse);

            if(Object.keys(userValidatorResponse).length != 0) return;
        }

        let user = getUserFromForm(formData);
        let response = await request(isAdmin, option, user, oldUser);

        if(isAdmin)
            callback(response);
    }


    const getUserFromForm = formData => {
        let user = {};
        (Object.keys(formData)).map(item => {
            if(item !== 'confirmPassword')
                user[item] = formData[item];
        })

        user.name = user.name.replace(/^\s+|\s+$|\s+(?=\s)/g, '');

        return user;
    }


    const sendUser = response => {
        const { data } = response;
        if(!data) return;

        if(isAdmin)
            alert(response.data);

        clear();
    };


    const searchUser = async response => {
        const { data } = response;
        if(data){
            setOldUser(data);
            setDefaultValuesInFields(data);
            setUserWasFound(true);
            return;
        }

        alert('No se encontró usuario');
    }


    const deleteUser = async response => {
        const { data } = response;
        if(data){
            clear();
            alert(data);
            return;
        }

        alert('Error');
    }


    useEffect(() => {
        for(let i = 0; i < userFormInput.length; i++){
            if(isAdmin) {
                userFormInput[i].classList.add(styles['admin']);
            } else {
                userFormInput[i].classList.remove(styles['admin']);
            }
        }
    }, [isAdmin])


    useEffect(() => {
        if(!isAdmin) return;

        if(id != '' && name == '' && phone == '' && email == '' && password == '' && confirmPassword == ''){
            setSendButton({text:'Buscar', class:'search'});
            setMessage('');
        }
        else
            setSendButton({text:'Enviar', class:'send'});
    }, [id, name, phone, email, password, confirmPassword])


    return (
        <div className={styles.userFormContainer} >
            <div className={styles.userForm} >
                <img
                    className={styles.avatarImg}
                    src="./HOMEFARM.png"
                    alt="Login icon"
                />
                <h2>{`Formulario ${isAdmin ? 'registro' : 'inicio sesión'}`}</h2>
                <div className={`singInContainer ${styles.inputSinginContainer}`}>
                    <label>Identificación</label>
                    <input
                        type="text"
                        placeholder=" Ingrese cédula"
                        className={styles.userFormInput}
                        id='userId'
                        onChange={e => idInputHandler(e)}
                        value={id}
                    />
                    <label>Nombre</label>
                    <input
                        type="text"
                        placeholder=" Ingrese nombre"
                        className={styles.userFormInput}
                        id='name'
                        onChange={e => nameInputHandler(e)}
                        value={name}
                    />
                    <label>Numero celular</label>
                    <input
                        type="text"
                        placeholder=" Ingrese número de celular"
                        className={styles.userFormInput}
                        id='phone'
                        onChange={e => phoneInputHandler(e)}
                        value={phone}
                    />
                </div>
                <label>Email</label>
                <input
                    type="email"
                    placeholder=" Ingrese email"
                    // className={styles.email}
                    className={styles.userFormInput}
                    id='email'
                    onChange={e => emailInputHandler(e)}
                    value={email}
                />
                <label>Contraseña</label>
                <input
                    type="password"
                    placeholder=" Ingrese contraseña"
                    className={styles.userFormInput}
                    id='password'
                    onChange={e => passwordInputHandler(e)}
                    value={password}
                />
                <div className={`singInContainer ${styles.inputSinginContainer}`}>
                    <label>Confirmar Contraseña</label>
                    <input
                        type="password"
                        placeholder=" Confirmar Contraseña"
                        className={styles.userFormInput}
                        id='passwordCofirm'
                        onChange={e => confirmPasswordInputHandler(e)}
                        value={confirmPassword}
                    />
                </div>
                <CrudOptions
                    sendButton={sendButton} isAdmin={isAdmin} 
                    handleSubmit={handleSubmit} userWasFound={userWasFound}
                />
                <Message prop={message}/>
            </div>
        </div>
    );

}
