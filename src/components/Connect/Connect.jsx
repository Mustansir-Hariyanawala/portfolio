import { profile } from "../../data/profile";

import SocialLinks from "../SocialLinks/SocialLinks";

import "./Connect.css";

function Connect() {
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
            Find me on GitHub and LinkedIn, or drop me an email.
          </p>

        </div>


        <div className="connect-links">

          <SocialLinks />

          <a
            href={`mailto:${profile.email}`}
            className="connect-email"
          >
            {profile.email}
          </a>

        </div>

      </div>

    </section>
  );
}

export default Connect;
