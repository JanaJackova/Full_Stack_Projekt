import React from 'react';
import InputSelect from '../components/InputSelect';
import InputField from '../components/InputField';


const InvoiceFilter = (props) => {

    const handleChange = (e) => {
        props.handleChange(e);
    };

    const handleSubmit = (e) => {
        props.handleSubmit(e);
    };

    const handleReset = () => {
        props.handleReset();
    }

    const filter = props.filter;

    return (
        <form onSubmit={handleSubmit}>
            <div className="row">
                <div className="col">
                    <InputSelect
                        name="sellerID"
                        items={props.sellerListState}
                        handleChange={handleChange}
                        label="Dodavatel"
                        prompt="nevybrán"
                        value={filter.sellerID}
                    />
                </div>

                <div className="col">
                    <InputSelect
                        name="buyerID"
                        items={props.buyerListState}
                        handleChange={handleChange}
                        label="Odběratel"
                        prompt="nevybrán"
                        value={filter.buyerID}
                    />
                </div>

                <div className="col">
                    <InputField
                        type="text"
                        min=""
                        name="product"
                        handleChange={handleChange}
                        label="Produkt"
                        prompt="neuveden"
                        value={filter.product}
                    />
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <InputField
                        type="number"
                        min="0"
                        name="minPrice"
                        handleChange={handleChange}
                        label="Cena od"
                        prompt="neuveden"
                        value={filter.minPrice ? filter.minPrice : ''}
                    />
                </div>

                <div className="col">
                    <InputField
                        type="number"
                        min="0"
                        name="maxPrice"
                        handleChange={handleChange}
                        label="Cena do"
                        prompt="neuveden"
                        value={filter.maxPrice ? filter.maxPrice : ''}
                    />
                </div>

                <div className="col">
                    <InputField
                        type="number"
                        min="1"
                        name="limit"
                        handleChange={handleChange}
                        label="Limit počtu faktur"
                        prompt="neuveden"
                        value={filter.limit ? filter.limit : ''}
                    />
                </div>
            </div>
            
            <div className="row">
                <div className="col statistic">
                    <input
                        type="submit"
                        className="btn float-right mt-2 highlighted-button filtr-button"
                        value={props.confirm}
                    />
                    <button
                        type="button"
                        className="btn float-right mt-2 highlighted-button remove-button"
                        onClick={handleReset}
                    >
                        Reset
                    </button>
                </div>
            </div>
        </form>
    );
};

export default InvoiceFilter;
