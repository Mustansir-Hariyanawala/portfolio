import "./About.css";

const skills = [
  "React",
  "JavaScript",
  "HTML",
  "CSS",
  "Tailwind CSS",
  "Git",
  "GitHub",
];

function About() {
  return (
    <main className="about-page">

      {/* =========================
          About Header
          ========================= */}

      <section className="about-header">

        <p className="about-label">
          Get to know me
        </p>

        <h1 className="about-title">
          About Me
        </h1>

        <p className="about-subtitle">
          A little bit about who I am, what I do,
          and what I'm interested in.
        </p>

      </section>


      {/* =========================
          About Content
          ========================= */}

      <section className="about-content">

        {/* About Me */}

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


        {/* What I Do */}

        <div className="about-card about-focus">

          <h2>
            What I do
          </h2>

          <div className="focus-list">

            <div className="focus-item">
              <h3>
                Frontend Development
              </h3>

              <p>
                Building responsive and interactive
                interfaces using modern web technologies.
              </p>
            </div>


            <div className="focus-item">
              <h3>
                Problem Solving
              </h3>

              <p>
                Breaking down problems into smaller,
                practical and maintainable solutions.
              </p>
            </div>


            <div className="focus-item">
              <h3>
                Continuous Learning
              </h3>

              <p>
                Exploring new technologies and improving
                my development skills through projects.
              </p>
            </div>

          </div>

        </div>

      </section>


      {/* =========================
          Skills
          ========================= */}

      <section className="skills-section">

        <div className="skills-header">

          <p className="about-label">
            Technologies
          </p>

          <h2>
            My Tech Stack
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

      </section>

    </main>
  );
}

export default About;