import { React, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { formatNumber } from '../utils/FormatNumber';

const InvoiceTable = ({ label, items, deleteInvoice }) => {

    // Pro dynamické filtrování seznamu faktur
    const [currentYearSum, setCurrentYearSum] = useState(0);
    const [allTimeSum, setAllTimeSum] = useState(0);

    // Spuštění při filtraci seznamu faktur
    useEffect(() => {
        calculateSums(items);
    }, [items]);

    // Funkce, která po změně filtrace seznamu faktur vypočítá celkové výnosy za celé období a aktuální rok
    const calculateSums = (items) => {
        const currentYear = (new Date().getFullYear());
        const currentYearSum = items.reduce((sum, item) => sum + (new Date(item.issued).getFullYear() === currentYear ? item.price : 0), 0);
        const allTimeSum = items.reduce((sum, item) => sum + item.price, 0);
        setCurrentYearSum(currentYearSum);
        setAllTimeSum(allTimeSum);
    };

    return (
        <div>
            <div className="row">
                <div className="col-4">
                    {label} <span className='highlighted-text'>{items.length}</span>
                </div>
                <div className="col-4">
                    Celkové výnosy: <span className="highlighted-text">{formatNumber(allTimeSum)} Kč</span>
                </div>
                <div className="col-4">
                    Výnosy za letošní rok: <span className="highlighted-text">{formatNumber(currentYearSum)} Kč</span>
                </div>
            </div>

            <table className="table table-styl" >
                <thead>
                    <tr className="table-head">
                        <th>Číslo faktury</th>
                        <th>Dodavatel</th>
                        <th>Odběratel</th>
                        <th>Produkt</th>
                        <th className="text-right">Částka</th>
                        <th className="text-center">Akce</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={index + 1}>
                            <td>{item.invoiceNumber}</td>
                            <td>{item.seller.name}</td>
                            <td>{item.buyer.name}</td>
                            <td>{item.product}</td>
                            <td className="text-right">{formatNumber(item.price)} Kč</td>
                            <td>
                                <div className="btn-group button-styl">
                                    <Link
                                        to={"/invoices/show/" + item._id}
                                        className="btn btn-sm highlighted-button display-button"
                                    >
                                        Zobrazit
                                    </Link>
                                    <Link
                                        to={"/invoices/edit/" + item._id}
                                        className="btn btn-sm highlighted-button edit-button"
                                    >
                                        Upravit
                                    </Link>
                                    <button
                                        onClick={() => deleteInvoice(item._id)}
                                        className="btn btn-sm highlighted-button remove-button"
                                    >
                                        Odstranit
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to={"/invoices/create"} className="btn btn-success">
                Nová faktura
            </Link>

        </div>
    );
};

export default InvoiceTable;