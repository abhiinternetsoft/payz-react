import React, { useState, useEffect } from 'react';
import Rate from './main';

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
      {rates.length > 0 ? (
        <Rate rates={rates} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserList;
