import styles from './Menu.module.css'
import menuItemsArray from './menuItems.json'
import { MenuItem } from './MenuItem.jsx';

export const Menu = () => {
    var menu = document.getElementsByClassName("menu");

    const handleBtnMenu = (e) => {
        menu[0].classList.toggle(styles['menuVisible']);
    }

    const callback = () => {
        menu[0].classList.remove(styles['menuVisible']);
    }

    return (
        <div className={styles.menuContainer}>
            <ul className={`menu ${styles.ulMenu}`}>
                {
                    menuItemsArray.map( (menuItem, i) =>
                        <MenuItem key={i} menuItem={menuItem} callback={callback} />
                    )
                }
            </ul>
            <button
                className={styles.menuToggle}
                onClick={handleBtnMenu}
            >
                <img
                    width={40}
                    src="./icon-menu-png-3.jpg" alt=""
                />
            </button>
        </div>
    ); 
}
