import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import Navbar from '../../Components/Navbar/Navbar';
import './Policy.css';
import Footer from '../../Components/Footer';
import policyImg from './images/Privacy-policy.png';


function Policy() {

  return (
    <div>
        <div>
            <Navbar/>
        </div>
        <section className='policy'>
          <div className='container'>

          <div className='title'>
          <h1 className='first'>Privacy Policy</h1>
          <h2 className='second'>For EasyPark</h2>
          </div>
          <img src={policyImg} className='photo'/>
          </div>
          
        </section>
        <hr className='line2' />
        <br />
        <section>
        <div className='main1'>
          <h1>Privacy Policy :</h1>
          <p><span style={{fontWeight:'800' ,color:'white'}}><br/>Introduction :</span><br/><br/>Welcome to EasyPark . We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website , use our services. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the website or use our services.<br/></p>
          <p > <span style={{fontWeight:'800',color:'white'}}><br/>Personal Information :</span><br/><br/>
            We may collect personal information that you voluntarily provide to us when you register on the app, use our services, or contact us. This information may include:<br/><br/>
            <ul className='menu'>
              <li>name</li>
              <li>Email address</li>
              <li>Payment information</li>

            </ul>
          </p>          
          <p style={{fontWeight:'800'}}><br/>Automatically Collected Information : <br/><br/></p>
          When you use our app, we may automatically collect information about your device and usage, including:<br/><br/>

          <ul className='menu'>
            <li>Device information (IP address, browser type)</li>
          <li>Usage details (access times, pages viewed, link clicks)</li>
          <li>Location data (if you permit us to access location services)</li>
          </ul>

          <p style={{fontWeight:'800'}}><br />Use of Your Information <br /><br /></p>
          <p>We use the information we collect in various ways, including to:<br/><br /></p>
          <ul className='menu'>
          <li>Provide, operate, and maintain our web app</li>
          <li>Improve, personalize, and expand our web app</li>
          <li>Understand and analyze how you use our web app</li>
          <li>Develop new products, services, features, and functionality</li>
          <li>Process your transactions and manage your orders</li>
          <li>Send you text messages and push notifications</li>
          </ul>  
          <br />
          <br />
          <p style={{fontWeight:'800'}}>Security of Your Information <br /><br /></p>
          <p>We use administrative, technical, and physical security measures to help protect your personal information, While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse. <br />
          </p>
          <br />
          <br />
          </div>
        </section>



<div>
<Footer/>

</div>
    </div>
    
  )
}

export default Policy