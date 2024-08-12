// FlagDisplay.js
import React from 'react';
import { countryDetails } from './countryDetails';

const FlagDisplay = ({ currencyCode }) => {
  const { name, flag } = countryDetails[currencyCode] || { name: 'Unknown', flag: '🏳️' };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '24px'
      }}>
        {flag}
      </div>
      <span style={{ marginLeft: '10px' }}>{name}</span>
    </div>
  );
};

export default FlagDisplay;
