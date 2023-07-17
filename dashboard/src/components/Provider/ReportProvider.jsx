import React, { useState, useContext, useEffect } from "react";
import { reports } from "../../utils/httpClient";

const optionSelectContext = React.createContext();
const requestContext = React.createContext();
const changeRequestContext = React.createContext();
const pageContext = React.createContext();
const changePageContext = React.createContext();
const itemsPerPageContext = React.createContext();
const changeItemsPerPageContext = React.createContext();
const responseContext = React.createContext();
const changeResponseContext = React.createContext();


export function useOptionSelectContext() {
    return useContext(optionSelectContext);
}

export function useRequestContext() {
    return useContext(requestContext);
}

export function useChangeRequestContext() {
    return useContext(changeRequestContext);
}

export function usePageContext() {
    return useContext(pageContext);
}

export function useChangePageContext() {
    return useContext(changePageContext);
}

export function useItemsPerPageContext() {
    return useContext(itemsPerPageContext);
}

export function useChangeItemsPerPageContext() {
    return useContext(changeItemsPerPageContext);
}

export function useResponseContext() {
    return useContext(responseContext);
}

export function useChangeResponseContext() {
    return useContext(changeResponseContext);
}

export function ReportProvider({ children }) {
    const currentDate = new Date().toLocaleDateString("fr-CA");

    const optionSelect = {
        "1_ItemsPerPage": 4,
        "2_ItemsPerPage": 6,
        "3_ItemsPerPage": 11
    };

    console.log()

    const [ itemsPerPage, setItemsPerPage ] = useState(optionSelect[Object.keys(optionSelect)[0]]);

    const changeItemsPerPage = itemsPerPage => {
        setCurrentPage(1);
        setItemsPerPage(itemsPerPage);
    }


    const [ currentPage, setCurrentPage ] = useState(1);

    const changePage = page => {
        let temporalPage = 0;
        
        switch (page) {
            case "previous":
                temporalPage = request.currentPage - 1;
                if(temporalPage < 1) return;
                page = temporalPage;
                break;

            case "next":
                temporalPage = request.currentPage + 1;
                if(temporalPage > response.pages.slice(-1)[0]) return;
                page = temporalPage;
                break;
        }

        setCurrentPage(page);
    }



    const [ request, setRequest ] =
        useState({
            id: "id",
            currentDate,
            initialDate: currentDate,
            finalDate: currentDate,
            itemsPerPage: itemsPerPage,
            currentPage: currentPage
        });

    const changeRequest = request => setRequest(request);


    const [ response, setResponse ] = useState("");


    useEffect(() => {
        setRequest({
            id: "id",
            currentDate,
            initialDate: request.initialDate,
            finalDate: request.finalDate,
            itemsPerPage: itemsPerPage,
            currentPage: currentPage
        });
    }, [itemsPerPage, currentPage])


    useEffect(() => {
        reports(request)
            .then(data => {
                setResponse(data);
            })
            .catch(console.error);
    }, [request])


    return (
        <requestContext.Provider value={request}>
            <changeRequestContext.Provider value={changeRequest}>
                <responseContext.Provider value={response}>
                    <pageContext.Provider value={currentPage}>
                        <changePageContext.Provider value={changePage}>
                            <itemsPerPageContext.Provider value={itemsPerPage}>
                                <changeItemsPerPageContext.Provider value={changeItemsPerPage}>
                                    <optionSelectContext.Provider value={optionSelect}>
                                        { children }
                                    </optionSelectContext.Provider>
                                </changeItemsPerPageContext.Provider>
                            </itemsPerPageContext.Provider>
                        </changePageContext.Provider>
                    </pageContext.Provider>
                </responseContext.Provider>
            </changeRequestContext.Provider>
        </requestContext.Provider>
    );
}
