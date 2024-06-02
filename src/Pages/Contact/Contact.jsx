import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import Navbar from '../../Components/Navbar/Navbar';
import "./Contact.css"
import { alignProperty } from '@mui/material/styles/cssUtils';

const EmailForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const serviceId = 'EasyPark';
    const templateId = 'template_x1zethy';
    const publicKey = '4_eN7jLz9XIutd1o6';

    const templateParams = {
      from_name: name,
      from_email: email,
      to_name: 'EasyPark',
      message: message,
    };

    emailjs
      .send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        console.log('Email sent successfully!', response);
        setName('');
        setEmail('');
        setMessage('');
      })
      .catch((error) => {
        console.error('Error sending email:', error);
      });
  };

  return (
    <div>
      <Navbar/>
      <br />
      <br />
      <br />

      <form onSubmit={handleSubmit} style={s.container}>
        <h2>Write us a Message .. 👇</h2>
        <br />

        <p style={{marginBottom:'5px', textAlign: 'left', fontSize: '14px' , marginLeft :'5px'}}>Enter your Email :</p>
        <input
          type="text"
          placeholder="..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={s.input}
        />
        <p style={{marginBottom:'5px', textAlign: 'left', fontSize: '14px' , marginLeft :'5px'}}>Enter your Name :</p>
        <input
          type="email"
          placeholder="..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={s.input}
        />
        <p style={{marginBottom:'5px', textAlign: 'left', fontSize: '14px' , marginLeft :'5px'}}>Enter your message :</p>
        <textarea
          cols="30"
          rows="10"
          placeholder="Talk here ..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={s.textarea}
        />
        <button type="submit" className='submitBtn'>
          Send Email
        </button>
      </form>
    </div>
  );
};

// Styles
const s = {
  container: {
    maxWidth: '500px',
    margin: '0 auto',
    padding: '20px',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '16px',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '16px',
    resize: 'vertical',
  },


};

export default EmailForm;
