import { AverageOfMeasurementsDuringTheDay } from '../AverageOfMeasurements/AverageOfMeasurementsDuringTheDay.jsx';
import { AverageOfMeasurementsDuringTheMonth } from '../AverageOfMeasurements/AverageOfMeasurementsDuringTheMonth.jsx';
import { ReportProvider } from '../Provider/ReportProvider.jsx';
import { Reports } from "../Reports/Reports.jsx";
import styles from './Main.module.css';

export const Main = ({ module }) => {
    return (
        <>
            {(() => {
                switch (module) {
                    case 'main':
                        return (
                            <>
                                <div className={styles.AverageOfMeasurementsDuringTheDayInMain}>
                                    <AverageOfMeasurementsDuringTheDay module={module} measurementsReport={"AverageOfMeasurementsDuringTheDay"} />
                                </div>
                                <br />
                                <div className={styles.AverageOfMeasurementsDuringTheMonth}>
                                    <AverageOfMeasurementsDuringTheMonth measurementsReport={"AverageOfMeasurementsDuringTheMonth"} />
                                </div>
                            </>
                        );
                    case 'reports':
                        return(
                            <ReportProvider>
                                <Reports />
                            </ReportProvider>
                        );
                    case 'users':
                        return <h1>{ module }</h1>;
                }
            })()}
        </>
    );
}
