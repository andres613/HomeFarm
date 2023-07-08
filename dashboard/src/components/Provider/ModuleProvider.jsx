import React, { useState, useContext } from "react";

const moduleContext = React.createContext();
const changeModuleContext = React.createContext();

export function useModuleContext() {
    return useContext(moduleContext);
}

export function useChangeModuleContext() {
    return useContext(changeModuleContext);
}

export function ModuleProvider({ children }) {
    const [ module, setModule ] = useState("main");
    const changeModule = module => setModule(module);

    return (
        <moduleContext.Provider value={module}>
            <changeModuleContext.Provider value={changeModule}>
                { children }
            </changeModuleContext.Provider>
        </moduleContext.Provider>
    );
}
