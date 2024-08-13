import './footer.css';
import logo from '../images/footer-logo.png';
import React from 'react';
// import About from '../Pages/about.js';


function Footer() {
    return (
      <div className='footer'>
        <div className='row '>
            <div className='col-lg-3'>
                <img src={logo} alt='footer-logo' width="80%"></img>
            </div>
            <div className='col-lg-3'>
               <a href="http://localhost:3000"><p>About Us</p></a>
               {/* <link to='/About'> <p>About Us</p></link> */}
            </div>     
            <div className='col-lg-3'>
               <a href='http://localhost:3000/'><p>Privacy Policy</p></a>
            </div>  
            <div className='col-lg-3'>
               <a href='http://localhost:3000/'><p>Terms of Use</p></a>
            </div>         
            
          
        </div>
        <div className='copyright'>
            <p>Copyright 2024 PAYZ</p>
        </div>
      </div>  
    );
}

export default Footer;