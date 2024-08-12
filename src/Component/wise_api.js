import React, { useState, useEffect } from 'react';
import Exchange from './money';
// import Rate from './main.js' 



const UserList = () => {
  const [rates, setRates] = useState([]);
  
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
        console.log(data);
      } catch (error) {
        console.error('Error fetching rates:', error);
      }
    };

    fetchExchangeRates();
  }, []);
  
  return (
    <div>
      {/* <h1>Exchange Rates</h1> */}
      
      {rates.length > 0 ? (
        
           <Exchange rates={rates} />
           
          // <div key={index}>
          //   <p>From: {rate.source}</p>
          //   <p>To: {rate.target}</p>
          //   <p>Rate: {rate.rate}</p>
          // </div>
        
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserList;
