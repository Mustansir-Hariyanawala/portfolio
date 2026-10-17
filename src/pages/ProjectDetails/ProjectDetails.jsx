import { Link, useParams } from "react-router-dom";

import { projects } from "../../data/projects";
import SpecularButton from "../../components/SpecularButton/SpecularButton";
import TypeWriter from "../../components/TypeWriter/TypeWriter";
import Specular from "../../components/Specular/Specular";

import "./ProjectDetails.css";

function ProjectDetails() {
  const { projectId } = useParams();

  const project = projects.find(
    (item) => item.id === projectId
  );

  // Project doesn't exist
  if (!project) {
    return (
      <main className="page project-details-page">
        <div className="project-not-found">

          <h1>
            Project not found
          </h1>

          <Link to="/projects">
            Back to Projects
          </Link>

        </div>
      </main>
    );
  }

  return (
    <main className="page project-details-page">

      <Link
        to="/projects"
        className="project-back-link"
      >
        ← Back to Projects
      </Link>


      {/* =========================
          Header — intro on the left, project info card on the right
          ========================= */}

      <section className="project-details-header">

        <div className="project-details-intro">

          <p className="project-details-label">
            Project
          </p>

          <h1 aria-label={project.title}>
            {/* key restarts the typing when moving between projects */}
            <TypeWriter
              key={project.id}
              text={project.title}
              speed={45}
            />
          </h1>

          <p className="project-details-description">
            {project.description}
          </p>


          {/* Links — SpecularButton instead of plain <a> tags, opened via
              window.open since SpecularButton renders a <button> */}

          <div className="project-details-actions">

            {project.liveDemo && (
              <SpecularButton
                size="md"
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
                proximity={260}
                onClick={() => window.open(project.liveDemo, "_blank", "noopener,noreferrer")}
              >
                Live Demo
              </SpecularButton>
            )}

            <SpecularButton
              size="md"
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
              onClick={() => window.open(project.github, "_blank", "noopener,noreferrer")}
            >
              GitHub
            </SpecularButton>

          </div>

        </div>


        {/* Project Info */}

        <aside className="project-info-card">

          <div className="project-info-row">

            <h2>
              Tech stack
            </h2>

            <div className="project-details-technologies">
              {project.technologies.map((technology) => (
                <Specular
                  as="span"
                  key={technology}
                  className="project-details-tag"
                  proximity={140}
                >
                  {technology}
                </Specular>
              ))}
            </div>

          </div>


          <div className="project-info-row">

            <h2>
              Links
            </h2>

            <ul className="project-info-links">
              {project.liveDemo && (
                <li>
                  <a
                    href={project.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Live demo ↗
                  </a>
                </li>
              )}
              <li>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Source code ↗
                </a>
              </li>
            </ul>

          </div>


          <div className="project-info-row">

            <h2>
              Features
            </h2>

            <p className="project-info-value">
              {project.features.length}
            </p>

          </div>

        </aside>

      </section>


      {/* =========================
          Main Image
          ========================= */}

      {project.thumbnail && (
        <section className="project-details-preview">

          <img
            src={project.thumbnail}
            alt={`${project.title} preview`}
          />

        </section>
      )}


      {/* =========================
          Features
          ========================= */}

      <section className="project-details-features">

        <h2>
          Features
        </h2>

        <ul className="project-features-grid">
          {project.features.map((feature, index) => (
            <li
              key={index}
              className="project-feature-card"
            >
              <span className="project-feature-index">
                {String(index + 1).padStart(2, "0")}
              </span>

              <p>
                {feature}
              </p>
            </li>
          ))}
        </ul>

      </section>


      {/* =========================
          Screenshots
          ========================= */}

      {project.screenshots?.length > 0 && (
        <section className="project-screenshots">

          <h2>
            Screenshots
          </h2>

          <div className="project-screenshots-grid">

            {project.screenshots.map(
              (screenshot, index) => (
                <img
                  key={screenshot}
                  src={screenshot}
                  alt={`${project.title} screenshot ${
                    index + 1
                  }`}
                />
              )
            )}

          </div>

        </section>
      )}

    </main>
  );
}

export default ProjectDetails;
