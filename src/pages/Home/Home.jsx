import { Link, useNavigate } from "react-router-dom";

import { profile } from "../../data/profile";
import { projects } from "../../data/projects";
import { skills } from "../../data/skills";

import Connect from "../../components/Connect/Connect";
import ProjectCarousel from "../../components/ProjectCarousel/ProjectCarousel";
import SpecularButton from "../../components/SpecularButton/SpecularButton";
import TypeWriter from "../../components/TypeWriter/TypeWriter";
import Specular from "../../components/Specular/Specular";

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
              src={profile.photo}
              alt={profile.name}
              className="hero-image"
            />
          </div>


          {/* Right - Introduction */}

          <div className="hero-content">

            <p className="hero-greeting">
              Hi, I'm
            </p>

            <h1
              className="hero-name"
              aria-label={profile.name}
            >
              <TypeWriter text={profile.name} />
            </h1>

            <h2 className="hero-title">
              Software <em>Developer</em>
            </h2>

            <p className="hero-description">
              I build full-stack and AI-powered applications:
              Spring Boot and React on the surface, agentic
              RAG pipelines and LLM workflows underneath.
            </p>


            {/* CTA Buttons — SpecularButton renders a native <button>, so
                routing and opening the resume (src/data/resume.pdf) happen
                through onClick instead of href. */}

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
                onClick={() => window.open(profile.resume, "_blank", "noopener,noreferrer")}
              >
                Resume
              </SpecularButton>

            </div>


            {/* Tech stack */}

            <div className="hero-stack">

              <span className="hero-stack-label">
                Tech I work with
              </span>

              <ul className="hero-stack-list">
                {skills.map((skill) => (
                  <Specular
                    as="li"
                    key={skill}
                    proximity={140}
                  >
                    {skill}
                  </Specular>
                ))}
              </ul>

            </div>

          </div>

        </div>

      </section>


      {/* =========================
          Featured Projects
          ========================= */}

      <section className="home-section">

        <div className="home-section-heading">

          <div>
            <p className="home-section-label">
              Selected work
            </p>

            <h2 className="home-section-title">
              Featured <em>Projects</em>
            </h2>
          </div>

          <Link
            to="/projects"
            className="home-section-link"
          >
            All projects →
          </Link>

        </div>

        <ProjectCarousel projects={projects} />

      </section>


      {/* =========================
          Connect Section
          ========================= */}

      <Connect />

    </main>
  );
}

export default Home;
