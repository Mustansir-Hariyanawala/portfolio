// Listed newest first; the Experience page reads the last entry as the
// start of the timeline. Use endDate "Present" for an ongoing role.
export const experiences = [
  {
    id: "deepcytes-cyber-ai-intern",
    organization: "DeepCytes Cyber Lab",
    role: "Cyber AI Intern",
    startDate: "Jul 2025",
    endDate: "Dec 2025",
    location: "Remote",

    description:
      "Built LLM-driven automation for penetration testing, vulnerability assessment and threat reporting on a cybersecurity AI platform.",

    responsibilities: [
      "Designed and deployed LLM-driven automation workflows for penetration testing and vulnerability assessments, reducing manual security audit turnaround time by 40% across 50+ tested environments.",
      "Engineered custom prompt-engineering and agentic retrieval pipelines to analyze complex security and network logs, boosting vulnerability identification accuracy by 28% while cutting false positives by 35%.",
      "Streamlined threat reporting pipelines by automatically generating structured, actionable remediation guides for engineering teams, accelerating Mean Time to Repair (MTTR) by 30%.",
    ],

    technologies: [
      "Python",
      "LangGraph",
      "RAG",
      "React",
    ],
  },
];
