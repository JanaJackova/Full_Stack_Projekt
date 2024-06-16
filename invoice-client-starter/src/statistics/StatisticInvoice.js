import React, { useEffect, useState } from "react";
import { apiGet } from "../utils/api";
import { formatNumber } from "../utils/FormatNumber";


const StatisticInvoice = () => {
    const [statistic, setStatistic] = useState([]);

    useEffect(() => {
        apiGet("/api/invoices/statistics").then((data) => setStatistic(data));
    }, []);


    return (
        <div className="narrow-list">
            <h1 className="text-headline">Statistika faktur - obecný přehled</h1>
            < hr />
            <table className="table table-styl">
                <thead>
                    <tr className="table-head">
                        <th>Sumarizace</th>
                        <th className="text-right"> Hodnota</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Výnosy za letošní rok:</td>
                        <td className="highlighted-text text-right">{formatNumber(statistic.currentYearSum)}  Kč</td>
                    </tr>
                    <tr>
                        <td>Celkové výnosy:</td>
                        <td className="highlighted-text text-right">{formatNumber(statistic.allTimeSum)} Kč</td>
                    </tr>
                    <tr>
                        <td>Celkový počet vystavených faktur:</td>
                        <td className="highlighted-text text-right">{statistic.invoicesCount}</td>
                    </tr>
                </tbody>
            </table>
            < hr />
            < br />
        </div>
    );
};
export default StatisticInvoice;