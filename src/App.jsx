import { BrowserRouter, Routes, Route } from "react-router-dom";

import NeuralBackground from "./components/NeuralBackground/NeuralBackground";
import Navbar from "./components/NavBar/Navbar";

import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Experience from "./pages/Experience/Experience";
import Projects from "./pages/Projects/Projects";
import ProjectDetails from "./pages/ProjectDetails/ProjectDetails";
import Contact from "./pages/Contact/Contact";

function App() {
  return (
    <BrowserRouter>
      <NeuralBackground />

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:projectId" element={<ProjectDetails />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;