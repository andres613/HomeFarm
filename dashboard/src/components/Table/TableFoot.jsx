import { useOptionSelectContext } from "../Provider/ReportProvider";
import { useChangeItemsPerPageContext } from "../Provider/ReportProvider";
import { useChangePageContext } from "../Provider/ReportProvider";
import styles from './TableFoot.module.css';

export const TableFoot = ({ response }) => {
    const btnPagination = document.getElementsByClassName("btnPagination");
    const optionSelect = useOptionSelectContext();
    const changeItemsPerPage = useChangeItemsPerPageContext();
    const changePage = useChangePageContext();

    const handleSelectChange = e => {
        changeItemsPerPage(e.target.value);

        for(let i = 0; i < btnPagination.length; i++){
            if(1 == btnPagination[i].value){
                btnPagination[i].classList.add(styles['isActive']);
            } else {
                btnPagination[i].classList.remove(styles['isActive']);
            }
        }
    };

    const handleActionButton = e => {
        let page = e.target.value;

        changePage(page);

        for(let i = 0; i < btnPagination.length; i++){
            if(page != 'previous' && page != 'next'){
                if(page == btnPagination[i].value){
                    btnPagination[i].classList.add(styles['isActive']);
                } else {
                    btnPagination[i].classList.remove(styles['isActive']);
                }
            } else {
                if(page == 'previous'){
                    for(let i = 0; i < btnPagination.length; i++){
                        for(let j = 0; j < btnPagination[i].classList.length; j++){
                            if(btnPagination[i].classList[j].includes('isActive')){
                                if(btnPagination[i].value > 1){
                                    btnPagination[i-1].classList.add(styles['isActive']);
                                    btnPagination[i].classList.remove(styles['isActive']);
                                    return;
                                }
                            }
                        }
                    }
                } else {
                    for(let i = 0; i < btnPagination.length; i++){
                        for(let j = 0; j < btnPagination[i].classList.length; j++){
                            if(btnPagination[i].classList[j].includes('isActive')){
                                if(btnPagination[i].value < btnPagination.length-2){
                                    btnPagination[i+1].classList.add(styles['isActive']);
                                    btnPagination[i].classList.remove(styles['isActive']);
                                    return;
                                }
                            }
                        }
                    }
                }
            }
        }

    };

    return (
        <tr>
            <td colSpan={ Object.keys(response.variables[0]).length } >
                <div id={styles.paging}>
                    <br />
                    <label>Vistas por página: </label>
                    <select onChange={handleSelectChange} defaultValue={'DEFAULT'} >
                        {
                            (() => {
                                let options = [];
                                Object.keys(optionSelect).map(function(key, index) {
                                    options.push(
                                        <option 
                                            key={key}
                                            value={optionSelect[key]}
                                        >
                                            { optionSelect[key] }
                                        </option>
                                    )
                                })
                                return options;
                            }
                            )()
                        }
                    </select>
                    <div className={styles.paginationContainer}>
                        <button
                            className={`btnPagination ${styles.paginationButton}`}
                            value="previous"
                            onClick={handleActionButton}
                        >
                            Previous
                        </button>
                        {
                            (response.pages).map( (npage) =>{
                                return (
                                    <button
                                        className={`btnPagination ${styles.paginationButton} ${npage == '1' ? styles.isActive : ''}`}
                                        key={npage}
                                        value={npage}
                                        onClick={handleActionButton}
                                    >
                                        { npage }
                                    </button>
                                );
                            })
                        }
                        <button
                            className={`btnPagination ${styles.paginationButton}`}
                            value="next" 
                            onClick={handleActionButton}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </td>
        </tr>
    );
}
