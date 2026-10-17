// Each project's `id` is also its URL slug (/projects/:id). The Home page
// carousel shows them in this order.
//
// Optional fields: `thumbnail`, `screenshots` and `liveDemo`. Leave them out
// and the card shows a text placeholder and the Live Demo button is hidden.
// Images live in ./images/projects/ and are imported so Vite bundles them.
import fraudScreenshot from "./images/projects/Fraudulent-Analysis-Dashboard/screenshot-1.jpeg";
import CogniScrptScreenshot from "./images/projects/CogniScript/screenshot-1.jpeg";
import TreasuryScreenshot from "./images/projects/TreasuryPulse/screenshot-1.jpeg";
import TreasuryScreenshot1 from "./images/projects/TreasuryPulse/screenshot-2.jpeg";
import TreasuryScreenshot2 from "./images/projects/TreasuryPulse/screenshot-3.jpeg";

export const projects = [
  {
    id: "fraudulent-checkout",

    title: "Fraudulent Checkout Analysis Dashboard",

    shortDescription:
      "A fraud-monitoring platform that scores every banking transaction with a 14-signal risk engine and explains each decision on a secured analyst dashboard.",

    description:
      "A mini fraud-detection platform for banking transactions. Every incoming transaction is scored by a rule-based risk engine, assigned a risk level and a decision (approved, review or blocked), and shown to fraud analysts on a secured dashboard. Every fired rule is stored with its points, so analysts can see exactly why a transaction scored the way it did, and filter, sort and drill into the results. The backend is Spring Boot with Spring Data JPA and Spring Security; the dashboard is React.",

    thumbnail: fraudScreenshot,

    technologies: [
      "Java",
      "Spring Boot",
      "Spring Security",
      "Spring Data JPA",
      "React",
    ],

    github:
      "https://github.com/Mustansir-Hariyanawala/FraudAnalysisDashboard",

    liveDemo:
      "https://fraudulent-checkout-frontend.vercel.app/",

    screenshots: [
      fraudScreenshot,
    ],

    features: [
      "Rule-based risk scoring with 14 independent signals (amount anomaly, velocity, new device, impossible travel, watchlist and more)",
      "Four risk levels (Low, Medium, High, Critical), each mapped to an approve, review or block decision",
      "Explainable results: every fired rule is stored with its points",
      "Staff-only dashboard with session login and Analyst / Admin roles",
      "Multi-select filtering on customer, merchant, country, risk, status, amount, score and date, plus sorting and pagination",
      "Live summary cards that refresh every 10 seconds",
    ],
  },

  {
    id: "treasury-pulse",

    title: "TreasuryPulse",

    thumbnail: TreasuryScreenshot,

    screenshots: [
      TreasuryScreenshot,
      TreasuryScreenshot1,
      TreasuryScreenshot2,
    ],
    
    
    shortDescription:
      "A liquidity command center that turns 46K transactions across 10 entities and 9 currencies into live cash positions, forecasts and funding decisions.",

    description:
      "TreasuryPulse replaces manual Excel reconciliation with a live view of group cash. It consolidates 46K transactions across 10 entities and 9 currencies into real-time cash positions, forecasts the next 14 days with a Monte Carlo model, and recommends how to fund shortfalls. A Spring Boot REST API with JWT role-based access sits behind a React dashboard, and an agentic RAG assistant lets analysts ask questions in plain language and get grounded answers backed by the same forecasting tools.",

    technologies: [
      "Java",
      "Spring Boot",
      "Spring Security",
      "React",
      "PostgreSQL",
      "ChromaDB",
      "Python",
      "Docker",
    ],

    github:
      "https://github.com/Mustansir-Hariyanawala/TreasurePulse",

    features: [
      "Consolidates 46K transactions across 10 entities and 9 currencies into live cash positions",
      "14-day Monte Carlo cash forecast with P10/P50/P90 bands and buffer-breach alerts, beating a naive baseline by 28–53% in backtests",
      "Spring Boot REST API with JWT role-based access and a React dashboard",
      "FX VaR and an LP-based funding optimizer behind a maker–checker approval workflow",
      "Agentic RAG chatbot that calls forecast, gap and what-if tools to answer analyst questions with grounded rationale and action plans",
      "Automated unit and API contract tests, with the stack containerized in Docker",
    ],
  },

  {
    id: "cogniscript",

    title: "CogniScript",
    
    thumbnail: CogniScrptScreenshot,

    screenshots: [
      CogniScrptScreenshot,
    ],
    
    shortDescription:
      "A RAG chatbot that answers questions over your own documents, with an isolated vector store per chat and routing across 5+ LLM providers.",

    description:
      "CogniScript enables document-based conversations by combining large language models with semantic retrieval. Users upload PDFs, docs and text files, which are chunked, embedded with HuggingFace models and stored in ChromaDB. Each chat session gets its own vector collection, so context never bleeds between conversations. A Flask REST API routes requests across 5+ LLM providers to balance speed and avoid vendor lock-in, and a React frontend streams responses with automatic source citations.",

    technologies: [
      "Python",
      "Flask",
      "React",
      "LangChain",
      "ChromaDB",
      "MongoDB",
    ],

    github:
      "https://github.com/Mustansir-Hariyanawala/CogniScript",

    features: [
      "End-to-end RAG pipeline with LangChain, HuggingFace embeddings and recursive chunking, reducing data processing latency by 35%",
      "Isolated per-session ChromaDB vector stores with 92%+ retrieval precision and no context-bleed between chats",
      "Flask REST API with dynamic routing across 5+ LLM providers (OpenAI, Gemini, Claude, Groq)",
      "React frontend with streaming LLM responses and automatic source citation tracking",
    ],
  },

  {
    id: "citation-edge",

    title: "CitationEdge",

    shortDescription:
      "A multi-agent manuscript reviewer that extracts claims, finds citation gaps and scores arguments, backed by a Neo4j knowledge graph.",

    description:
      "CitationEdge reviews academic manuscripts with a team of parallel agents: one parses the paper, others extract claims, detect citation gaps, score the writing and analyse the argument, and their results are coordinated into a single report. The agents share a Neo4j graph memory of papers, claims and references that they query with multi-hop Cypher, and a tool-using retrieval agent searches Semantic Scholar to find and rank the papers a manuscript should be citing.",

    technologies: [
      "Python",
      "FastAPI",
      "LLM Agents",
      "RAG",
      "Neo4j",
      "SciBERT",
      "spaCy",
    ],

    github:
      "https://github.com/ChintanD2205/FinalYearBackend",

    features: [
      "Parallel agents for parsing, claim extraction, citation-gap detection, literary scoring and argument analysis, coordinated into one report",
      "Neo4j graph memory with 7 entity types, queried with multi-hop Cypher over papers, claims and references",
      "Tool-using retrieval agent (Semantic Scholar API + Cypher) that scores candidate papers",
      "Citation gaps ranked into 3 priority tiers",
    ],
  },
];
