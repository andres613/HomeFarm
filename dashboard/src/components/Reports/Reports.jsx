import { useRequestContext } from '../Provider/ReportProvider.jsx';
import { useItemsPerPageContext } from '../Provider/ReportProvider.jsx';
import { usePageContext } from '../Provider/ReportProvider.jsx';
import { useChangeRequestContext } from '../Provider/ReportProvider.jsx';
import { Table } from '../Table/Table.jsx';
import styles from './Reports.module.css';

export const Reports = () => {
    const request = useRequestContext();
    const itemsPerPage = useItemsPerPageContext();
    const currentPage = usePageContext();
    const changeRequest = useChangeRequestContext();
    const inputInitialDate = document.getElementById('initialDate');
    const inputFinalDate = document.getElementById('finalDate');

    const onKeyDown = (e) => {
        e.preventDefault();
    }

    const onChangeDate = (e) => {
        // console.log(request.date);
    }

    const getReport = () => {
        changeRequest({
            id: request.id,
            currentDate: request.currentDate,
            initialDate: (inputInitialDate.value),
            finalDate: (inputFinalDate.value),
            // initialDate: (inputInitialDate.value.split('-').toString()).replaceAll(',', ''),
            // finalDate: (inputFinalDate.value.split('-').toString()).replaceAll(',', ''),
            itemsPerPage,
            currentPage
        });
    }

    return (
        <>
            <div>
                <input
                    id="initialDate"
                    type="date"
                    className={styles.initialDate}
                    max={request.currentDate}
                    onKeyDown={onKeyDown}
                    onChange={onChangeDate}
                    defaultValue={request.currentDate}
                />
                <input
                    id="finalDate"
                    type="date"
                    className={styles.finalDate}
                    max={request.currentDate} 
                    onKeyDown={onKeyDown} 
                    onChange={onChangeDate}
                    defaultValue={request.currentDate}
                />
            </div>
            <button id={styles.btnGetReport} onClick={getReport}>Mostrar</button>
            <br />
            <br />
            <Table />
        </>
    );
}
