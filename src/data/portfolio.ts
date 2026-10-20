export interface Project {
  id: string;
  name: string;
  category: string;
  summary: string;
  technologies: string[];
  repository: string | null;
  demo: string | null;
  screenshots: string[];
  status: string;
  contribution: string | null;
  features: { title: string; text: string }[];
}
export interface Research {
  title: string;
  conference: string;
  authors: string[];
  status: string | null;
  date: string | null;
  doi: string | null;
  url: string | null;
  pdf: string | null;
  abstract: string | null;
  contribution: string | null;
}
export interface Achievement {
  title: string;
  provider: string | null;
  date: string | null;
  certificate: string | null;
  url: string | null;
  description: string | null;
}
export interface Certification {
  name: string;
  issuer: string;
  date: string | null;
  credentialId: string | null;
  url: string | null;
  status: 'completed' | 'in-progress' | 'planned';
  image: string;
  width: number;
  height: number;
}
export interface Experience {
  organization: string;
  role: string;
  type: 'Current role' | 'Internship';
  period: string | null;
  activitiesConfirmed: boolean;
  responsibilities: string[];
  tools: string[];
  activities: string[];
  achievements: string[];
}
export const profile = {
  name: 'Muhammad Sayeed Sadman Saad',
  role: 'IT Support Coordinator',
  organization: 'Techvue360',
  location: 'Chattogram, Bangladesh',
  introduction:
    "I'm an IT Support Coordinator at Techvue360 and a Computer Science and Engineering student. My interests span IT operations, technical problem-solving, software development, and AI-powered applications.",
  about:
    "I'm Muhammad Sayeed Sadman Saad, an IT Support Coordinator at Techvue360 and a Computer Science and Engineering student at International Islamic University Chittagong. Through professional activities and personal projects, I aim to connect practical technical understanding with a continuous learning mindset.",
  email: 'sayeedssaadman272491@gmail.com',
  linkedin: 'https://www.linkedin.com/in/sayeed-saadman',
  github: 'https://github.com/sayeedsaadman',
  resume: null as string | null,
};
export const experience: Experience[] = [
  {
    organization: 'Techvue360',
    role: 'IT Support Coordinator',
    type: 'Current role',
    period: 'Oct 2024 – Present',
    activitiesConfirmed: true,
    responsibilities: [
      'Install, troubleshoot, and configure IT equipment and software, including laptops, workstations, and printers.',
      'Coordinate on-site technical activities and communicate with remote engineers.',
      'Administer and manage users through Active Directory (AD) and Group Policy (GPO).',
      'Remotely prepare PCs, laptops, and IT devices for employees.',
      'Administer SharePoint sites, manage user permissions, and support site migration.',
      'Maintain ticketing systems and prepare IT documentation.',
    ],
    tools: ['Active Directory', 'GPO', 'SharePoint', 'Remote support', 'Ticketing systems'],
    achievements: [],
    activities: [],
  },
  {
    organization: 'Techvue360',
    role: 'Information Technology Intern',
    type: 'Internship',
    period: 'Sep 2024 – Oct 2024',
    activitiesConfirmed: true,
    responsibilities: [],
    tools: [],
    achievements: [],
    activities: [],
  },
];
export const education = [
  {
    qualification: 'B.Sc. (Engg.) in Computer Science and Engineering',
    institution: 'International Islamic University Chittagong',
    location: 'Chattogram, Bangladesh',
    period: '2022–2027',
    status: 'In progress · expected completion 2027',
  },
  {
    qualification: 'Higher Secondary Certificate (HSC), Science',
    institution: 'Chittagong Cantonment Public School and College',
    location: 'Chattogram, Bangladesh',
    period: null,
    status: 'GPA 5.00',
  },
];
export const projects: Project[] = [
  {
    id: 'tripmind',
    name: 'TripMind-AI',
    category: 'AI-powered travel planning ecosystem',
    summary:
      'A connected travel ecosystem bringing agentic planning, document intelligence, and web-grounded information into one thoughtful journey.',
    technologies: ['Gemini 2.0 Flash', 'LangGraph', 'RAG', 'FAISS', 'Hugging Face', 'Tavily'],
    repository: null,
    demo: null,
    screenshots: [],
    contribution: null,
    status: 'Supplied project architecture · integration and deployment status unconfirmed',
    features: [
      {
        title: 'Agentic planning',
        text: 'Conversational, day-by-day itineraries with LangGraph orchestration and a described Gemini, Groq / Llama 3.3, and OpenAI fallback design.',
      },
      {
        title: 'Document intelligence',
        text: 'PDF and TXT knowledge sources, Hugging Face embeddings, and FAISS retrieval to improve grounded answers.',
      },
      {
        title: 'Web grounding',
        text: 'Tavily and Google Search grounding are described integrations for retrieving and verifying travel information.',
      },
      {
        title: 'Vision & OCR',
        text: 'A separate workflow for landmark recognition and extracting information from tickets, receipts, and brochures.',
      },
    ],
  },
  {
    id: 'agrofarm',
    name: 'AgroManagement',
    category: 'Dairy & livestock management',
    summary:
      'An ASP.NET Core MVC application bringing animal care, employee coordination, a product shop, and financial reporting into one dairy and livestock management platform.',
    technologies: ['ASP.NET Core', 'MVC'],
    repository: 'https://github.com/sayeedsaadman/AgroFarmManagement',
    demo: null,
    screenshots: [],
    contribution: null,
    status: 'Features documented in the supplied README',
    features: [
      {
        title: 'Livestock records',
        text: 'Track animal tags, breeds, birth dates, weight, purchase price, and lifecycle status.',
      },
      {
        title: 'People & daily care',
        text: 'Manage employees and animal-related tasks, with daily health and milk tracking.',
      },
      {
        title: 'Shop & sales',
        text: 'Product catalog, stock management, shopping cart, checkout, and sales analytics.',
      },
      {
        title: 'Administration & reporting',
        text: 'Admin dashboard, user management, registration, login and profiles, monthly expenses, and downloadable PDF invoices and reports.',
      },
    ],
  },
  {
    id: 'city',
    name: 'City Control & Operation Management System',
    category: 'Software project',
    summary: '',
    technologies: [],
    repository: 'https://github.com/sayeedsaadman/City-Control-And-Operation-Management-System',
    demo: null,
    screenshots: [],
    contribution: null,
    status: 'Repository supplied · project details pending',
    features: [],
  },
];
export const research: Research[] = [
  {
    title:
      'Path-HGT: A Hierarchical Graph Transformer Framework for Gigapixel Pathology Image Analysis',
    conference:
      '2026 IEEE 2nd International Conference on Quantum Photonics, Artificial Intelligence & Networking (QPAIN)',
    authors: [
      'Sazzad Hossen Chowdhury',
      'Mohammad Iftikar Hasan',
      'Mohammad Tarek Hossen',
      'Muhammad Sayeed Sadman Saad',
      'Adnan Shamim',
      'Abdullah Al Abrar Chowdhury',
      'Rashedul Arefin Ifty',
    ],
    status: 'Publication accepted',
    date: null,
    doi: '10.1109/QPAIN69676.2026.11545947',
    url: 'https://doi.org/10.1109/QPAIN69676.2026.11545947',
    pdf: null,
    abstract: null,
    contribution: null,
  },
];
export const achievements: Achievement[] = [
  {
    title: '2nd Runner-Up — Learn AI, ML & Gen AI with Expert',
    provider: null,
    date: null,
    certificate: null,
    url: null,
    description: null,
  },
];
export const certifications: Certification[] = [
  {
    name: 'Information Technology Internship',
    issuer: 'Techvue360',
    date: '9 September – 9 October 2024',
    credentialId: null,
    url: null,
    status: 'completed',
    image: '/certificates/techvue360-internship.png',
    width: 800,
    height: 567,
  },
  {
    name: 'Master Git and Github — Beginner to Expert',
    issuer: 'Udemy · Anisul Islam',
    date: '27 September 2024',
    credentialId: null,
    url: null,
    status: 'completed',
    image: '/certificates/udemy-git-github.png',
    width: 800,
    height: 595,
  },
  {
    name: 'Path-HGT · Certificate of Presentation',
    issuer: 'QPAIN 2026 · IEEE Photonics Society Bangladesh Chapter',
    date: '16–18 April 2026',
    credentialId: null,
    url: null,
    status: 'completed',
    image: '/certificates/qpain-path-hgt.png',
    width: 2768,
    height: 1928,
  },
  {
    name: 'App Development with Flutter',
    issuer: 'Ostad',
    date: null,
    credentialId: 'C11225',
    url: null,
    status: 'completed',
    image: '/certificates/ostad-flutter.png',
    width: 973,
    height: 682,
  },
];
export const skills = [
  {
    name: 'Development',
    label: 'Web & application development',
    description:
      'Building interfaces, application services, authentication, and data-backed experiences.',
    items: [
      'HTML',
      'CSS',
      'JavaScript',
      'React',
      'Flutter',
      'TypeScript',
      'Next.js',
      'BetterAuth',
      'Tailwind CSS',
      'Node.js',
      'ASP.NET',
    ],
  },
  {
    name: 'Data & cloud',
    label: 'Data, infrastructure & collaboration',
    description:
      'The databases, cloud platform, and version-control tools in my technical toolkit.',
    items: ['MongoDB', 'MySQL', 'Azure', 'Git & GitHub'],
  },
  {
    name: 'IT operations',
    label: 'IT support & administration',
    description:
      'Device and software support, user administration, remote device preparation, SharePoint administration, and technical documentation.',
    items: [
      'Active Directory',
      'GPO',
      'SharePoint',
      'Device configuration',
      'Troubleshooting',
      'Remote support',
      'Ticketing & documentation',
    ],
  },
  {
    name: 'AI & applications',
    label: 'AI & intelligent applications',
    description: 'Tools featured in TripMind-AI’s planning, retrieval, and document workflows.',
    items: ['LangGraph', 'Gemini', 'RAG', 'FAISS', 'Hugging Face embeddings', 'Tavily', 'OCR'],
  },
];
