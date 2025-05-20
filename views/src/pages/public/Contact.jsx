import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import Footer from "./Footer"; 
import "./contact.css";

const ContactUs = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_b6qigmk",
        "template_bvpc2he",
        form.current,
        "wPrGr1VgKVPOQciW6"
      )
      .then(
        (result) => {
          alert("Message sent successfully!");
          form.current.reset();
        },
        (error) => {
          alert("Failed to send message. Try again.");
          console.error(error);
        }
      );
  };

  return (
    <div className="page-wrapper"> {/* full height layout */}
      <div className="contact-page-wrapper"></div>
      <div className="contact-container">
        <h2>Contact Us</h2>
        <div className="contact-wrapper">
          <form ref={form} onSubmit={sendEmail} className="contact-form">
            <input type="text" name="user_name" placeholder="Your Name" required />
            <input type="email" name="user_email" placeholder="Your Email" required />
            <textarea name="message" rows="6" placeholder="Your Message" required />
            <button type="submit">Send Message</button>
          </form>
          <div className="contact-info">
            <h3>Reach Us At</h3>
            <p>Email: support@zebaish.com</p>
            <p>Phone: +91 98765 43210</p>
            <p>Address: 123, Pet Street, Mumbai, India</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactUs;
