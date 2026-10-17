import { useState } from "react";

import { displayUrl, profile } from "../../data/profile";

import PageHeader from "../../components/PageHeader/PageHeader";
import SpecularButton from "../../components/SpecularButton/SpecularButton";

import "./Contact.css";

const contactLinks = [
  {
    label: "Email",
    href: `mailto:${profile.email}`,
    text: profile.email,
  },
  {
    label: "LinkedIn",
    href: profile.linkedin,
    text: displayUrl(profile.linkedin),
    external: true,
  },
  {
    label: "GitHub",
    href: profile.github,
    text: displayUrl(profile.github),
    external: true,
  },
];

// Some mail apps cut off mailto: links past ~2,000 characters.
const MESSAGE_MAX_LENGTH = 1500;

// There's no backend: submitting opens the visitor's own email app with the
// message filled in and addressed to profile.email.
function buildMailto({ name, subject, message }) {
  const body = `${message}\n\n— ${name}`;

  return `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    message: "",
  });

  const [opened, setOpened] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    window.location.href = buildMailto(formData);

    setOpened(true);
  };

  return (
    <main className="page contact-page">

      <PageHeader
        label="Get in touch"
        title="Contact"
        titleAccent="Me"
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
            {contactLinks.map((link) => (
              <div
                key={link.label}
                className="contact-item"
              >

                <span className="contact-item-label">
                  {link.label}
                </span>

                <a
                  href={link.href}
                  {...(link.external && {
                    target: "_blank",
                    rel: "noopener noreferrer",
                  })}
                >
                  {link.text}
                </a>

              </div>
            ))}
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
                maxLength={100}
                required
              />

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
                placeholder="What's this about?"
                maxLength={150}
                required
              />

            </div>

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
              maxLength={MESSAGE_MAX_LENGTH}
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

          <p
            className="form-status"
            role="status"
          >
            {opened && (
              <>
                Your email app should now be open with the message ready
                to send. Nothing opened? Email me at{" "}
                <a href={`mailto:${profile.email}`}>{profile.email}</a>.
              </>
            )}
          </p>

        </form>

      </section>

    </main>
  );
}

export default Contact;