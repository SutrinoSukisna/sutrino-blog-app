"use client";

import { useState } from 'react';

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

  const validate = () => {
    const newErrors: Errors = {};

    if (!name.trim()) newErrors.name = 'Name is required';
    else if (name.length < 3 || name.length > 32 || /[^a-zA-Z\s]/.test(name)) {
      newErrors.name = 'Name must be between 3-32 characters and contain only letters and spaces';
    }

    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Email is invalid';

    if (!message.trim()) newErrors.message = 'Message is required';
    else if (message.length < 3 || message.length > 80) {
      newErrors.message = 'Message must be between 3-80 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validate()) {
      setSuccess(true);
      setName('');
      setEmail('');
      setMessage('');
      setTimeout(() => setSuccess(false), 3000);
    }
  };

  return (
    <div>
      <h1>Contact Us</h1>
      {success && (
        <div className="modal">
          <p>Form submitted successfully!</p>
          <p>Name: {name}</p>
          <p>Email: {email}</p>
          <p>Message: {message}</p>
          <button onClick={() => setSuccess(false)}>OK</button>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value.trim())}
          />
          {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
        </div>
        <div>
          <label>Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value.trim())}
          />
          {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
        </div>
        <div>
          <label>Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value.trim())}
          />
          {errors.message && <p style={{ color: 'red' }}>{errors.message}</p>}
          <p>{message.length}/80</p>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ContactPage;
