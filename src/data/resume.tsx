import { Icons } from "@/components/icons";
import { CodeIcon, FolderIcon, HomeIcon, NotebookIcon, PencilLineIcon } from "lucide-react";

export const DATA = {
  name: "Zdravko Danailov",
  initials: "ZD",
  url: "https://www.zdravkodanailov.com/",
  location: "London, UK",
  locationLink: "https://www.google.com/maps/place/London,+UK",
  description:
    "Full-Stack Developer focused on building scalable, practical applications.",
  summary:
    "I like coding, optimising and learning. My main focus is on full-stack development with Next.js, but I'm also interested in AI and neural networks. In my free time I play piano, tennis and table tennis.",
  avatarUrl: "/me.png",
  skills: [
    "TypeScript",
    "Python",
    "SQL",
    "Next.js",
    "React",
    "Node.js",
    "Express",
    "Sequelize",
    "PostgreSQL",
    "MariaDB",
    "Drizzle ORM",
    "Tailwind CSS",
    "Puppeteer",
    "Nodemailer",
    "Git",
    "GitHub Actions",
    "Playwright",
    "Vitest",
    "WebSockets",
    "LDAP/JWT Auth",
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: PencilLineIcon, label: "Blog" },
    { href: "/projects", icon: FolderIcon, label: "Projects" },
    { href: "/dsa", icon: CodeIcon, label: "DSA" },
  ],
  contact: {
    email: "zdravkodanailov7@gmail.com",
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
      X: {
        name: "X",
        url: "https://x.com/zdanailov7",
        icon: Icons.x,
        navbar: true,
      },
      Email: {
        name: "Email",
        url: "mailto:zdravkodanailov7@gmail.com",
        icon: Icons.email,
        navbar: true,
      },
    },
  },
  work: [
    {
      company: "YUV",
      href: "#",
      badges: [],
      location: "London, UK",
      title: "Full Stack Developer",
      logoUrl: "/yuvbeauty_logo.jpeg",
      start: "Oct 2025",
      end: "Present",
      description:
        "Design, build, and maintain scalable full-stack apps and infrastructure. Develop secure and reliable back-end services, manage Stripe payments, and build modern, responsive front-ends. Lead analytics and e-commerce integrations, contribute to architecture, and support CI/CD as YUV grows.",
    },
    {
      company: "INK",
      href: "#",
      badges: [],
      location: "London, UK",
      title: "Software Engineer",
      logoUrl: "/ink_cropped.png",
      start: "Feb 2024",
      end: "Oct 2025",
      description:
        "Solo-developed CreateMore, managing 2000+ projects across two companies with 20+ daily users. Also created FileTank, a scalable file sharing platform also spanning multiple companies.",
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
        "Kept swimmers safe and worked closely with my team. Learned to solve problems fast and pay attention to details.",
    },
  ],
  education: [
    {
      school: "IBM Course",
      href: "#",
      degree: "Back-End Development Specialisation",
      // degree: "Completed Oct 2023 — Python/Django/SQL, containers (Docker/Kubernetes), microservices, security (OWASP), monitoring; web scraping, GitHub, Bash, NoSQL",
      logoUrl: "/ibm.png",
      start: "Oct 2023",
      end: "Dec 2023",
      description:
        "Completed on Coursera, covering Python/Django/SQL, containers (Docker/Kubernetes), microservices, security (OWASP), monitoring; web scraping, GitHub, Bash, NoSQL.",
    },
    {
      school: "Ashmole Academy",
      href: "#",
      degree: "A-Levels",
      logoUrl: "/ashmole_academy.jpg",
      start: "Sep 2021",
      end: "Jun 2023",
      description:
        "Mathematics, Further Mathematics, Computer Science. Full marks on the Computer Science NEA project. Project still being used as a teaching tool.",
    },
    {
      school: "Enfield Grammar School",
      href: "#",
      degree: "GCSEs",
      logoUrl: "/enfield_grammar.png",
      start: "Sep 2016",
      end: "Jul 2021",
      description:
        "9 GCSEs, including Mathematics (9), Combined Science (9/9), Computer Science (8).",
    },
    {
      school: "Udemy",
      href: "#",
      degree: "Online Courses",
      logoUrl: "/udemy.png",
      start: "2020",
      end: "Present",
      description:
        "Completed Udemy online courses including The Complete Python Bootcamp, The Complete Full-Stack Web Development Bootcamp, The Web Developer Bootcamp 2025.",
    },
  ],
  projects: [
    {
      title: "Raycasting Engine",
      href: "/projects/raycasting",
      dates: "Nov 2025",
      active: true,
      description:
        "A JavaScript raycasting engine built from scratch. A technique to create a 3D projection onto a 2D plane, similar to what was used in classic games like Wolfenstein 3D.",
      technologies: ["JavaScript", "TypeScript", "HTML5 Canvas", "React"],
      links: [
        {
          type: "Source",
          href: "https://github.com/zdravkodanailov7/raycasting",
          icon: <Icons.github className="size-3" />,
        },
        {
          type: "Blog",
          href: "/projects/raycasting",
          icon: <NotebookIcon className="size-3" />,
        },
      ],
      image: "/raycasting.png",
      video: "",
    },
    {
      title: "Handwritten Digit Recogniser",
      href: "/projects/digit-recogniser",
      dates: "Sep 2025",
      active: true,
      description:
        "Built from scratch using python and numpy. Implemented backpropagation algorithm and Stochastic Gradient Descent. Trained on the MNIST dataset.",
      technologies: ["Python", "NumPy", "TypeScript"],
      links: [
        {
          type: "Demo",
          href: "https://handwritten-digit-recogniser.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/zdravkodanailov7/handwritten-digit-recogniser",
          icon: <Icons.github className="size-3" />,
        },
        {
          type: "Blog",
          href: "/projects/digit-recogniser",
          icon: <NotebookIcon className="size-3" />,
        },
        {
          type: "Video",
          href: "https://www.youtube.com/watch?v=uM2hy3j1FBo",
          icon: <Icons.youtube className="size-3" />,
        },
      ],
      image: "/content/digit-recogniser/digit-recogniser.png",
      video: "",
    },
    {
      title: "CreateMore",
      href: "/projects/createmore",
      dates: "Sep 2024 - Present",
      active: true,
      description:
        "Full-stack ERP for companies; manages projects, invoicing, scheduling, more features listed in blog post. Scaled to 2000+ projects and 20+ daily users, saving hundreds of hours on manual tasks.",
      technologies: [
        "Next.js",
        "JavaScript",
        "Express",
        "Node.js",
        "Sequelize",
        "MariaDB",
        "Tailwind CSS",
        "Puppeteer",
        "LDAP",
      ],
      links: [
        {
          type: "Blog",
          href: "/projects/createmore",
          icon: <NotebookIcon className="size-3" />,
        },
      ],
      image: "/content/createmore/thumb-createmore.png",
      video: "",
    },
    {
      title: "FileTank",
      href: "/projects/filetank",
      dates: "May 2025 - Present",
      active: true,
      description:
        "Multi-tenant secure file sharing SaaS with pricing tiers that supports chunked uploads, fast downloads and has audit logs.",
      technologies: [
        "Next.js",
        "JavaScript",
        "TanStack Query",
        "Express",
        "Sequelize",
        "Stripe",
        "WebSockets",
        "Playwright",
      ],
      links: [
        {
          type: "Blog",
          href: "/projects/filetank",
          icon: <NotebookIcon className="size-3" />,
        },
      ],
      image: "/filetank.png",
      video: "",
    },
    {
      title: "LogToPost",
      href: "/projects/logtopost",
      dates: "2025 - Present",
      active: true,
      description:
        "SaaS web app that transforms daily work logs into engaging X (Twitter) posts using AI. Deployed on Hetzner with CI/CD via GitHub Actions.",
      technologies: [
        "Next.js",
        "TypeScript",
        "Express",
        "Supabase",
        "Drizzle ORM",
        "Stripe",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/zdravkodanailov7/logtopost",
          icon: <Icons.github className="size-3" />,
        },
        {
          type: "Blog",
          href: "/projects/logtopost",
          icon: <NotebookIcon className="size-3" />,
        },
      ],
      image: "/logtopost.png",
      video: "",
    },
    {
      title: "Goosey",
      href: "/projects/goosey",
      dates: "2025 - Present",
      active: true,
      description:
        "MS Teams AI chatbot built from scratch with Microsoft Bot Framework and OpenAI integration. Features custom commands using custom MCP-like protocol.",
      technologies: ["Node.js", "Bot Framework", "OpenAI", "Microsoft Graph"],
      links: [
        {
          type: "Blog",
          href: "/projects/goosey",
          icon: <NotebookIcon className="size-3" />,
        },
      ],
      image: "",
      video: "/goosey.mp4",
    },
    {
      title: "Portfolio Website",
      href: "/projects/portfolio",
      dates: "2025 - Present",
      active: true,
      description:
        "Modern, responsive portfolio; features blog system with MDX content, syntax highlighting and TOC generation.",
      technologies: [
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "MDX",
        "Rehype",
        "Unified",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/zdravkodanailov7/portfolio",
          icon: <Icons.github className="size-3" />,
        },
        {
          type: "Blog",
          href: "/projects/portfolio",
          icon: <NotebookIcon className="size-3" />,
        },
      ],
      image: "/portfolio.png",
      video: "",
    },
  ],
} as const;
