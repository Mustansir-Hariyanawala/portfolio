import "./Experience.css";

const experiences = [
  {
    id: 1,
    organization: "Company Name",
    role: "Frontend Developer",
    startDate: "Jan 2025",
    endDate: "Present",
    location: "Mumbai, India",

    description:
      "Worked on building responsive and interactive web applications using modern frontend technologies.",

    responsibilities: [
      "Built reusable React components.",
      "Developed responsive user interfaces.",
      "Worked with APIs and application data.",
    ],

    technologies: [
      "React",
      "JavaScript",
      "Tailwind CSS",
    ],
  },

  {
    id: 2,
    organization: "Another Organization",
    role: "Developer Intern",
    startDate: "Jun 2024",
    endDate: "Dec 2024",
    location: "Remote",

    description:
      "Worked with the development team on improving existing applications and implementing new features.",

    responsibilities: [
      "Implemented new frontend features.",
      "Fixed UI and functionality issues.",
      "Collaborated with other developers.",
    ],

    technologies: [
      "React",
      "JavaScript",
      "Git",
    ],
  },
];

function Experience() {
  return (
    <main className="experience-page">

      {/* =========================
          Header
          ========================= */}

      <section className="experience-header">

        <p className="experience-label">
          My journey
        </p>

        <h1 className="experience-title">
          Experience
        </h1>

        <p className="experience-subtitle">
          A timeline of my professional and
          development experience.
        </p>

      </section>


      {/* =========================
          Timeline
          ========================= */}

      <section className="experience-timeline">

        {experiences.map((experience) => {
          // Any role still ongoing gets a distinct glowing marker + badge,
          // so the active job reads as "now" at a glance rather than every
          // entry on the timeline looking identical.
          const isCurrent = experience.endDate === "Present";

          return (
            <article
              key={experience.id}
              className={`experience-item ${isCurrent ? "is-current" : ""}`}
            >

              {/* Timeline Marker */}

              <div className="timeline-marker">
                <span className={isCurrent ? "marker-current" : ""}></span>
              </div>


              {/* Experience Content */}

              <div className="experience-card">

                {/* Header */}

                <div className="experience-card-header">

                  <div>
                    <div className="experience-role-row">
                      <h2>
                        {experience.role}
                      </h2>

                      {isCurrent && (
                        <span className="current-badge">
                          Current
                        </span>
                      )}
                    </div>

                    <h3>
                      {experience.organization}
                    </h3>
                  </div>

                  <div className="experience-meta">

                    <span>
                      {experience.startDate} —{" "}
                      {experience.endDate}
                    </span>

                    <span>
                      {experience.location}
                    </span>

                  </div>

                </div>


                {/* Description */}

                <p className="experience-description">
                  {experience.description}
                </p>


                {/* Responsibilities */}

                <div className="experience-responsibilities">

                  <h4>
                    Responsibilities
                  </h4>

                  <ul>
                    {experience.responsibilities.map(
                      (responsibility, index) => (
                        <li key={index}>
                          {responsibility}
                        </li>
                      )
                    )}
                  </ul>

                </div>


                {/* Technologies */}

                <div className="experience-technologies">

                  {experience.technologies.map(
                    (technology) => (
                      <span
                        key={technology}
                        className="technology-tag"
                      >
                        {technology}
                      </span>
                    )
                  )}

                </div>

              </div>

            </article>
          );
        })}

      </section>

    </main>
  );
}

export default Experience;