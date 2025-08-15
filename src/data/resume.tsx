import { Icons } from "@/components/icons";
import { HomeIcon,  MailIcon } from "lucide-react";

export const DATA = {
  name: "Charlie Charron",
  initials: "CC",
  url: "https://charlie-charron.io",
  location: "Rennes, France",
  locationLink: "https://www.google.com/maps/place/Rennes",
  description:
  "Développeur web passionné, je conçois des applications modernes alliant design, performance et fiabilité.",
  summary:
  "Étudiant en 3ᵉ année de BUT MMI, je conçois des applications web modernes avec un souci constant d’optimisation et d’UX. Après un stage où j’ai mêlé développement et intégration 3D, j’ai travaillé sur divers projets allant d’applications React/Svelte à des jeux Unity et Flutter. Aujourd’hui, je recherche une alternance à Rennes ou Nancy pour mettre mes compétences en React, Svelte, Node.js et MongoDB au service de projets ambitieux.",
  avatarUrl: "/pp.webp",
  skills: [
  "React",
  "Redux",
  "Svelte",
  "Flutter",
  "Node.js",
  "PHP",
  "Symfony",
  "SQL",
  "Docker",
  "Java",
  "C#"
],

  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/contact", icon: MailIcon, label: "Contact" },
  ],
  contact: {
    email: "charlie.charron29@gmail.com",
    tel: "06 74 49 30 29",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/QW6D3",
        icon: Icons.github,

        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/charlie-charron-50b644241",
        icon: Icons.linkedin,
        navbar: true,
      },
      X: {
        name: "X",
        url: "https://dub.sh/dillion-twitter",
        icon: Icons.x,

        navbar: false,
      },
      Youtube: {
        name: "Youtube",
        url: "https://dub.sh/dillion-youtube",
        icon: Icons.youtube,
        navbar: false,
      },
      email: {
        name: "Send Email",
        url: "#",
        icon: Icons.email,

        navbar: false,
      },
    },
  },

  work: [
  {
    company: "Calystio",
    href: "#",
    badges: ["Stage", "Wordpress","PHP", "Three.js"],
    location: "Cesson-Sévigné, France",
    title: "Stagiaire développeur Wordpress",
    logoUrl: "/calystio.webp",
    start: "Avril 2024",
    end: "Juin 2024",
    description:
      "Développement et personnalisation du site WordPress de l’entreprise, intégration d’animations interactives en Three.js, optimisation SEO et amélioration des performances. Réalisation de maquettes sur Figma, intégration responsive et participation à l’optimisation de l’UX/UI.",
  },
  {
    company: "Andros Ultra Frais",
    href: "#",
    badges: ["Stage", "Svelte", "Node.js", "SQL"],
    location: "Auneau-bleury-Saint-Symphorien, France",
    title: "Stagiaire développeur fullstack",
    logoUrl: "/andros.webp",
    start: "Avril 2025",
    end: "Août 2025",
    description:
      "Développement d’outils internes (Svelte/Node.js), automatisation de reportings et tableaux de bord (SQL), amélioration de l’UX des écrans métiers, et écriture de scripts pour le traitement de données. Tests et petites optimisations de performances.",
  },
],

  education: [
  {
    school: "IUT de Laval – Université du Mans",
    href: "https://iut-laval.univ-lemans.fr/fr/departements/metiers-du-multimedia-et-de-l-internet.html",
    degree: "BUT Métiers du Multimédia et de l’Internet (spécialité Développement Web)",
    logoUrl: "/iut-laval.webp",
    start: "2022",
    end: "2025",
  },
],
  projects: [ 
  {
    title: "REZAV",
    href: "#",
    dates: "Septembre 2024 - Janvier 2025",
    active: true,
    description:
      "Application de réservation de matériel audiovisuel pour notre département MMI, conçue pour améliorer la gestion et la traçabilité du matériel. Elle allège la charge des enseignants en assurant un meilleur suivi et contrôle de la qualité du matériel rendu, tout en facilitant l'accès des étudiants aux équipements pour leurs projets scolaires.",
    technologies: [
      "React",
      "Node.js",
      "MongoDB",
      "Docker"
    ],
    image: "/rezav.jpg",
    video: "",
    links: []
  },
  {
    title: "TrackingPal",
    href: "#",
    dates: "Avril 2025 - Août 2025",
    active: true,
    description:
      "Outil interne de suivi des palettes, permettant de retracer leur cycle de vie depuis leur création jusqu'à l'expédition. Le système détecte les anomalies, offre un tableau de bord complet et permet de consulter en détail les données de chaque palette.",
    technologies: [
      "Svelte",
      "PHP",
      "SQL",
      "IIS"
    ],
    image: "/trackingpal.jpg",
    video: "",
    links: []
  },
],
} as const;
