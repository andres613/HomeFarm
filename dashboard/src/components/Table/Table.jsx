import { TableHead } from "./TableHead";
import { TableBody } from "./TableBody";
import { TableFoot } from "./TableFoot";
import { useResponseContext } from "../Provider/ReportProvider";
import styles from './Table.module.css';

export const Table = () => {
    const response = useResponseContext();

    if(response.variables) {
        return (
            <div className={styles.tableContainer} >
                <table className={styles.table} >
                    <thead>
                        <TableHead response={response} />
                    </thead>
                    <tbody>
                        <TableBody response={response} />
                    </tbody>
                    <tfoot>
                        <TableFoot response={response} />
                    </tfoot>
                </table>
            </div>
        );
    }
}
