import './table.css';
// import usd from '../images/usd.png';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Table() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://api.transferwise.com/v3/comparisons/', {
                    params: {
                        sourceCurrency: 'USD',
                        targetCurrency: 'INR',
                        sendAmount: 1000
                    },
                    headers: {
                        'Authorization': `Bearer ${process.env.REACT_APP_WISE_API_KEY}`
                    }
                });
                console.log('API Response:', response.data); 
                setData(response.data.providers || []); // Set data or empty array if not available
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className='table-cons'>
            <table className="table">
                <thead>
                    <tr className='table-head'>
                        <th scope="col">Provider</th>
                        <th scope="col">Exchange rate</th>
                        <th scope="col">Transfer Fee</th>
                        <th scope="col">Recipient gets</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((item, index) => (
                            <tr key={index}>
                                <th scope="row"><img src={item.logo} alt="provider" width="100px" /></th>
                                <td>{item.quotes[0].rate}</td>
                                <td>{item.quotes[0].fee}</td>
                                <td>{item.quotes[0].receivedAmount-1000 }</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">Loading...</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div> 
    );
}

export default Table;
