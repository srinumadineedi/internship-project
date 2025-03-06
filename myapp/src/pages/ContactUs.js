import React, { useState } from 'react';

function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      console.error('Form submission error: All fields are required.');
      alert('Please fill in all fields.');
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', message: '' }); // Reset form
        setShowPopup(true);  // Show the popup
        setTimeout(() => {
          setShowPopup(false); // Hide the popup after 3 seconds (adjust as needed)
        }, 3000);
      } else {
        const errorData = await response.json();
        console.error('Submission failed:', response.status, errorData);
        alert(`Submission failed: ${errorData.message || 'Something went wrong'}`);
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <>
      <style>
        {`
          .contact-container {
            max-width: 700px;
            margin: 30px auto;
            padding: 30px;
            background-color: #e6f7ff;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            position: relative;  /* For absolute positioning of popup */
          }

          .contact-container h2 {
            text-align: center;
            color: #333;
            margin-bottom: 25px;
          }

          .form-group {
            margin-bottom: 20px;
          }

          .form-group label {
            display: block;
            margin-bottom: 8px;
            color: #555;
            font-weight: 600;
          }

          .form-control {
            width: 100%;
            padding: 12px;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 16px;
            color: #444;
            transition: border-color 0.3s;
          }

          .form-control:focus {
            border-color: #007bff;
            outline: none;
            box-shadow: 0 0 5px rgba(0, 123, 255, 0.25);
          }

          .form-textarea {
            resize: vertical;
            height: 150px;
          }

          .btn-primary {
            background-color: #007bff;
            color: #fff;
            padding: 12px 25px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 17px;
            transition: background-color 0.3s;
          }

          .btn-primary:hover {
            background-color: #0056b3;
          }

          .success-message {
            margin-top: 20px;
            padding: 15px;
            background-color: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
            border-radius: 5px;
            text-align: center;
          }

          .popup {
            position: absolute;
            top: 10px;
            right: 10px;
            background-color: #4CAF50; /* Green */
            color: white;
            text-align: center;
            border-radius: 6px;
            padding: 10px;
            z-index: 1000; /* Ensure it's on top of everything */
            opacity: 0.9; /* Slightly transparent */
          }
        `}
      </style>

      <div className="contact-container">
        <h2>Contact Us</h2>
        {isSubmitted ? (
          <div className="success-message">
            Thank you! Your message has been sent successfully.
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                className="form-control form-textarea"
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Send Message</button>
          </form>
        )}
        {showPopup && (
          <div className="popup">
            Thank you for contacting us!
          </div>
        )}
      </div>
      
    </>
  );
}

export default ContactUs;