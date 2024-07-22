"use client";

import { useState } from 'react';
import { formatText } from '../../utils/formatText'; // Adjust the import path as necessary

interface Errors {
  name?: string;
  email?: string;
  message?: string;
}

const ContactPage = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [errors, setErrors] = useState<Errors>({});
  const [success, setSuccess] = useState<boolean>(false);

  const [submittedName, setSubmittedName] = useState<string>('');
  const [submittedEmail, setSubmittedEmail] = useState<string>('');
  const [submittedMessage, setSubmittedMessage] = useState<string>('');

  const validate = () => {
    const newErrors: Errors = {};

    if (!name.trim()) newErrors.name = 'Name is required';
    else if (name.length < 3 || name.length > 32 || /[^a-zA-Z\s]/.test(name)) {
      newErrors.name = 'Name must be between 3-32 characters and contain only letters and spaces';
    }

    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Email is invalid , ex(example@example.com)';

    if (!message.trim()) newErrors.message = 'Message is required';
    else if (message.length < 3 || message.length > 80) {
      newErrors.message = 'Message must be between 3-80 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formattedName = formatText(name);
    const formattedEmail = email.trim(); // Email doesn't need the same formatting
    const formattedMessage = formatText(message);

    setName(formattedName);
    setEmail(formattedEmail);
    setMessage(formattedMessage);

    if (validate()) {
      setSuccess(true);
      setSubmittedName(formattedName);
      setSubmittedEmail(formattedEmail);
      setSubmittedMessage(formattedMessage);
      setName('');
      setEmail('');
      setMessage('');
      setTimeout(() => setSuccess(false), 3000);

    }
  };

  return (
    <>
    <style jsx>{`
        .contact-us-container{
          position: relative;
          margin: 1rem -.75rem 0;
          border: solid #dee2e6;
          padding: 1.5rem;
          margin-right: 0;
          margin-left: 0;
          border-width: 1px;
          border-top-left-radius: .25rem;
          border-top-right-radius: .25rem;
        }
        .contact-us-form-control{
          display: block;
          width: 100%;
          padding: .375rem .75rem;
          font-size: 1rem;
          font-weight: 400;
          line-height: 1.5;
          color: #212529;
          background-color: #fff;
          background-clip: padding-box;
          border: 1px solid #ced4da;
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          border-radius: .25rem;
          transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
        }
        .contact-us-button-submit{
          background-color: deepskyblue;
          color: #ffff;
          padding: 5px 10px;
        }
      `}</style>

      {success && (
        <div className="modal-blog z-50">
          <div className="modal-blog-content">
            <p>Form submitted successfully!</p>
            <p>Name: {submittedName}</p>
            <p>Email: {submittedEmail}</p>
            <p>Message: {submittedMessage}</p>
            <button className="modal-blog-button" onClick={() => setSuccess(false)}>OK</button>
          </div>
        </div>
      )}
      <div className='container mx-auto p-8'>
        <h1 className='text-3xl font-bold'>Contact Us</h1>
      <form onSubmit={handleSubmit}>
        <div className='contact-us-container'>
          <div className='mb-3'>
            <label className='mb-2'>Name</label>
            <input
              type="text"
              value={name}
              className='contact-us-form-control'
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
          </div>
          <div className='mb-3'>
            <label className='mb-2'>Email</label>
            <input
              type="text"
              value={email}
              className='contact-us-form-control'
              onChange={(e) => setEmail(e.target.value.trim())}
            />
            {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
          </div>
          <div className='mb-3'>
            <label className='mb-2'>Message</label>
            <textarea
              value={message}
              className='contact-us-form-control'
              onChange={(e) => setMessage(e.target.value)}
            />
            {errors.message && <p style={{ color: 'red' }}>{errors.message}</p>}
            <p>{message.length}/80</p>
          </div>
          <button className='contact-us-button-submit' type="submit">Submit</button>
        </div>
      </form>
    </div>
    </>
  );
};

export default ContactPage;
