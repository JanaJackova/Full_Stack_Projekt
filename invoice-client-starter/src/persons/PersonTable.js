/*  _____ _______         _                      _
 * |_   _|__   __|       | |                    | |
 *   | |    | |_ __   ___| |___      _____  _ __| | __  ___ ____
 *   | |    | | '_ \ / _ \ __\ \ /\ / / _ \| '__| |/ / / __|_  /
 *  _| |_   | | | | |  __/ |_ \ V  V / (_) | |  |   < | (__ / /
 * |_____|  |_|_| |_|\___|\__| \_/\_/ \___/|_|  |_|\_(_)___/___|
 *                                _
 *              ___ ___ ___ _____|_|_ _ _____
 *             | . |  _| -_|     | | | |     |  LICENCE
 *             |  _|_| |___|_|_|_|_|___|_|_|_|
 *             |_|
 *
 *   PROGRAMOVÁNÍ  <>  DESIGN  <>  PRÁCE/PODNIKÁNÍ  <>  HW A SW
 *
 * Tento zdrojový kód je součástí výukových seriálů na
 * IT sociální síti WWW.ITNETWORK.CZ
 *
 * Kód spadá pod licenci prémiového obsahu a vznikl díky podpoře
 * našich členů. Je určen pouze pro osobní užití a nesmí být šířen.
 * Více informací na http://www.itnetwork.cz/licence
 */

import React from "react";

import { Link } from "react-router-dom";


const PersonTable = ({ label, items, deletePerson }) => {
    return (
        <div>
            <p>
                {label} <span className="highlighted-text">{items.length}</span>
            </p>
            <table className="table table-styl">
                <thead>
                    <tr className="table-head">
                        <th>Id</th>
                        <th>Jméno</th>
                        <th>IČO</th>
                        <th>Tel. číslo</th>
                        <th>Email</th>
                        <th className="text-center">Akce</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={index + 1}>
                            <td>{item._id}</td>
                            <td>{item.name}</td>
                            <td>{item.identificationNumber}</td>
                            <td>{item.telephone}</td>
                            <td>{item.mail}</td>
                            <td>
                                <div className="btn-group button-styl">
                                    <Link
                                        to={"/persons/show/" + item._id}
                                        className="btn btn-sm highlighted-button display-button"
                                    >
                                        Zobrazit
                                    </Link>
                                    <Link
                                        to={"/persons/edit/" + item._id}
                                        className="btn btn-sm highlighted-button edit-button"
                                    >
                                        Upravit
                                    </Link>
                                    <button
                                        onClick={() => deletePerson(item._id)}
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
            <Link to={"/persons/create"} className="btn btn-success">
                Nová osoba
            </Link>
        </div>
    );
};

export default PersonTable;
