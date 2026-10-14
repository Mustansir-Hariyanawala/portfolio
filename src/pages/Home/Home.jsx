import { useNavigate } from "react-router-dom";

import Connect from "../../components/Connect/Connect";
import SpecularButton from "../../components/SpecularButton/SpecularButton";

import "./Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <main className="home-page">

      {/* =========================
          Hero Section
          ========================= */}

      <section className="hero">

        <div className="hero-container">

          {/* Left - Profile Image */}

          <div className="hero-image-container">
            <img
              src="/images/profile/profile.jpg"
              alt="Mustansir Hariyanawala"
              className="hero-image"
            />
          </div>


          {/* Right - Introduction */}

          <div className="hero-content">

            <p className="hero-greeting">
              Hi, I'm
            </p>

            <h1 className="hero-name">
              Mustansir Hariyanawala
            </h1>

            <h2 className="hero-title">
              Frontend Developer
            </h2>

            <p className="hero-description">
              I build modern, responsive and user-friendly
              web applications using React and modern web
              technologies.
            </p>


            {/* CTA Buttons — SpecularButton replaces the old .hero-button
                links. It renders a native <button>, so routing/opening the
                resume happens through onClick instead of href. */}

            <div className="hero-actions">

              <SpecularButton
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
                onClick={() => navigate("/projects")}
              >
                View Projects
              </SpecularButton>

              <SpecularButton
                size="lg"
                radius={999}
                tint="#ffffff"
                tintOpacity={0}
                textColor="#f5f5f5"
                lineColor="#ffffff"
                baseColor="#525252"
                intensity={1}
                shineSize={10}
                shineFade={40}
                thickness={1}
                speed={0.35}
                followMouse
                proximity={250}
                onClick={() => window.open("/resume.pdf", "_blank", "noopener,noreferrer")}
              >
                Resume
              </SpecularButton>

            </div>

          </div>

        </div>

      </section>


      {/* =========================
          Connect Section
          ========================= */}

      <Connect />

    </main>
  );
}

export default Home;