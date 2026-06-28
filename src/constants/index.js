import {

  ictu, codegym, vti, plane, ahv, ManagerShopPhone, heartWeb, mcp, trolo, vocabmemo, xrayvison
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
    date: "2023 - 2027",
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
    company_name: "I hope to have a good life",
    icon: plane,
    iconBg: "#fff",
    date: "2027 - future",
    points: [],
  },
];




const experiences = [
  {
    title: "Intern Fullstack developer",
    company_name: "AHV Holding",
    icon: ahv,
    iconBg: "#fff",
    date: "2026",
    points: [
      "Developer in AHV Work Project Company",
      "Tech: Frontend: ReactJS, TailwindCSS, Redux Toolkit, Ant Design | Backend: Nodejs, Express, MongoDB",
      "Role: Intern MERN Stack Developer"
    ],
  },
  {
    title: "Intern Frontend developer",
    company_name: "CodeGym",
    icon: codegym,
    iconBg: "#fff",
    date: "2026",
    points: [
      "Intern Frontend Developer in CodeGym Work Project Company",
      "Tech: ReactJs, HTML, CSS, JavaScript",
      "Role: Intern Frontend Developer"
    ],
  },
  {
    title: "Comming soon...",
    company_name: "Future...",
    icon: plane,
    iconBg: "#fff",
    date: "Future...",
    points: [],
  },
];
const projects = [
  {
    name: "Manager shop Phone",
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
    name: "MCP Trainning Test",
    description:
      "A website that helps users practice for multiple-choice exams effectively was released.",
    tags: [
      {
        name: "ReactJs",
        color: "blue-text-gradient",
      },
      {
        name: "SpringBoot",
        color: "green-text-gradient",
      },
    ],
    image: mcp,
    source_code_link: "https://github.com/trungboky123/VTIChampion",
    live_project_link: "#",
  },
  {
    name: "Quản lý phòng trọ",
    description:
      "An application that helps users efficiently manage rental rooms, including bookings, payments, and resident management.",
    tags: [
      {
        name: "ReactNative",
        color: "blue-text-gradient",
      },
      {
        name: "NodeJs",
        color: "green-text-gradient",
      },
    ],
    image: trolo,
    source_code_link: "https://github.com/lean1835/NhaTroVuiVe",
    live_project_link: "https://drive.google.com/file/d/1t67OkBDb7tnh7Yp6nu10BiBrInApWz3C/view?usp=drive_link",
  },
  {
    name: "VocabMemo",
    description:
      "AI-powered vocabulary platform with smart flashcard generation, practice features, and word management",
    tags: [
      {
        name: "ReactJs",
        color: "blue-text-gradient",
      },
      {
        name: "NodeJs",
        color: "green-text-gradient",
      },
    ],
    image: vocabmemo,
    source_code_link: "https://github.com/lean1835/vocabmemo",
    live_project_link: "https://vocabularymemo.vercel.app/",
  },
  {
    name: "XrayVision",
    description:
      "AI-powered chest X-ray diagnosis platform using CheXNet to detect lung diseases and provide prediction results.",
    tags: [
      {
        name: "Python",
        color: "blue-text-gradient",
      },
      {
        name: "ReactJS",
        color: "blue-text-gradient",
      },
      {
        name: "NodeJs",
        color: "green-text-gradient",
      },
    ],
    image: xrayvison,
    source_code_link: "https://github.com/lecuong2512/CheXNet",
    live_project_link: "#",
  },
  {
    name: "Heart Animation ",
    description: "A gift for my love <3               ",
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
