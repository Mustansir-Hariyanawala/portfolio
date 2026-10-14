import { skills } from "../../data/skills";

import PageHeader from "../../components/PageHeader/PageHeader";

import "./About.css";

const focusAreas = [
  {
    title: "Frontend Development",
    description:
      "Building responsive and interactive interfaces using modern web technologies.",
  },
  {
    title: "Problem Solving",
    description:
      "Breaking down problems into smaller, practical and maintainable solutions.",
  },
  {
    title: "Continuous Learning",
    description:
      "Exploring new technologies and improving my development skills through projects.",
  },
];

function About() {
  return (
    <main className="page about-page">

      <PageHeader
        label="Get to know me"
        title={<>About <em>Me</em></>}
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
            I'm a developer who enjoys building things for
            the web and learning how technology works.
          </p>

          <p>
            I enjoy turning ideas into functional,
            responsive and intuitive digital experiences.
            I'm particularly interested in frontend
            development and creating clean user interfaces.
          </p>

          <p>
            Outside of writing code, I enjoy learning new
            technologies, working on personal projects and
            exploring new ideas.
          </p>

        </div>


        {/* Portrait */}

        <div className="about-card about-portrait">
          <img
            src="/images/profile/profile.jpg"
            alt="Mustansir Hariyanawala"
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

          <div className="skills-grid">
            {skills.map((skill) => (
              <div
                key={skill}
                className="skill-card"
              >
                {skill}
              </div>
            ))}
          </div>

        </div>

      </section>

    </main>
  );
}

export default About;
