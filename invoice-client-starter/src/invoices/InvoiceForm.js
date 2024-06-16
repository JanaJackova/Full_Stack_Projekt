import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiGet, apiPost, apiPut } from '../utils/api';

import FlashMessage from '../components/FlashMessage';
import InputField from '../components/InputField';
import InputSelect from '../components/InputSelect';


const InvoiceForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [invoice, setInvoice] = useState({
        invoiceNumber: "",
        seller: { _id: 0 },
        buyer: { _id: 0 },
        issued: "",
        dueDate: "",
        product: "",
        price: "",
        vat: "",
        note: ""
    });
   
    const [personList, setPersonList] = useState([]);

    const [sentState, setSent] = useState(false);
    const [successState, setSuccess] = useState(false);
    const [errorState, setError] = useState(null);

    useEffect(() => {
        if (id) {
            apiGet("/api/invoices/" + id).then((data) => setInvoice(data));
        }
         // List všech aktivních osob
        apiGet("/api/persons").then((data) => setPersonList(data));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        (id ? apiPut("/api/invoices/" + id, invoice) : apiPost("/api/invoices", invoice))
            .then((data) => {
                setSent(true);
                setSuccess(true);
                setTimeout(() => {
                    navigate("/invoices");
                }, 2000); // Pozdržení zprávy na 2s
            })
            .catch((error) => {
                console.log(error.message);
                setError(error.message);
                setSent(true);
                setSuccess(false);
            });
    };

    const sent = sentState;
    const success = successState;

    return (
        <div>
            <h1 className="text-headline">{id ? 'Upravit' : 'Vytvořit'} fakturu</h1>
            <hr />
            {errorState ? <div className='alert alert-danger'>{errorState}</div> : null}
            {sent && success ? (
                <FlashMessage
                    theme={success ? "success" : ""}
                    text={success ? "Uložení faktury proběhlo úspěšně." : ""}
                />
            ) : null}
            <form onSubmit={handleSubmit}>
                <InputField
                    required={true}
                    type="Number"
                    name="invoiceNumber"
                    min="5"
                    label="Číslo faktury"
                    prompt="Zadejte číslo faktury"
                    value={invoice.invoiceNumber}
                    handleChange={(e) => {
                        setInvoice({ ...invoice, invoiceNumber: e.target.value });
                    }}
                />

                <InputSelect
                    name="seller"
                    items={personList}
                    label="Dodavatel"
                    prompt="Vyberte dodavatele"
                    value={invoice.seller._id}
                    handleChange={(e) => {
                        setInvoice({ ...invoice, seller: { _id: e.target.value } });
                    }}
                />

                <InputSelect
                    name="buyer"
                    items={personList}
                    label="Odběratel"
                    prompt="Vyberte odběratele"
                    value={invoice.buyer._id}
                    handleChange={(e) => {
                        setInvoice({ ...invoice, buyer: { _id: e.target.value } });
                    }}
                />

                <InputField
                    required={true}
                    type="date"
                    name="issued"
                    min="0000-01-01"
                    label="Datum vystavení"
                    prompt="Zadejte datum vystavení"
                    value={invoice.issued}
                    handleChange={(e) => {
                        setInvoice({ ...invoice, issued: e.target.value });
                    }}
                />

                <InputField
                    required={true}
                    type="date"
                    name="dueDate"
                    min="0000-01-01"
                    label="Datum splatnosti"
                    prompt="Zadejte datum splatnosti"
                    value={invoice.dueDate}
                    handleChange={(e) => {
                        setInvoice({ ...invoice, dueDate: e.target.value });
                    }}
                />

                <InputField
                    required={true}
                    type="text"
                    name="product"
                    min="3"
                    label="Produkt"
                    prompt="Zadejte název productu"
                    value={invoice.product}
                    handleChange={(e) => {
                        setInvoice({ ...invoice, product: e.target.value });
                    }}
                />

                <InputField
                    required={true}
                    type="number"
                    name="price"
                    min="0"
                    label="Cena Kč"
                    prompt="Zadejte cenu"
                    value={invoice.price}
                    handleChange={(e) => {
                        setInvoice({ ...invoice, price: e.target.value });
                    }}
                />

                <InputField
                    required={true}
                    type="number"
                    name="vat"
                    min="00"
                    label="DPH %"
                    prompt="Zadejte % DPH"
                    value={invoice.vat}
                    handleChange={(e) => {
                        setInvoice({ ...invoice, vat: e.target.value });
                    }}
                />

                <InputField
                    required={true}
                    type="textarea"
                    name="note"
                    min="5"
                    label="Popis"
                    prompt="Zadejte popis"
                    value={invoice.note}
                    handleChange={(e) => {
                        setInvoice({ ...invoice, note: e.target.value });
                    }}
                />

                <input type="submit" className="btn save-button" value="Uložit" />
            </form>
        </div>
    );
}

export default InvoiceForm;