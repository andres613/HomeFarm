import { useEffect, useState } from 'react';
import styles from './CrudOptions.module.css'

export const CrudOptions = ({ sendButton, isAdmin, handleSubmit, userWasFound}) => {
    const crudOptionContainer = document.getElementsByClassName('crudOptionContainer');
    
    const crudOptionsArray = [
        {
            "id": "update",
            "value": "Actualizar",
        },
        {
            "id": "delete",
            "value": "Eliminar",
        },
        {
            "id": "cancel",
            "value": "Cancelar",
        }
    ];

    for(let i = 0; i < crudOptionContainer.length; i++){
        if('lisend' != crudOptionContainer[i].id && 'licancel' != crudOptionContainer[i].id && !userWasFound)
            crudOptionContainer[i].style.display = "none";
        else
            crudOptionContainer[i].style.display = "block";

        if(userWasFound)
            if('lisend' == crudOptionContainer[i].id)
                crudOptionContainer[i].style.display = "none";
    }

    return (
        <ul className={`crudOptionsButton ${styles.crudOptions}`}>
            {
                (() => {
                    return (
                        <>
                            <li id='lisend' className={`crudOptionContainer ${styles.crudListItem}`} key='send' >
                                <button
                                    id={sendButton.class}
                                    onClick={e => handleSubmit(e)}
                                    className={sendButton.class}
                                >
                                    {sendButton.text}
                                </button>
                            </li>
                            {
                                (() => {
                                    return crudOptionsArray.map( (item, i) => {
                                        if(item.id != 'send')
                                            if(!isAdmin)
                                                return false;
                                        return (
                                            <li id={'li'+item.id}
                                                className={`crudOptionContainer ${styles.crudListItem}`} 
                                                key={ item.id }
                                            >
                                                <button
                                                    id={item.id}
                                                    onClick={e => handleSubmit(e)}
                                                >
                                                    {item.value}
                                                </button>
                                            </li>
                                        )
                                    })
                                })()
                            }
                        </>
                    )
                })()
            }
        </ul>
    );
}

