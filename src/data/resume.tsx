import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
  name: "Zdravko Danailov",
  initials: "ZD",
  url: "https://www.zdravkodanailov.com/",
  location: "London, UK",
  locationLink: "https://www.google.com/maps/place/London,+UK",
  description:
    "Full-Stack Developer focused on building scalable, practical applications.",
  summary:
    "After completing my A-levels in Mathematics, Further Mathematics, and Computer Science (with full marks on the CS NEA project), I dove into professional development through certifications and real-world work. I earned the IBM Back-End Development Specialisation on Coursera and completed Udemy courses in Python, full-stack web development, and web technologies. At INK Design Studio, I built two major applications from scratch: CreateMore (an ERP tool for project management) and FileTank (a multi-tenant file sharing platform). I'm based in London and looking to leverage my practical skills in junior full-stack or software engineering roles.",
  workExperience: [
    {
      company: "INK Design Studio",
      role: "Software Engineer (Promoted from Programming Intern)",
      period: "Feb 2024 - Present",
      highlights: [
        "Solo-developed CreateMore ERP managing 2000+ projects with Next.js/React/TypeScript and Express/Node.js/Sequelize backend",
        "Created FileTank file sharing platform with Stripe billing, websockets, and multi-tenant architecture",
        "Implemented LDAP/JWT authentication, RBAC, and CI/CD with GitHub Actions"
      ]
    },
    {
      company: "Fusion Lifestyle",
      role: "Lifeguard",
      period: "Mar 2022 - Dec 2022",
      highlights: [
        "Ensured safety in high-pressure environments developing problem-solving and team communication skills",
        "Maintained precise records and protocols for secure implementations",
        "Built transferable skills for agile development and client interactions"
      ]
    }
  ],
  avatarUrl: "/me.png",
  skills: [
    "JavaScript",
    "TypeScript",
    "Python",
    "SQL",
    "HTML/CSS",
    "Next.js",
    "React",
    "Node.js",
    "Express",
    "Sequelize",
    "MariaDB",
    "Tailwind CSS",
    "TanStack Query",
    "TanStack Table",
    "Bryntum Scheduler",
    "Puppeteer",
    "Nodemailer",
    "Git",
    "GitHub Actions",
    "Playwright",
    "Jest",
    "Linux Server Management",
    "WebSockets",
    "Stripe APIs",
    "LDAP/JWT Auth",
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "zdravkodanailov7@gmail.com",
    tel: "+44 7309025841",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/zdravkodanailov7",
        icon: Icons.github,

        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/zdravko-danailov-0b37a525b",
        icon: Icons.linkedin,

        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "mailto:zdravkodanailov7@gmail.com",
        icon: Icons.email,

        navbar: false,
      },
    },
  },

  work: [
    {
      company: "INK",
      href: "#",
      badges: [],
      location: "London, UK",
      title: "Software Engineer",
      logoUrl: "/ink_cropped.png",
      start: " 2024",
      end: "Present",
      description:
        "Solo-developed CreateMore, managing 2000+ projects across two companies with 20+ daily users; built with Next.js/React/TypeScript/Tailwind frontend and Express/Node.js/Sequelize/MariaDB backend; handled multi-tenancy and optimised features like PDF generation (saving hundreds of hours) and archive processing (reducing retrieval time from days to minutes). Created FileTank, a scalable file sharing platform with pricing tiers; featured resumable uploads (50GB max), ZIP streaming, websockets for real-time updates, and Stripe billing; supported secure sharing with audit logs and cron jobs for cleanups. Implemented authentication (LDAP/JWT), RBAC, and devops with GitHub Actions/Playwright testing.",
    },
    {
      company: "Fusion Lifestyle",
      href: "#",
      badges: [],
      location: "London, UK",
      title: "Lifeguard",
      logoUrl: "/fusion_lifestyle.png",
      start: "Mar 2022",
      end: "Dec 2022",
      description:
        "Ensured safety in high-pressure environments, developing quick problem-solving and team communication skills transferable to agile development and client interactions. Maintained precise records and protocols, building attention to detail for code quality and secure implementations.",
    },
  ],
  education: [
    {
      school: "Ashmole Academy",
      href: "#",
      degree: "A-Levels in Mathematics, Further Mathematics, Computer Science",
      logoUrl: "/ashmole_academy.jpg",
      start: "Sep 2021",
      end: "Jun 2023",
      description:
        "A-Levels in Mathematics, Further Mathematics, and Computer Science with full marks on the CS NEA project.",
    },
    {
      school: "Enfield Grammar School",
      href: "#",
      degree: "GCSEs (9 subjects), including Mathematics (9), Combined Science (9/9), Computer Science (8)",
      logoUrl: "/enfield_grammar.png",
      start: "Sep 2016",
      end: "Jul 2021",
      description:
        "GCSEs (9 subjects), including Mathematics (9), Combined Science (9/9), Computer Science (8).",
    },
    {
      school: "IBM Back-End Development Specialisation (Coursera)",
      href: "#",
      degree: "Completed Oct 2023 — Python/Django/SQL, containers (Docker/Kubernetes), microservices, security (OWASP), monitoring; web scraping, GitHub, Bash, NoSQL",
      logoUrl: "/ibm.png",
      start: "Oct 2023",
      end: "Dec 2023",
      description:
        "Completed the IBM Back-End Development Specialisation on Coursera, covering Python/Django/SQL, containers (Docker/Kubernetes), microservices, security (OWASP), monitoring; web scraping, GitHub, Bash, NoSQL.",
    },
    {
      school: "Udemy Online Courses",
      href: "#",
      degree: "The Complete Python Bootcamp, The Complete Full-Stack Web Development Bootcamp, The Web Developer Bootcamp 2025",
      logoUrl: "/udemy.png",
      start: "2020",
      end: "Present",
      description:
        "Completed the Udemy Online Courses, covering The Complete Python Bootcamp, The Complete Full-Stack Web Development Bootcamp, The Web Developer Bootcamp 2025.",
    },
  ],
  projects: [
    {
      title: "CreateMore",
      href: "/blog/building-createmore",
      dates: "Sep 2024 - Present",
      active: true,
      description:
        "Full-stack ERP for design studios; manages projects, invoicing, scheduling; built with Next.js/React, Express/Node.js, Sequelize/MariaDB; features LDAP auth, Bryntum Gantt, Puppeteer PDFs, Python archive processing; scaled to 2000+ projects and 20+ users, saving hundreds of hours on manual tasks.",
      technologies: [
        "Next.js",
        "React",
        "TypeScript",
        "Express",
        "Node.js",
        "Sequelize",
        "MariaDB",
        "Tailwind CSS",
        "Bryntum",
        "Puppeteer",
        "LDAP",
      ],
      links: [],
      image: "/createmore.png",
      video: "",
    },
    {
      title: "FileTank",
      href: "/blog/developing-filetank",
      dates: "May 2025 - Present",
      active: true,
      description:
        "Multi-tenant secure file sharing SaaS with pricing tiers; supports workspaces, chunked uploads (50GB), ZIP downloads, websockets; Next.js/TanStack Query frontend, Express/Sequelize backend, Stripe billing; includes audit logs, cron cleanups, and Playwright testing.",
      technologies: [
        "Next.js",
        "TypeScript",
        "TanStack Query",
        "Express",
        "Sequelize",
        "Stripe",
        "WebSockets",
        "Playwright",
      ],
      links: [],
      image: "/filetank.png",
      video: "",
    },
    {
      title: "Goosey",
      href: "/blog/creating-goosey",
      dates: "2025",
      active: true,
      description:
        "AI-powered chatbot built with Microsoft Bot Framework and OpenAI integration; features Microsoft Graph API for enhanced functionality and Node.js backend for scalable deployment.",
      technologies: ["Node.js", "Bot Framework", "OpenAI", "Microsoft Graph"],
      links: [],
      image: "",
      video: "/goosey.mp4",
    },
  ],
} as const;
