import React, { useEffect, useState } from "react";
import { apiGet, apiDelete } from "../utils/api";

import InvoiceTable from "./InvoiceTable";
import FlashMessage from "../components/FlashMessage";
import InvoiceFilter from "./InvoiceFilter";
import Spinner from "../components/Spinner";


const InvoiceIndex = () => {

    // Filtrační parametry
    const defaultFilterValue = {
        sellerID: "",
        buyerID: "",
        product: "",
        minPrice: "",
        maxPrice: "",
        limit: undefined
    };

    const [invoices, setInvoices] = useState([]);
    const [flashMessage, setFlashMessage] = useState({ show: false, theme: '', text: '' });
    const [sellerList, setSellerList] = useState([]);
    const [buyerList, setBuyerList] = useState([]);
    // Objekt obsahující různé filtrační parametry pro seznam faktur
    const [filterState, setFilter] = useState(defaultFilterValue);
    // Pro vykreslení spinneru
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    // Pomocná f-ce pro nastavování zpráv
    const showMessage = (theme, text) => {
        setFlashMessage({ show: true, theme, text });
        setTimeout(() => {
            setFlashMessage({ show: false, theme: '', text: '' });
        }, 2000);
    };

    const deleteInvoice = async (id) => {
        try {
            await apiDelete("/api/invoices/" + id);
            showMessage("danger", "Faktura byla úspěšně smazána!");
            setInvoices(invoices.filter((item) => item._id !== id));
        } catch (error) {
            console.log(error.message);
            showMessage("danger", "Došlo k chybě při mazání faktury.");
        }
    };

    useEffect(() => {
        // Načtení seznamu faktur
        apiGet("/api/invoices").then((data) => {
            const buyers = [];
            const sellers = [];
            // Procházení každé faktury
            data.map(invoice => {
                // Získání seznamu dodavatelů (pokud dodavatel není v poli, přidá ho)
                if (!sellers.some(seller => seller._id === invoice.seller._id)) {
                    sellers.push(invoice.seller);
                }
                // Získání seznamu odběratelů
                if (!buyers.some(buyer => buyer._id === invoice.buyer._id)) {
                    buyers.push(invoice.buyer);
                }
            });
            setInvoices(data);
            setSellerList(sellers);
            setBuyerList(buyers);
            setIsDataLoaded(true);
        });
    }, [filterState]);

    // Pro filtraci
    const handleChange = (e) => {
        if (e.target.value === "false" || e.target.value === "true" || e.target.value === '') {
            setFilter(prevState => {
                return { ...prevState, [e.target.name]: undefined }
            });
        } else {
            setFilter(prevState => {
                return { ...prevState, [e.target.name]: e.target.value }
            });
        }
    };

    // Pro filtraci
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await apiGet("/api/invoices", filterState);
        setInvoices(data);
    };

    // Pro tlačítko reset
    const handleReset = () => {
        setFilter(defaultFilterValue);
    }

    if (!invoices) return <p>Načítám...</p>

    return (
        <div>
            {flashMessage.show && (
                <FlashMessage theme={flashMessage.theme} text={flashMessage.text} />
            )}
            <h1 className="text-headline">Seznam faktur</h1>
            < hr />
            {isDataLoaded ? (
                <InvoiceFilter
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    handleReset={handleReset}
                    sellerListState={sellerList}
                    buyerListState={buyerList}
                    filter={filterState}
                    confirm="Filtr"
                />
            ) : (
                <Spinner />
            )}
            < hr />
            <InvoiceTable
                deleteInvoice={deleteInvoice}
                items={invoices}
                label="Počet faktur:"
            />
        </div>
    );
};

export default InvoiceIndex;