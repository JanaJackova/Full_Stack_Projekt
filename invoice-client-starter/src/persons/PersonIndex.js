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
import { apiDelete, apiGet } from "../utils/api";

import PersonTable from "./PersonTable";
import FlashMessage from "../components/FlashMessage";
import Spinner from "../components/Spinner";


const PersonIndex = () => {
    const [persons, setPersons] = useState([]);
    const [flashMessage, setFlashMessage] = useState({ show: false, theme: '', text: '' });
    // Pro vykreslení spinneru
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    // Pomocná f-ce pro nastavování zpráv
    const showMessage = (theme, text) => {
        setFlashMessage({ show: true, theme, text });
        setTimeout(() => {
            setFlashMessage({ show: false, theme: '', text: '' });
        }, 2000);
    };

    const deletePerson = async (id) => {
        try {
            await apiDelete("/api/persons/" + id);
            showMessage("danger", "Firma byla úspěšně smazána!");
            setPersons(persons.filter((item) => item._id !== id));
        } catch (error) {
            console.log(error.message);
            showMessage("danger", "Došlo k chybě při mazání firmy.");
        }
    };

    useEffect(() => {
        apiGet("/api/persons")
            .then((data) => {
                setPersons(data);
                setIsDataLoaded(true);
            });
    }, []);

    return (
        <div>
            {flashMessage.show && (
                <FlashMessage theme={flashMessage.theme} text={flashMessage.text} />
            )}
            <h1 className="text-headline">Seznam osob</h1>
            {!isDataLoaded ? (
                <Spinner />
            ) : (
                <PersonTable
                    deletePerson={deletePerson}
                    items={persons}
                    label="Počet osob:"
                />
            )}
        </div>
    );
};
export default PersonIndex;
