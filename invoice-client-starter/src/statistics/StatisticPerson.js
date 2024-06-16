import 'intl';
import 'intl/locale-data/jsonp/cs-CZ';
import React, { useEffect, useState } from "react";
import { apiGet } from "../utils/api";
import { formatNumber } from '../utils/FormatNumber';


const StatisticPerson = () => {

    const [statistic, setStatistic] = useState([{}]);

    useEffect(() => {
        apiGet("/api/persons/statistics").then((data) => setStatistic(data));
    }, []);

    return (
        <div className="narrow-list">
            <h1 className='text-headline'>Statistika osob - vystavené faktury</h1>
            <table className="table table-styl">
                <thead>
                    <tr className="table-head">
                        <th>#</th>
                        <th>ID</th>
                        <th>Jméno</th>
                        <th className="text-right">Celkové výnosy</th>
                    </tr>
                </thead>
                <tbody>
                    {statistic.map((item, index) => (
                        <tr key={index}>
                            <td className="narrow-column">{index + 1} </td>
                            <td className="narrow-column">{item.personId}</td>
                            <td>{item.personName}</td>
                            <td className="text-right highlighted-text">{formatNumber(item.revenue)} Kč</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StatisticPerson;