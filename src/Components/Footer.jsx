import React from 'react'
import "../Components/Footer.css";
import fb from '../Images/facebook.png';
import twitter from '../Images/twitter.png';
import linkedin from '../Images/linkedin.png';
import insta from '../Images/instagram.png';


function Footer( ) {
  return (
    <div className='footer'>
      <div  className='sb_footer__padding'>
        <div className='sb_footer-links'>
          <div className='sb__footer-links_div'>
            <h4>For Business</h4>
            <a href="##">
              <p>Omar Yasin</p>
            </a>
            <a href="##">
              <p>Samer Samara</p>
            </a>
            <a href="##">
              <p>Omar Sanjaq</p>
            </a>
          </div>
          <div className='sb__footer-links_div'>
            <h4>Resources</h4>
            <a href="##">
              <p>rrr1</p>
            </a>
            <a href="##">
              <p>rrr2</p>
            </a>
            <a href="##">
              <p>rrr3</p>
            </a>
          </div>
          <div className='sb__footer-links_div'>
          <h4>Partners</h4>
            <a href="##">
              <p>PPPP2</p>
            </a>
            
          </div>
          <div className='sb__footer-links_div'>
          <h4>Company</h4>
          <a href="##">
              <p>About</p>
            </a>
            <a href="##">
              <p>AA2</p>
            </a>
            <a href="##">
              <p>contact</p>
            </a>
          </div>
          <div className='sb__footer-links_div'>
            <h4>Coming Soon On</h4>
          <div className='socialmedia'>
            <a href='##'><img src={fb} alt="" /></a>
            <a href='##'><img src={twitter} alt="" /></a>
            <a href='##'><img src={insta} alt="" /></a>
            <a href='##'><img src={linkedin} alt="" /></a>

            </div>
          </div>
        </div>
       <hr></hr>
       <div className='sb_footer-below'>
        <div className='sb_footer-copyright'>
          <p>
            @{new Date().getFullYear()} EasyPark. All right Saved.
          </p>
        </div>
        <div  className='sb_footer-below-links'> 
        <a href="/terms"><div><p>Termms </p></div></a>
        <a href="/terms"><div><p>Privacy</p></div></a>
        <a href="/terms"><div><p>Security</p></div></a>
        <a href="/terms"><div><p>Cookie Declaration</p></div></a>

        </div>
       </div>
      </div>
    </div>
  )
}

export default Footer