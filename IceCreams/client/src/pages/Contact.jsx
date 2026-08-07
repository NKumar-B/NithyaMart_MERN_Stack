import { useState } from 'react'
import { FiMapPin, FiPhone, FiMail, FiClock } from 'react-icons/fi'

export default function Contact() {
  const [sent, setSent] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 3000)
  }

  return (
    <div className="page-shell">
      <div className="container">
        <div className="page-header">
          <span className="section-eyebrow">We'd Love to Hear From You</span>
          <h1>Contact Us</h1>
          <p>Questions about an order, a store visit, or a bulk booking? Write to us.</p>
        </div>

        <div className="contact-layout">
          <form className="contact-form" onSubmit={submit}>
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <input type="text" placeholder="Subject" required />
            <textarea placeholder="Your Message" required />
            <button className="btn btn-primary" type="submit">
              {sent ? 'Message Sent ✓' : 'Send Message'}
            </button>
          </form>

          <div className="contact-info">
            <div className="contact-info-item">
              <FiMapPin />
              <div><h4>Flagship Store</h4><p>12 MG Road, Bengaluru, Karnataka, India</p></div>
            </div>
            <div className="contact-info-item">
              <FiPhone />
              <div><h4>Call Us</h4><p>+91 98765 43210</p></div>
            </div>
            <div className="contact-info-item">
              <FiMail />
              <div><h4>Email</h4><p>hello@parlourhouse.in</p></div>
            </div>
            <div className="contact-info-item">
              <FiClock />
              <div><h4>Store Hours</h4><p>Every day, 11 AM – 11 PM</p></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
