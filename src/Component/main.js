import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import './money.css';
import './table.css';
import exbtn from '../images/exchangebtn.png';
// import usd from '../images/usd.png';
import { countryDetails } from './countrydetails';
import construction from '../images/construction.webp';
import wiseLogo from '../images/wiseLogo.svg';


const ExchangeRate = () => {
  const [rates, setRates] = useState([]);
  const [sourceCurrency, setSourceCurrency] = useState('USD');
  const [targetCurrency, setTargetCurrency] = useState('INR');
  const [exchangeRate, setExchangeRate] = useState(null);
  const [amount, setAmount] = useState(1000); // Default amount
  const [data, setData] = useState([]);
  const [isSourceOpen, setIsSourceOpen] = useState(false);
  const [isTargetOpen, setIsTargetOpen] = useState(false);
  const [sourceSearch, setSourceSearch] = useState('');
  const [targetSearch, setTargetSearch] = useState('');
  
  const sourceDropdownRef = useRef(null);
  const targetDropdownRef = useRef(null);



  // Fetch exchange rates
  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await fetch('https://api.sandbox.transferwise.tech/v1/rates', {
          headers: {
            'Authorization': `Bearer ${process.env.REACT_APP_WISE_API_KEY}`
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setRates(data);
        // console.log(data);
      } catch (error) {
        console.error('Error fetching rates:', error);
      }
    };

    fetchExchangeRates();
  }, []);
  
  


  // Handle exchange rate calculation
  const handleExchange = () => {
    const rate = rates.find(
      rate => rate.source === sourceCurrency && rate.target === targetCurrency
    );
    setExchangeRate(rate ? rate.rate : 'Rate not available');
  };

  // searchbar for countries 
  
  const handleSourceCurrencyChange = (currency) => {
    console.log('Selected source currency:', currency);
    setSourceCurrency(currency);
    setIsSourceOpen(false);
  };

  const handleTargetCurrencyChange = (currency) => {
    console.log('Selected source currency:', currency);
    setTargetCurrency(currency);
    setIsTargetOpen(false);
  };

  const filteredSourceCountries = rates
    .map(rate => rate.source)
    .filter(source => countryDetails[source]?.name.toLowerCase().includes(sourceSearch.toLowerCase()));

  const filteredTargetCountries = rates
    .map(rate => rate.target)
    .filter(target => countryDetails[target]?.name.toLowerCase().includes(targetSearch.toLowerCase()));




      // Close the dropdown when clicking outside
  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (sourceDropdownRef.current && !sourceDropdownRef.current.contains(event.target)) {
  //       setIsSourceOpen(false);
  //     }
  //     if (targetDropdownRef.current && !targetDropdownRef.current.contains(event.target)) {
  //       setIsTargetOpen(false);
  //     }
  //   };

  //   document.addEventListener('mousedown', handleClickOutside);
  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, []);
  
  
  
  // Function to determine the dot color
  const getDotColor = (provider) => {
    const preferredProviders = [
      'Wise',
      'Andrews Federal Credit Union',
      'Stanford Federal Credit Union',
      'Zolve'
    ];
    
    return preferredProviders.includes(provider) ? 'green-dot' : 'red-dot';
  };
  
  const isWiseProvider = (provider) => {
    return [
      'Andrews Federal Credit Union',
      'Stanford Federal Credit Union',
      'Zolve',
      'Wise'
    ].includes(provider);
  };
  
  const isPoweredByWiseProvider = (provider) => {
    return [
      'Andrews Federal Credit Union',
      'Stanford Federal Credit Union',
      'Zolve'
    ].includes(provider);
  };
    

  // Fetch and filter table data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.transferwise.com/v3/comparisons/', {
          params: {
            sourceCurrency,
            targetCurrency,
            sendAmount: amount
          },
          headers: {
            'Authorization': `Bearer ${process.env.REACT_APP_WISE_API_KEY}`
          }
        });

        // console.log('API Response:', response.data);
        
        // Filter the providers
        const filteredData = response.data.providers.filter(provider =>
          response.data
        );
        
        // Sort the filtered data by received amount in descending order
        filteredData.sort((a, b) => b.quotes[0].receivedAmount - a.quotes[0].receivedAmount);

        setData(filteredData); // Set the filtered and sorted data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [sourceCurrency, targetCurrency, amount]);
  
  


  return (
  <div>
    <div className='desktop-view'>
      {/* ============================================ */}
        
      <div className='row exchange-money'>
        <div className='col-lg-4  money-sec1'>
          <div className="dropdown-container" ref={sourceDropdownRef}>
            <div onClick={() => setIsSourceOpen(!isSourceOpen)}>
              <button className="currency-button">
                {countryDetails[sourceCurrency]?.flag} {countryDetails[sourceCurrency]?.name} ({sourceCurrency})
              </button>
            </div>
            {isSourceOpen && (
              <div className="dropdown-content">
                <input
                  type="text"
                  placeholder="Search currency"
                  value={sourceSearch}
                  onChange={(e) => setSourceSearch(e.target.value)}
                  className="currency-search-bar"
                />
                <ul className="currency-list">
                  {filteredSourceCountries.map((source, index) => (
                    <li key={index} onClick={() => handleSourceCurrencyChange(source)}>
                      {countryDetails[source]?.flag} {countryDetails[source]?.name} ({source})
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className='col-lg-4  ex-button'>
          <img
            src={exbtn}
            alt="exchange-btn"
            className='exchange-btn'
            onClick={handleExchange}
            style={{ cursor: 'pointer' }}
          />
        </div>
        <div className='col-lg-4 money-sec2'>
          <div className="dropdown-container" ref={targetDropdownRef}>
            <div onClick={() => setIsTargetOpen(!isTargetOpen)}>
              <button className="currency-button">
                {countryDetails[targetCurrency]?.flag} {countryDetails[targetCurrency]?.name} ({targetCurrency})
              </button>
            </div>
            {isTargetOpen && (
              <div className="dropdown-content">
                <input
                  type="text"
                  placeholder="Search currency"
                  value={targetSearch}
                  onChange={(e) => setTargetSearch(e.target.value)}
                  className="currency-search-bar"
                />
                <ul className="currency-list">
                  {filteredTargetCountries.map((target, index) => (
                    <li key={index} onClick={() => handleTargetCurrencyChange(target)}>
                      {countryDetails[target]?.flag} {countryDetails[target]?.name} ({target})
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* ================================================= */}
      
      <div className='row mid-market'>
        <div className='col-lg-6 mid-sec1'>
          {exchangeRate !== null ? (
            <h4>
              <span>1 {sourceCurrency}</span>: <span>{exchangeRate} {targetCurrency}</span>
              <span className={getDotColor('Wise')}></span>
            </h4>
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
            {countryDetails[sourceCurrency]?.flag}
           
            <p>{sourceCurrency}</p>
          </div>
        </div>
      </div>
      <div className='table-cons desktop_view'>
        {data.length > 0 ? (
          <table className="table">
            <thead>
              <tr className='table-head'>
                <th className=' col-table1' scope="col">Provider</th>
                <th className=' col-table2' scope="col">Exchange rate
                <div className='col-lg-6 exchange-rate-price'>
                      
                        <h4>
                          <span> (1 {sourceCurrency}</span>: <span> {targetCurrency})</span>
                          {/* <span className={getDotColor('Wise')}></span> */}
                        </h4>
                  </div>
                </th>
                <th className=' col-table3' scope="col">Transfer Fee</th>
                <th className=' col-table4' scope="col">Recipient gets
                  
                <div className=''>
                  <div className="exchange-rate-info">
                   
                    <p>
                     ( Sending {amount}  {sourceCurrency} )
                    </p>
                    {/* <p>
                      {exchangeRate ? `${(amount * exchangeRate).toFixed(2)} ${targetCurrency}` : 'Rate not available'}
                    </p> */}
                  </div>
                </div>
                                  
                </th>
              </tr> 
            </thead>
            <tbody>
              {data.map((item, index) => {
                 const difference = index === 0 ? 0 : data[0].quotes[0].receivedAmount - item.quotes[0].receivedAmount;
                 return (
                <tr key={index}>
                  <th scope="row">
                    <img src={item.logo} alt="provider" width="100px" />                  
                    {isPoweredByWiseProvider(item.name) && (
                      <div className="powered-by-wise">
                        <span className='powered-by'>Powered by</span>
                        <span><img src={wiseLogo} alt="Wise Logo" width="60px" /></span>
                      </div>
                    )}
                  </th>
                  <td className='Quote-rate'>
                    {item.quotes[0].rate}
                    <span className={getDotColor(item.name)}></span>
                    {isWiseProvider(item.name) && (
                      <p className="transparent-fee-label"> Mid Market Rate</p>
                    )}
                  </td>
                  <td className='Quote-fee'>{item.quotes[0].fee} {sourceCurrency}
                    {isWiseProvider(item.name) && (
                      <p className="transparent-fee-label"> Transparent Fee</p>
                    )}
                  </td>
                  {/* <td className='received-amount'>{item.quotes[0].receivedAmount} {targetCurrency}</td> */}
                  
                  <td className='received-amount'>
                      {item.quotes[0].receivedAmount} {targetCurrency}
                      {difference !== 0 && (
                        <p className="difference-label">-{difference.toFixed(2)} {targetCurrency}</p>
                      )}
                    </td> 
                </tr>
                 );
})}
            </tbody>
          </table>
        ) : (
          <div className="loading-data">
            <img src={construction} width="200px" alt="404 Error" />
            <h4>There are thousands of banks in the world – we haven’t gotten to them all yet.</h4>
            <p>Sorry – we can’t show you that comparison. It’s either because we don’t have reliable information from the provider,
              you searched for a route we don’t support, or the amount you entered is above the maximum quote we can collect.</p>
          </div>
        )}
      </div>
      
    </div>
      
      {/* =========== mobile view ===================== */}
      
    <div className='mobile_view'>
      <div>
      <div className='exchange-money'>
        <div className='money-sec1'>
          <div className="dropdown-container" ref={sourceDropdownRef}>
            <button className="currency-button" onClick={() => setIsSourceOpen(!isSourceOpen)}>
              {countryDetails[sourceCurrency]?.flag} {countryDetails[sourceCurrency]?.name} ({sourceCurrency})
            </button>
            {isSourceOpen && (
              <div className="dropdown-content">
                <input
                  type="text"
                  placeholder="Search currency"
                  value={sourceSearch}
                  onChange={(e) => setSourceSearch(e.target.value)}
                  className="currency-search-bar"
                />
                <ul className="currency-list">
                  {filteredSourceCountries.map((source, index) => (
                    <li key={index} onClick={() => handleSourceCurrencyChange(source)}>
                      {countryDetails[source]?.flag} {countryDetails[source]?.name} ({source})
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className='ex-button'>
          <img
            src={exbtn}
            alt="exchange-btn"
            className='exchange-btn'
            onClick={handleExchange}
          />
        </div>
        <div className='money-sec2'>
          <div className="dropdown-container" ref={targetDropdownRef}>
            <button className="currency-button" onClick={() => setIsTargetOpen(!isTargetOpen)}>
              {countryDetails[targetCurrency]?.flag} {countryDetails[targetCurrency]?.name} ({targetCurrency})
            </button>
            {isTargetOpen && (
              <div className="dropdown-content">
                <input
                  type="text"
                  placeholder="Search currency"
                  value={targetSearch}
                  onChange={(e) => setTargetSearch(e.target.value)}
                  className="currency-search-bar"
                />
                <ul className="currency-list">
                  {filteredTargetCountries.map((target, index) => (
                    <li key={index} onClick={() => handleTargetCurrencyChange(target)}>
                      {countryDetails[target]?.flag} {countryDetails[target]?.name} ({target})
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className='mid-market'>
        <div className='mid-sec1'>
          {exchangeRate !== null ? (
            <h4>
              <span>1 {sourceCurrency}</span>: <span>{exchangeRate} {targetCurrency}</span>
              <span className={getDotColor('Wise')}></span>
            </h4>
          ) : (
            <h4>Select currencies and click the exchange button to see the rate</h4>
          )}
          <p>Mid Market exchange rate less than a minute ago</p>
        </div>
        <div className='mid-sec2'>
          <p className='you-send'>You Send</p>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className='amount-input'
          />
        </div>
      </div>

      <div className='table-cons'>
        {data.length > 0 ? (
          data.map((item, index) => {
            const difference = index === 0 ? 0 : data[0].quotes[0].receivedAmount - item.quotes[0].receivedAmount;
            return (
              <div className="card" key={index}>
                <div className="card-item card-image">
                 
                  <img src={item.logo} alt="provider" width="100px" />
                </div>
                {isPoweredByWiseProvider(item.name) && (
                  <div className="card-item powered-by-wise">
                    <span>Powered by:</span>
                    <img src={wiseLogo} alt="Wise Logo" width="60px" />
                  </div>
                )}
                <div className="card-item card-exchange">
                  <strong className='mobile_rate'>Exchange rate:</strong>
                  <span className='mobile_value'>{item.quotes[0].rate}</span>
                  <span className={getDotColor(item.name)}></span>
                  {/* {isWiseProvider(item.name) && (
                    <p className="transparent-fee-label">Mid Market Rate</p>
                  )} */}
                </div>
                <div className="card-item card-transfer">
                  <strong className='mobile_rate'>Transfer Fee:</strong>
                 <span className='mobile_value'> {item.quotes[0].fee} {sourceCurrency} </span>
                  {/* {isWiseProvider(item.name) && (
                    <p className="transparent-fee-label">Transparent Fee</p>
                  )} */}
                </div>
                <div className="card-item card-recipient">
                  <strong className='mobile_rate' >Recipient gets:</strong>
                  <strong className='mobile_value'>{item.quotes[0].receivedAmount} {targetCurrency}</strong>
                 <div> {difference !== 0 && (
                    <p className="difference-label">-{difference.toFixed(2)} {targetCurrency}</p>
                  )}</div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="loading-data">
            <img src={construction} width="200px" alt="404 Error" />
            <h4>There are thousands of banks in the world – we haven’t gotten to them all yet.</h4>
            <p>Sorry – we can’t show you that comparison. It’s either because we don’t have reliable information from the provider, you searched for a route we don’t support, or the amount you entered is above the maximum quote we can collect.</p>
          </div>
        )}
      </div>
    </div>
    </div>   
      
  </div>  
  
  );
};

ExchangeRate.propTypes = {
  rates: PropTypes.arrayOf(PropTypes.shape({
    source: PropTypes.string.isRequired,
    target: PropTypes.string.isRequired,
    // rate: PropTypes.number.isRequired,
  })),
};

export default ExchangeRate;
