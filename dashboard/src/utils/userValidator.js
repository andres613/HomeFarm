let userValidatorResponse = [];

export const userValidator = async (isAdmin, userData) => {
    userValidatorResponse = [];

    if(isAdmin) {
        setUserValidatorResponse(await checkThatTheIdIsNotEmpty(userData.document));
        setUserValidatorResponse(await checkThatTheNameIsNotEmpty(userData.name));
        setUserValidatorResponse(await checkThatThePhoneIsNotEmpty(userData.phone));
    }

    setUserValidatorResponse(await validateEmail(userData.email));
    setUserValidatorResponse(await checkThatThePasswordIsNotEmpty(userData.password));

    if(isAdmin) {
        setUserValidatorResponse(
            await checkThatTheConfirmPasswordIsNotEmpty(userData.password, userData.confirmPassword)
        );
    }

    return await getUserValidatorResponse();
}

const checkThatTheIdIsNotEmpty = document => {
    if(document.length >= 10)
        return "";

    return "'Identificación' no puede estar vacía ni tener menos de 10 dígitos";
};

const checkThatTheNameIsNotEmpty = name => {
    if(name) return "";
    return "Campo 'Nombre' no puede estar vacío";
};

const checkThatThePhoneIsNotEmpty = phone => {
    if(phone) return '';
    return "Ingrese número de teléfono";
};

const validateEmail = email => {
    let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');

    if(email == '') return "El 'Email' es requerido";

    if(regex.test(email)) return "";

    return "Formato de email no válido";
};

const checkThatThePasswordIsNotEmpty = pass => {
    if(pass) return "";

    return "Contraseña requerida";
};

const checkThatTheConfirmPasswordIsNotEmpty = ( password, confirmPassword ) => {
    if(!confirmPassword) return "Debe confirmar la contraseña";
    if(password != confirmPassword) return "Las contraseñas no coinciden";
    return "";
};

const setUserValidatorResponse = _ => {
    if(_)
        userValidatorResponse.push(_);
}

const getUserValidatorResponse = _ => {
    return userValidatorResponse;
}
