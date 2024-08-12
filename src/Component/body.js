import './body.css';
import React from 'react';
import arrow from '../images/right-up.svg'

function Main() {
    return(
        <div className='headings-title'>
            <h1>Get the Best Exchange Rates <br/> Instantly</h1>
            <p>Fast, Secure, and reliable currency exchange services</p>
            <button>Get Started <img src={arrow} alt="button-icon" width="40px" className='arrow-head'></img></button>
        </div>
    );
}

export default Main;