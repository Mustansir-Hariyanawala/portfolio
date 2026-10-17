import { achievements, education, profile } from "../../data/profile";
import { skillGroups } from "../../data/skills";

import PageHeader from "../../components/PageHeader/PageHeader";
import Specular from "../../components/Specular/Specular";

import "./About.css";

const focusAreas = [
  {
    title: "Full-stack Development",
    description:
      "Secure Spring Boot REST APIs with role-based access, backed by PostgreSQL and paired with responsive React dashboards.",
  },
  {
    title: "Agentic AI & RAG",
    description:
      "Retrieval pipelines, multi-agent systems and knowledge graphs built with LangChain, LangGraph, ChromaDB and Neo4j.",
  },
  {
    title: "Problem Solving",
    description:
      "A 3-star CodeChef coder who enjoys breaking hard problems into clean, measurable solutions.",
  },
];

function About() {
  return (
    <main className="page about-page">

      <PageHeader
        label="Get to know me"
        title="About"
        titleAccent="Me"
        subtitle="A little bit about who I am, what I do, and what I'm interested in."
      />


      {/* =========================
          Bento Grid
          ========================= */}

      <section className="about-grid">

        {/* Who I am — wide card */}

        <div className="about-card about-introduction">

          <h2>
            Who I am
          </h2>

          <p>
            I'm a Computer Engineering student at SVKM's
            Dwarkadas J. Sanghvi College of Engineering in
            Mumbai, graduating in 2027, and I build software
            that sits where full-stack development meets
            applied AI.
          </p>

          <p>
            As a Cyber AI Intern at DeepCytes Cyber Lab I
            built LLM-driven workflows for penetration
            testing and threat reporting. In my own projects
            I build Spring Boot and React applications,
            agentic RAG assistants and multi-agent systems.
          </p>

          <p>
            I like work with measurable results: faster
            audits, more accurate retrieval and forecasts
            that beat their baseline.
          </p>

        </div>


        {/* Portrait */}

        <div className="about-card about-portrait">
          <img
            src={profile.photo}
            alt={profile.name}
          />
        </div>


        {/* What I do — one card per focus area */}

        {focusAreas.map((area, index) => (
          <div
            key={area.title}
            className="about-card about-focus"
          >
            <span className="about-focus-index">
              {String(index + 1).padStart(2, "0")}
            </span>

            <h3>
              {area.title}
            </h3>

            <p>
              {area.description}
            </p>
          </div>
        ))}


        {/* Education — wide card */}

        <div className="about-card about-education">

          <h2>
            Education
          </h2>

          <ul className="about-list">
            {education.map((item) => (
              <li key={item.institution}>
                <span className="about-list-meta">
                  {item.period} · {item.location}
                </span>

                <h3>
                  {item.institution}
                </h3>

                <p>
                  {item.qualification} · {item.detail}
                </p>
              </li>
            ))}
          </ul>

        </div>


        {/* Achievements */}

        <div className="about-card about-achievements">

          <h2>
            Achievements
          </h2>

          <ul className="about-list">
            {achievements.map((item) => (
              <li key={item.title}>
                <h3>
                  {item.title}
                </h3>

                <p>
                  {item.description}
                </p>
              </li>
            ))}
          </ul>

        </div>


        {/* Tech stack — full-width card */}

        <div className="about-card about-skills">

          <div className="about-skills-header">
            <h2>
              My Tech <em>Stack</em>
            </h2>

            <p>
              Technologies and tools I currently work with.
            </p>
          </div>

          <div className="skill-groups">
            {skillGroups.map((group) => (
              <div
                key={group.category}
                className="skill-group"
              >
                <h3 className="skill-group-label">
                  {group.category}
                </h3>

                <div className="skills-grid">
                  {group.items.map((skill) => (
                    <Specular
                      key={skill}
                      className="skill-card"
                      proximity={160}
                    >
                      {skill}
                    </Specular>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>

      </section>

    </main>
  );
}

export default About;
