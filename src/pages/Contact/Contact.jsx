import { useState } from "react";

import PageHeader from "../../components/PageHeader/PageHeader";
import SpecularButton from "../../components/SpecularButton/SpecularButton";

import "./Contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("Contact form submitted:", formData);

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <main className="page contact-page">

      <PageHeader
        label="Get in touch"
        title={<>Contact <em>Me</em></>}
        subtitle="Have a question, want to work together, or just want to say hello? Feel free to reach out."
      />


      {/* =========================
          Contact Content
          ========================= */}

      <section className="contact-content">

        {/* Contact Information */}

        <div className="contact-info">

          <h2>
            Let's connect
          </h2>

          <p>
            I'm always open to discussing new projects,
            opportunities, ideas, or interesting
            conversations.
          </p>


          <div className="contact-items">

            {/* Email */}

            <div className="contact-item">

              <span className="contact-item-label">
                Email
              </span>

              <a href="mailto:your@email.com">
                your@email.com
              </a>

            </div>


            {/* LinkedIn */}

            <div className="contact-item">

              <span className="contact-item-label">
                LinkedIn
              </span>

              <a
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                rel="noopener noreferrer"
              >
                linkedin.com/in/yourusername
              </a>

            </div>


            {/* GitHub */}

            <div className="contact-item">

              <span className="contact-item-label">
                GitHub
              </span>

              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
              >
                github.com/yourusername
              </a>

            </div>

          </div>

        </div>


        {/* Contact Form */}

        <form
          className="contact-form"
          onSubmit={handleSubmit}
        >

          <div className="form-row">

            <div className="form-group">

              <label htmlFor="name">
                Name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                required
              />

            </div>


            <div className="form-group">

              <label htmlFor="email">
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
              />

            </div>

          </div>


          <div className="form-group">

            <label htmlFor="subject">
              Subject
            </label>

            <input
              id="subject"
              name="subject"
              type="text"
              value={formData.subject}
              onChange={handleChange}
              placeholder="What would you like to talk about?"
              required
            />

          </div>


          <div className="form-group">

            <label htmlFor="message">
              Message
            </label>

            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your message..."
              rows="6"
              required
            />

          </div>


          <div className="contact-submit-wrap">
            <SpecularButton
              type="submit"
              size="lg"
              radius={999}
              tint="#ffffff"
              tintOpacity={1}
              textColor="#000000"
              lineColor="#ffffff"
              baseColor="#e5e5e5"
              intensity={1}
              shineSize={14}
              shineFade={45}
              thickness={1.2}
              speed={0.4}
              followMouse
              proximity={280}
            >
              Send Message
            </SpecularButton>
          </div>

        </form>

      </section>

    </main>
  );
}

export default Contact;