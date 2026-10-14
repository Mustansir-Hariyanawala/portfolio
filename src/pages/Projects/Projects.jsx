import { useState } from "react";

import { projects } from "../../data/projects";

import PageHeader from "../../components/PageHeader/PageHeader";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import SearchBar from "../../components/SearchBar/SearchBar";

import "./Projects.css";

// Every technology used across all projects, for the filter chips.
const allTechnologies = [
  ...new Set(projects.flatMap((project) => project.technologies)),
];

function Projects() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTechnology, setActiveTechnology] = useState(null);

  const filteredProjects = projects.filter((project) => {
    if (activeTechnology && !project.technologies.includes(activeTechnology)) {
      return false;
    }

    const search = searchTerm.toLowerCase();

    const title = project.title.toLowerCase();
    const description = project.shortDescription.toLowerCase();

    const technologies = project.technologies
      .join(" ")
      .toLowerCase();

    return (
      title.includes(search) ||
      description.includes(search) ||
      technologies.includes(search)
    );
  });

  return (
    <main className="page projects-page">

      <PageHeader
        label="My work"
        title="Projects"
        subtitle="A collection of projects I've built, explored and learned from."
      >
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
        />

        <p className="projects-count">
          Showing {filteredProjects.length} of {projects.length} projects
        </p>
      </PageHeader>


      {/* =========================
          Technology Filters
          ========================= */}

      <div
        className="projects-filters"
        role="group"
        aria-label="Filter by technology"
      >

        <button
          type="button"
          className={`projects-filter ${activeTechnology === null ? "is-active" : ""}`}
          aria-pressed={activeTechnology === null}
          onClick={() => setActiveTechnology(null)}
        >
          All
        </button>

        {allTechnologies.map((technology) => (
          <button
            key={technology}
            type="button"
            className={`projects-filter ${activeTechnology === technology ? "is-active" : ""}`}
            aria-pressed={activeTechnology === technology}
            onClick={() => setActiveTechnology(technology)}
          >
            {technology}
          </button>
        ))}

      </div>


      {/* =========================
          Projects Grid
          ========================= */}

      <section className="projects-grid">

        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
            />
          ))
        ) : (
          <div className="projects-empty">
            <h2>
              No projects found
            </h2>

            <p>
              Try searching for another project,
              technology or keyword.
            </p>
          </div>
        )}

      </section>

    </main>
  );
}

export default Projects;
