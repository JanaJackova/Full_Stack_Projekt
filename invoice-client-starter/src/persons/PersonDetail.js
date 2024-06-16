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

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiGet } from "../utils/api";
import { formatNumber } from "../utils/FormatNumber";

import Country from "./Country";

const PersonDetail = () => {
    const { id } = useParams();
    const [person, setPerson] = useState({});
    const [seller, setSeller] = useState([]);
    const [buyer, setBuyer] = useState([]);


    // Pro zpětné tlačítko
    const navigate = useNavigate();
    const handleBackClick = async () => {
        await apiGet("/api/persons");
        navigate("/persons");
    }

    useEffect(() => {
        apiGet("/api/persons/" + id).then((data) => {
            setPerson(data);
            apiGet(`/api/identification/${data.identificationNumber}/sales`).then((salesData) => setSeller(salesData));
            apiGet(`/api/identification/${data.identificationNumber}/purchases`).then((purchaseData) => setBuyer(purchaseData));
        });
    }, [id]);

    const country = Country.CZECHIA === person.country ? "Česká republika" : "Slovensko";

    return (
        <>
            <div>
                <h1 className="text-headline">Detail osoby</h1>
                <hr />
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <h3 className="highlighted-text">{person.name} ({person.identificationNumber})</h3>
                            <p>
                                <strong>DIČ:</strong>
                                <br />
                                {person.taxNumber}
                            </p>
                            <p>
                                <strong>Bankovní účet:</strong>
                                <br />
                                {person.accountNumber}/{person.bankCode} ({person.iban})
                            </p>
                            <p>
                                <strong>Tel. číslo:</strong>
                                <br />
                                {person.telephone}
                            </p>
                            <p>
                                <strong>Email:</strong>
                                <br />
                                {person.mail}
                            </p>
                            <p>
                                <strong>Sídlo:</strong>
                                <br />
                                {person.street}, {person.city},
                                {person.zip}, {country}
                            </p>
                            <p>
                                <strong>Poznámka:</strong>
                                <br />
                                {person.note}
                            </p>
                            <div className="image-person"></div>

                            <button
                                onClick={handleBackClick}
                                className="btn btn-sm btn-success"
                            >
                                Zpět
                            </button>
                        </div>

                        <div className="col-md-6">
                            <h3 className="highlighted-text">Vystavené faktury</h3>
                            <table className="table table-styl">
                                <thead>
                                    <tr className="table-head">
                                        <th>Číslo faktury</th>
                                        <th>Odběratel</th>
                                        <th>Datum vystavení</th>
                                        <th>Datum splatnosti</th>
                                        <th>Částka</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {seller.map((item) => (
                                        <tr key={item._id}>
                                            <td>{item.invoiceNumber}</td>
                                            <td>{item.buyer.name}</td>
                                            <td>{item.issued}</td>
                                            <td>{item.dueDate}</td>
                                            <td className="text-right highlighted-text">{formatNumber(item.price)} Kč</td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                            < br />
                            
                            <h3 className="highlighted-text">Přijaté faktury</h3>
                            <table className="table table-styl">
                                <thead>
                                    <tr className="table-head">
                                        <th>Číslo faktury</th>
                                        <th>Dodavatel</th>
                                        <th>Datum vystavení</th>
                                        <th>Datum splatnosti</th>
                                        <th>Částka</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {buyer.map((item) => (
                                        <tr key={item._id}>
                                            <td>{item.invoiceNumber}</td>
                                            <td>{item.seller.name}</td>
                                            <td>{item.issued}</td>
                                            <td>{item.dueDate}</td>
                                            <td className="text-right highlighted-text">{formatNumber(item.price)} Kč</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PersonDetail;