import './money.css';
import exbtn from '../images/exchangebtn.png';
import usd from '../images/usd.png';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function Exchange({ rates }) {
    const [sourceCurrency, setSourceCurrency] = useState('USD');
    const [targetCurrency, setTargetCurrency] = useState('INR');
    const [exchangeRate, setExchangeRate] = useState(null);
    const [amount, setAmount] = useState(1000); // Default amount

    const handleExchange = () => {
        const rate = rates.find(
            rate => rate.source === sourceCurrency && rate.target === targetCurrency
        );
        setExchangeRate(rate ? rate.rate : 'Rate not available');
    };

    useEffect(() => {
        // Reset amount to 1000 when source currency changes
        setAmount(1000);
    }, [sourceCurrency]);

    return (
        <div>
            <div className='row exchange-money'>
                <div className='col-lg-4 money-sec1'>
                    <select
                        id="sourceCurrency"
                        name="sourceCurrency"
                        value={sourceCurrency}
                        onChange={(e) => setSourceCurrency(e.target.value)}
                    >
                        {Array.from(new Set(rates.map(rate => rate.source))).map((source, index) => (
                            <option key={index} value={source}>
                                {/* {React.createElement(flags[currencyToCountry[source]])} */}
                                {source}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='col-lg-4 ex-button'>
                    <img 
                        src={exbtn} 
                        alt="exchange-btn" 
                        className='exchange-btn' 
                        onClick={handleExchange}
                        style={{ cursor: 'pointer' }}
                    />
                </div>
                <div className='col-lg-4 money-sec2'>
                    <select
                        id="targetCurrency"
                        name="targetCurrency"
                        value={targetCurrency}
                        onChange={(e) => setTargetCurrency(e.target.value)}
                    >
                        {Array.from(new Set(rates.map(rate => rate.target))).map((target, index) => (
                            <option key={index} value={target}>
                                {/* {React.createElement(flags[currencyToCountry[target]])} */}
                                {target}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className='row mid-market'>
                <div className='col-lg-6 mid-sec1'>
                    {exchangeRate !== null ? (
                        <h4><span>1 {sourceCurrency}</span>: <span>{exchangeRate} {targetCurrency}</span></h4>
                    ) : (
                        <h4>Select currencies and click the exchange button to see the rate</h4>
                    )}
                    <p>Mid Market exchange rate less than a minute ago</p>
                </div>
                <div className='col-lg-6 row mid-sec2'>
                    <div className='col-lg-6'>
                        <p className='you-send'>You Send</p>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className='amount-input'
                        />
                    </div>
                    <div className='col-lg-6 mid-sec3'>
                        <img src={usd} alt="curr-logo" width="26px"></img>
                        <p>{sourceCurrency}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

Exchange.propTypes = {
    rates: PropTypes.arrayOf(PropTypes.shape({
        source: PropTypes.string.isRequired,
        target: PropTypes.string.isRequired,
        rate: PropTypes.number.isRequired,
    })).isRequired,
};

Exchange.defaultProps = {
    rates: [],
};

export default Exchange;
