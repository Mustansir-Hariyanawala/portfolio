import { Link, useNavigate } from "react-router-dom";

import { projects } from "../../data/projects";
import { skills } from "../../data/skills";

import Connect from "../../components/Connect/Connect";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import SpecularButton from "../../components/SpecularButton/SpecularButton";
import TypeWriter from "../../components/TypeWriter/TypeWriter";

import "./Home.css";

const FEATURED_COUNT = 2;

function Home() {
  const navigate = useNavigate();

  const featuredProjects = projects.slice(0, FEATURED_COUNT);

  return (
    <main className="page home-page">

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

            <h1
              className="hero-name"
              aria-label="Mustansir Hariyanawala"
            >
              <TypeWriter text="Mustansir Hariyanawala" />
            </h1>

            <h2 className="hero-title">
              Software <em>Developer</em>
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


            {/* Tech stack */}

            <div className="hero-stack">

              <span className="hero-stack-label">
                Tech I work with
              </span>

              <ul className="hero-stack-list">
                {skills.map((skill) => (
                  <li key={skill}>
                    {skill}
                  </li>
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

        <div className="home-projects-grid">
          {featuredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
            />
          ))}
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
