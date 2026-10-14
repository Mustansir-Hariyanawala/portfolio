import { useState } from "react";

import { projects } from "../../data/projects";

import ProjectCard from "../../components/ProjectCard/ProjectCard";
import SearchBar from "../../components/SearchBar/SearchBar";

import "./Projects.css";

function Projects() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProjects = projects.filter((project) => {
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
    <main className="projects-page">

      {/* =========================
          Header
          ========================= */}

      <section className="projects-header">

        <p className="projects-label">
          My work
        </p>

        <h1 className="projects-title">
          Projects
        </h1>

        <p className="projects-subtitle">
          A collection of projects I've built,
          explored and learned from.
        </p>

      </section>


      {/* =========================
          Search
          ========================= */}

      <section className="projects-search">

        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
        />

      </section>


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