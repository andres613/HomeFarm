import React, { useState, useContext } from "react";

const userContext = React.createContext();
const changeUserContext = React.createContext();

export function useUserContext() {
    return useContext(userContext);
}

export function useChangeUserContext() {
    return useContext(changeUserContext);
}

export function UserProvider({ children }) {
    const [ user, setUser ] = useState(null);
    const changeUser = user => setUser(user);

    return (
        <userContext.Provider value={user}>
            <changeUserContext.Provider value={changeUser}>
                { children }
            </changeUserContext.Provider>
        </userContext.Provider>
    );
}
