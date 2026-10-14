import { useState } from "react";

import "./Connect.css";

function Connect() {
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("Email submitted:", email);

    setEmail("");
  };

  return (
    <section className="connect">

      <div className="connect-container">

        <div className="connect-content">

          <p className="connect-label">
            Let's connect
          </p>

          <h2 className="connect-title">
            Want to get in <em>touch?</em>
          </h2>

          <p className="connect-description">
            Drop your email below and let's connect.
          </p>

        </div>


        <form
          className="connect-form"
          onSubmit={handleSubmit}
        >

          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter your email"
            aria-label="Your email address"
            required
          />

          <button type="submit">
            Connect
          </button>

        </form>

      </div>

    </section>
  );
}

export default Connect;