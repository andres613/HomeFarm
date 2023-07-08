import { useModuleContext, useChangeModuleContext } from '../Provider/ModuleProvider';
import styles from './MenuItem.module.css'
import Cookies from 'universal-cookie';

export const MenuItem = ({ menuItem, callback }) => {
    const cookies = new Cookies();
    var btnMenuItems = document.getElementsByClassName("btnMenuItem");

    const changeModule = useChangeModuleContext();

    const handleMenuItem = (e) => {
        let module = e.target.id;

        for(let i = 0; i < btnMenuItems.length; i++){
            if(module == btnMenuItems[i].id){
                btnMenuItems[i].classList.add(styles['isActive']);
            } else {
                btnMenuItems[i].classList.remove(styles['isActive']);
            }
        }

        changeModule(module);
        callback();
    }

    if(menuItem.isAdminModule){
        if(cookies.get('userType') != "admin")
            return false;
    }

    return (
        <li className={styles.menuListItem}>
            <button
                id={menuItem.id}
                className={`btnMenuItem ${menuItem.id == 'main' ? styles.isActive : ''}`}
                onClick={handleMenuItem}
            >
                {menuItem.name}
            </button>
        </li>
    );
}
