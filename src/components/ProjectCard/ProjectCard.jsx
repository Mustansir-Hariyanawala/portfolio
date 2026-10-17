import { Link, useNavigate } from "react-router-dom";

import SpecularButton from "../SpecularButton/SpecularButton";
import Specular from "../Specular/Specular";

import "./ProjectCard.css";

function ProjectCard({ project }) {
  const navigate = useNavigate();

  return (
    <article className="project-card">

      {/* Project Image */}

      <Link
        to={`/projects/${project.id}`}
        className="project-card-image-link"
      >
        {project.thumbnail ? (
          <img
            src={project.thumbnail}
            alt={project.title}
            className="project-card-image"
          />
        ) : (
          // No screenshot yet: the title set large stands in for one
          <div
            className="project-card-image project-card-placeholder"
            aria-hidden="true"
          >
            {project.title}
          </div>
        )}
      </Link>


      {/* Project Content */}

      <div className="project-card-content">

        <h2 className="project-card-title">
          <Link to={`/projects/${project.id}`}>
            {project.title}
          </Link>
        </h2>

        <p className="project-card-description">
          {project.shortDescription}
        </p>


        {/* Technologies */}

        <div className="project-card-technologies">

          {project.technologies.map((technology) => (
            <Specular
              as="span"
              key={technology}
              className="project-tag"
              proximity={120}
            >
              {technology}
            </Specular>
          ))}

        </div>


        {/* View Project — SpecularButton instead of a plain text link */}

        <div className="project-card-cta">
          <SpecularButton
            size="sm"
            radius={999}
            tint="#ffffff"
            tintOpacity={0}
            textColor="#ffffff"
            lineColor="#ffffff"
            baseColor="#525252"
            intensity={1}
            shineSize={10}
            shineFade={40}
            thickness={1}
            speed={0.4}
            followMouse
            proximity={200}
            onClick={() => navigate(`/projects/${project.id}`)}
          >
            View Project →
          </SpecularButton>
        </div>

      </div>

    </article>
  );
}

export default ProjectCard;