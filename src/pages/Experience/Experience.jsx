import { experiences } from "../../data/experience";

import PageHeader from "../../components/PageHeader/PageHeader";
import Specular from "../../components/Specular/Specular";

import "./Experience.css";

// experiences is newest first, so the last entry is where the timeline starts.
const technologyCount = new Set(
  experiences.flatMap((experience) => experience.technologies)
).size;
const earliestStart = experiences[experiences.length - 1].startDate;

function Experience() {
  return (
    <main className="page experience-page">

      <PageHeader
        label="My journey"
        title="Experience"
        subtitle="A timeline of my professional and development experience."
      >
        <dl className="header-stats">
          <div>
            <dt>Roles</dt>
            <dd>{experiences.length}</dd>
          </div>
          <div>
            <dt>Technologies</dt>
            <dd>{technologyCount}</dd>
          </div>
          <div>
            <dt>Since</dt>
            <dd>{earliestStart}</dd>
          </div>
        </dl>
      </PageHeader>


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


                {/* Body — details on the left, tech on the right */}

                <div className="experience-card-body">

                  <div className="experience-card-main">

                    <p className="experience-description">
                      {experience.description}
                    </p>

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

                  </div>


                  <aside className="experience-card-side">

                    <h4>
                      Tech used
                    </h4>

                    <div className="experience-technologies">
                      {experience.technologies.map(
                        (technology) => (
                          <Specular
                            as="span"
                            key={technology}
                            className="technology-tag"
                            proximity={140}
                          >
                            {technology}
                          </Specular>
                        )
                      )}
                    </div>

                  </aside>

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