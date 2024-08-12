import './header.css';
import logo from '../images/logo.png';
import React from 'react';


function Heading() {
    return (
       <div className='Header-logo'>
            <img src={logo} alt='logo' width="200px"></img>
       </div>
        
    );
}

export default Heading;