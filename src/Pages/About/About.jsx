import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import img from './img/abou.jpg';
import Navbar from '../../Components/Navbar/Navbar';
import './About.css';
function About() {

  return (
    <div>
        <div>
            <Navbar/>
        </div>
        <section className='about'>
            <div className='container'>
                <img src={img} className='photo1'/>
                
            <p className='Parag'>
            <h1>Here you will find your perfect spot quick, secure, and free!</h1>
            
            <p className='talk'>
            Our mission is to make parking quick and easy for everyone,
             With just a few clicks, find and book your perfect spot in the city,
              Whether you're commuting to work or attending an event, <a href="#"className='link'>Easypark.com</a> has you covered, " Start parking smarter today ! "
              </p>
            
            </p>
            
            
            </div>

        </section>






        <section>

        </section>
    </div>
  )
}

export default About