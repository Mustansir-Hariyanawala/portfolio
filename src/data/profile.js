// Personal details, taken from resume.pdf (in this folder). Used by Contact,
// About and the Home hero.
import logoUrl from "./images/logo/logo.svg";
import photoUrl from "./images/profile/profile.jpg";
import resumeUrl from "./resume.pdf";

export const profile = {
  name: "Mustansir Hariyanawala",
  role: "Software Developer",
  location: "Mumbai, India",

  email: "mustansir.hariyanawala@gmail.com",

  linkedin: "https://linkedin.com/in/mustansir-hariyanawala",
  github: "https://github.com/Mustansir-Hariyanawala",

  // Vite turns these imports into hashed URLs in production builds.
  resume: resumeUrl,
  photo: photoUrl,
  // Navbar logo; currently a placeholder "M". Swap the file to change it.
  logo: logoUrl,
};

// Strips the protocol for display: "https://github.com/x" -> "github.com/x"
export const displayUrl = (url) => url.replace(/^https?:\/\//, "");

export const education = [
  {
    institution: "SVKM's Dwarkadas J. Sanghvi College of Engineering",
    qualification: "B.Tech in Computer Engineering",
    detail: "CGPA 8.62",
    period: "Graduating 2027",
    location: "Mumbai, India",
  },
  {
    institution: "Pioneer Junior College of Science, Dadar",
    qualification: "Higher Secondary Certificate",
    detail: "84.83%",
    period: "2021 – 2023",
    location: "Mumbai, India",
  },
];

export const achievements = [
  {
    title: "BNP Paribas Innoversite 2026",
    description:
      "Selected among the top 300 of 55,000+ applicants in a PAN India hackathon.",
  },
  {
    title: "CodeChef 3-star (1639)",
    description: "Rated for data structures and algorithms.",
  },
  {
    title: "Blood Bytes",
    description:
      "First Runner-Up in the Blood Bytes competitive programming contest.",
  },
];
