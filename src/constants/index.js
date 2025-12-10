import {

  ictu, codegym, vti,plane, ManagerShopPhone , heartWeb,
} from "../assets";


export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "education",
    title: "Education",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "skills",
    title: "Skills",
  },
  {
    id: "projects",
    title: "Projects",
  }
];


const education = [
  {
    title: "University",
    company_name: "University of Information and Communication Technology",
    icon: ictu,
    iconBg: "#fff",
    date: "2023 - Present",
    points: ["5-time University Scholarship Recipient", "Current GPA: 3.9/4.0"],
  },
  {
    title: "Coding Bootcamp",
    company_name: "Frontend Web Development | CodeGym",
    icon: codegym,
    iconBg: "#fff",
    date: "2024",
    points: ["1 Project Frontend with React", "Team Work with Github", ,],
  },
  {
    title: "Coding Bootcamp",
    company_name: "Fullstack Web Development | VTI Academy",
    icon: vti,
    iconBg: "#fff",
    date: "2025 - 2026",
    points: ["1 Project with ReactJs and Spring Boot", "Fullstack Transition | Java Backend", ,],
  },
  {
    title: "Comming soon...",
    company_name: "I hope that place will be Samsung or FPT Software",
    icon: plane,
    iconBg: "#fff",
    date: "2027 - future",
    points: [],
  },

];




const experiences = [
  {
    title: "Comming soon...",
    company_name: " ",
    icon: plane,
    iconBg: "#fff",
    date: "Future...",
    points: [
      
    ],
  },

];
const projects = [
  {
    name: "Manager shop Phone 🤙",
    description:
      "A website that streamlines phone store management, making operations more convenient and boosting business efficiency.",
    tags: [
      {
        name: "ReactJs",
        color: "blue-text-gradient",
      },
      {
        name: "Spring Boot",
        color: "green-text-gradient",
      },
    ],
    image: ManagerShopPhone,
    source_code_link: "https://github.com/lean1835/Manager-Shop-Phone",
    live_project_link: "https://mspdashboard.vercel.app/",
  },
  {
    name: "Heart Animation ❤️",
    description: "A gift for my love <3 ",
    tags: [
      {
        name: "ReactJs",
        color: "blue-text-gradient",
      },
    ],
    image: heartWeb,
    source_code_link: "https://github.com/lean1835/yeu_trang_tho",
    live_project_link: "https://yeutrangggg.vercel.app/",
  },
];

export {
  experiences,
  projects,
  education,
};
