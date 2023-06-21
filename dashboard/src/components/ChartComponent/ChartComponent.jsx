import { useState } from 'react';
import Chart from 'react-apexcharts'
import styles from './ChartComponent.module.css'

export const ChartComponent = ({ categories, showCategories, dataLabelsAreEnabled, isDistributed, series, type }) => {
    const [chartDate] = useState({
        options: {
            chart: {
                sparkline: {
                    enabled: false
                },
                toolbar: {
                    show: false
                },
            },
            grid: { show: true },
            xaxis: {
                categories: categories,
                axisBorder: { show: true },
                axisTicks: { show: false },
                labels: { show: showCategories }
            },
            yaxis: { show: true },
            dataLabels: {
                enabled: dataLabelsAreEnabled,
                style: {
                    colors: ['#000']
                }
            },
            plotOptions: {
                bar: {
                    distributed: isDistributed,
                    dataLabels: {
                        position: 'bottom',
                    },
                }
            },
            colors: ['#0A0AEF', '#F2F30C', '#790679', '#98999B', '#88DD88', '#EE0808'],
            legend: {
                show: true
            }
        },
        series: series
    });

    return (
        <>
            <Chart
                className={styles.chart}
                options={chartDate.options}
                series={chartDate.series}
                type={type}
                width="90%"
                height={300}
            />
        </>
    );
}
