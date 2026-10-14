import { Link, useParams } from "react-router-dom";

import { projects } from "../../data/projects";
import SpecularButton from "../../components/SpecularButton/SpecularButton";

import "./ProjectDetails.css";

function ProjectDetails() {
  const { projectId } = useParams();

  const project = projects.find(
    (item) => item.id === projectId
  );

  // Project doesn't exist
  if (!project) {
    return (
      <main className="project-details-page">
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
    <main className="project-details-page">

      {/* =========================
          Header
          ========================= */}

      <section className="project-details-header">

        <Link
          to="/projects"
          className="project-back-link"
        >
          ← Back to Projects
        </Link>

        <p className="project-details-label">
          Project
        </p>

        <h1>
          {project.title}
        </h1>

        <p className="project-details-description">
          {project.description}
        </p>


        {/* Technologies */}

        <div className="project-details-technologies">

          {project.technologies.map((technology) => (
            <span
              key={technology}
              className="project-details-tag"
            >
              {technology}
            </span>
          ))}

        </div>


        {/* Links — SpecularButton instead of plain <a> tags, opened via
            window.open since SpecularButton renders a <button> */}

        <div className="project-details-actions">

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

      </section>


      {/* =========================
          Main Image
          ========================= */}

      <section className="project-details-preview">

        <img
          src={project.thumbnail}
          alt={`${project.title} preview`}
        />

      </section>


      {/* =========================
          Features
          ========================= */}

      <section className="project-details-features">

        <h2>
          Features
        </h2>

        <ul>
          {project.features.map((feature, index) => (
            <li key={index}>
              {feature}
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