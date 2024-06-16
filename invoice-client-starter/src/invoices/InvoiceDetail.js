import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { formatNumber } from '../utils/FormatNumber';
import { apiGet } from "../utils/api";


const InvoiceDetail = () => {
    const { id } = useParams();
    const [invoice, setInvoice] = useState({});
    const [seller, setSeller] = useState({});
    const [buyer, setBuyer] = useState({});

    // Pro zpětné tlačítko
    const navigate = useNavigate();
    const handleBackClick = async () => {
        await apiGet("/api/invoices");
        navigate("/invoices");
    }

    useEffect(() => {
        apiGet("/api/invoices/" + id).then((data) => {
            setInvoice(data);
            // Získání pro konkrétní fakturu data dodavatele a odběratele 
            apiGet(`/api/persons/${data.seller._id}`).then((sellerData) => setSeller(sellerData));
            apiGet(`/api/persons/${data.buyer._id}`).then((buyerData) => setBuyer(buyerData));
        });
    }, [id]);

    return (
        <>
            <div className="row background-image" >
                <h1 className="text-headline"> Detail Faktury</h1>
                <hr />
                <div className="col-6">
                    <h3>Číslo faktury: <span className="highlighted-text">{invoice.invoiceNumber}</span></h3>
                    < br />
                    <p>
                        <strong>Datum vystavení:</strong>
                        <br />
                        {invoice.issued}
                    </p>
                    <p>
                        <strong>Datum splatnosti:</strong>
                        <br />
                        {invoice.dueDate}
                    </p>
                    <p>
                        <strong>Název produktu:</strong>
                        <br />
                        {invoice.product}
                    </p>
                    <p>
                        <strong>Částka:</strong>
                        <br />
                        <span className="highlighted-text">
                            {formatNumber(invoice.price)} Kč
                        </span>
                    </p>
                    <p>
                        <strong>DPH:</strong>
                        <br />
                        {invoice.vat} %
                    </p>
                    <p>
                        <strong>Poznámka:</strong>
                        <br />
                        {invoice.note}
                    </p>
                </div>
                <div className="col-6">
                    <div className="image"></div>
                </div>
            </div>
            <div>
                <br />
                <table className="table table-styl">
                    <thead>
                        <tr className="table-head">
                            <th className="highlighted-text">Dodavatel</th>
                            <th>IČO</th>
                            <th>DIČ</th>
                            <th>Bank. účet</th>
                            <th>IBAN</th>
                            <th>Tel. číslo</th>
                            <th>Mail</th>
                            <th>Sídlo</th>
                            <th>Poznámka</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr >
                            <td>{seller.name}</td>
                            <td>{seller.identificationNumber}</td>
                            <td>{seller.taxNumber}</td>
                            <td>{seller.accountNumber}/{seller.bankCode}</td>
                            <td>{seller.iban}</td>
                            <td className="text-right">{seller.telephone}</td>
                            <td>{seller.mail}</td>
                            <td>{seller.street},  {seller.city}, {seller.zip}, {seller.country}</td>
                            <td>{seller.note}</td>
                        </tr>
                    </tbody>
                </table>
                <table className="table table-styl">
                    <thead>
                        <tr className="table-head">
                            <th className="highlighted-text">Odběratel</th>
                            <th>IČO</th>
                            <th>DIČ</th>
                            <th>Bank. účet</th>
                            <th>IBAN</th>
                            <th>Tel. číslo</th>
                            <th>Mail</th>
                            <th>Sídlo</th>
                            <th>Poznámka</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr >
                            <td>{buyer.name}</td>
                            <td>{buyer.identificationNumber}</td>
                            <td>{buyer.taxNumber}</td>
                            <td>{buyer.accountNumber}/{buyer.bankCode}</td>
                            <td>{buyer.iban}</td>
                            <td className="text-right">{buyer.telephone}</td>
                            <td>{buyer.mail}</td>
                            <td>{buyer.street}, {buyer.city}, {buyer.zip}, {buyer.country}</td>
                            <td>{buyer.note}</td>
                        </tr>
                    </tbody>
                </table>
                <button
                    onClick={handleBackClick}
                    className="btn btn-sm btn-success"
                >
                    Zpět
                </button>


            </div>
        </>
    );
};

export default InvoiceDetail;