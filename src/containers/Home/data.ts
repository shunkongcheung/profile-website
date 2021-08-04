import moment, { Moment } from "moment";

import { I18N } from "../../types";

interface ExpItem {
  company: string;
  descriptions: Array<string>;
  dateFrom: Moment;
  dateTo: Moment;
  images: Array<string>;
  isPartTime?: boolean;
  link?: string;
  title: string;
  thumbnail: string;
  tags: Array<TagShape>;
}

interface TagShape extends I18N {
  id: string;
}

interface TagsShape {
  [x: string]: TagShape;
}

let Tags = {
  // location
  hongKong: { en: "Hong Kong", zh: "香港" },
  toronto: { en: "Toronto", zh: "多倫多" },
  // random
  compeng: { en: "computer eng.", zh: "電腦工程" },
  dbs: { en: "Diocesan Boys' School", zh: "拔萃男書院" },
  fencing: { en: "fencing", zh: "劍擊" },
  it: { en: "IT dog", zh: "IT狗" },
  uoft: { en: "UofT", zh: "多倫多大學" },
  // technology
  adobe: { en: "Adobe", zh: "Adobe" },
  broadBand: { en: "Broadband", zh: "寬頻" },
  cSharp: { en: "C#", zh: "C#" },
  django: { en: "django", zh: "django" },
  flask: { en: "flask", zh: "flask" },
  javascript: { en: "javascript", zh: "javascript" },
  mySql: { en: "MySQL", zh: "MySQL" },
  msAccss: { en: "MS Access", zh: "MS Access" },
  msExcel: { en: "MS Excel", zh: "MS Excel" },
  php: { en: "php", zh: "php" },
  python: { en: "python", zh: "python" },
  postgres: { en: "PostgreSQL", zh: "PostgreSQL" },
  react: { en: "react", zh: "react" },
  reactNative: { en: "react-native", zh: "react-native" },
  // company
  clp: { en: "CLP", zh: "中電" },
  hkbn: { en: "HKBN", zh: "香港寬頻" },
  hsbc: { en: "HSBC", zh: "匯豐" },
  maxim: { en: "Maxim MX", zh: "美心" },
  sickKids: { en: "Sickkids", zh: "Sickkids" },
  radica: { en: "Radica", zh: "雷克" },
  qmo: { en: "Quantum Mobs", zh: "Quantum Mobs" },
} as any as TagsShape;
Object.entries(Tags).map(([id, itm]) => (itm.id = id));

const Educations: Array<ExpItem> = [
  {
    descriptions: ["Fencing Team"],
    link: "https://www.utoronto.ca",
    dateFrom: moment("2013-09-01"),
    dateTo: moment("2018-08-31"),
    images: [
      "/home-education-uoft-fencing-stage.png",
      "/home-education-uoft-fencing-coach.png",
      "/home-education-uoft-fencing-game.jpg",
    ],
    tags: [Tags.uoft, Tags.toronto, Tags.fencing],
    title: "University of Toronto",
    company: "Bachelor of Applied Science (B.A.Sc.)",
    thumbnail: "/home-education-uoft.png",
  },
  {
    descriptions: ["Fencing Team", "Class Treasure"],
    link: "https://www.dbs.edu.hk/",
    dateFrom: moment("2007-09-01"),
    dateTo: moment("2013-08-31"),
    images: [],
    tags: [Tags.dbs, Tags.hongKong, Tags.fencing],
    title: "Diocesan Boys' School",
    company: "Hong Kong Diploma of Secondary Education",
    thumbnail: "/home-education-dbs.png",
  },
];

const Experiences: Array<ExpItem> = [
  {
    descriptions: [
      "Established full-stack mobile application by react native; Python, Flask and PostgreSQL",
      "Implemented google and facebook SSO service with firebase",
      "Implemented AODA accessibility requirement for client's website",
      "Established a website using HubSpot CMS and AirTable",
      "Implemented a RFID badge scanning mobile application with react-native",
    ],
    link: "https://qmo.io/",
    images: [
      "/home-experience-qmo-spc.png",
      "/home-experience-qmo-airmiles.png",
    ],
    dateFrom: moment("2020-01-01"),
    dateTo: moment(),
    tags: [
      Tags.qmo,
      Tags.toronto,
      Tags.javascript,
      Tags.react,
      Tags.reactNative,
      Tags.python,
      Tags.flask,
      Tags.php,
      Tags.postgres,
      Tags.mySql,
    ],
    title: "Software Engineer",
    company: "Quantum Mob",
    thumbnail: "/home-experience-qmo.jpg",
  },
  {
    descriptions: [
      "Established full-stack web application by react.js at frontend; Python, Django, and PostgreSQL at the backend",
      "Implemented asynchronous validation and error reporting for customer list data upload of size up to 30MB.",
      "Integrated third-party libraries redux, beefree.io, CK Editor, code mirrors, rappid.js, rc-components and more.",
      "Planned the migration procedures for typescript integration and react.js upgrade from 16.6 to 16.8 (react hook)",
      "Created a tool for composing dynamic forms. Users include enterprises like the Nan Fung Group and Levi’s.",
    ],
    dateFrom: moment("2018-05-01"),
    dateTo: moment("2019-09-30"),
    images: [
      "/home-experience-radica-analytics.png",
      "/home-experience-radica-riplus.png",
    ],
    link: "https://www.radicasys.com/",
    tags: [
      Tags.radica,
      Tags.hongKong,
      Tags.javascript,
      Tags.react,
      Tags.django,
      Tags.python,
      Tags.postgres,
    ],
    title: "Software Engineer",
    company: "Radica System Limited",
    thumbnail: "/home-experience-radica.png",
  },
  {
    descriptions: [
      "Compiled an internal manual of the overview of company’s network topology, equipment, and products",
      "Customized an alert report on equipment resource utilization for inter-departmental communication",
      "Evaluated and documented the geographic distribution of network hubs for data analysis",
      "Coordinated and organized a farewell party and led thirteen interns in planning logistics and agenda",
    ],
    dateFrom: moment("2017-07-01"),
    dateTo: moment("2017-08-30"),
    images: [
      "/home-experience-hkbn-onsite.jpg",
      "/home-experience-hkbn-router.jpg",
      "/home-experience-hkbn-fiber.jpg",
    ],
    isPartTime: true,
    link: "https://www.hkbn.net/",
    tags: [Tags.hkbn, Tags.hongKong, Tags.broadBand],
    title: "Summer Intern",
    company: "Hong Kong Broadband",
    thumbnail: "/home-experience-hkbn.png",
  },
  {
    descriptions: [
      "Performed data quality assurance test, managed database migration and optimized query performance",
      "Developed a web-based frontend survey for data collection on stroke kids research",
      "Built a VB program of automated data migration of over 4000 entries expediting the process",
      "Lectured MS Excel usage lesson, provided presentation and assistance to the department",
    ],
    link: "https://www.sickkids.ca/",
    dateFrom: moment("2017-05-01"),
    dateTo: moment("2017-06-30"),
    tags: [Tags.sickKids, Tags.toronto, Tags.cSharp, Tags.msAccss],
    images: ["/home-experience-sickkids-ms-access.png"],
    isPartTime: true,
    title: "Data management intern",
    company: "The Hospital for Sick Children",
    thumbnail: "/home-experience-sickkids.png",
  },
  {
    descriptions: [
      "Developed Smart-form using Adobe LiveCycle Designer for the project of Manual Payment Policy",
      "Created and reviewed scanning workflow system by EMC Captiva for backup storage",
      "Overhauled Visual Studio product for MICR scanning and VBA for project management",
      "Built a Java program decoding HTML files for accessing SQL database",
    ],
    link: "https://www.sickkids.ca/",
    dateFrom: moment("2015-06-01"),
    dateTo: moment("2016-06-30"),
    tags: [Tags.hsbc, Tags.hongKong, Tags.cSharp, Tags.msExcel, Tags.adobe],
    images: ["/home-experience-hsbc-csharp.png"],
    isPartTime: true,
    title: "Technology & Service Industrial Placement",
    company: "Hong Kong&Shanghai Banking Corp.Limited.(H.S.B.C)",
    thumbnail: "/home-experience-hsbc.png",
  },
  {
    descriptions: [
      "Examined domestic power supply system status to ensure the safety and stability",
      "Documented and analyzed collected data via online database application",
      "Produced administrative work including data verification, filing and proof-reading",
      "Participated a one-week safety and workplace training",
    ],
    link: "https://www.clpgroup.com",
    dateFrom: moment("2014-06-01"),
    dateTo: moment("2014-08-30"),
    tags: [Tags.clp, Tags.hongKong],
    images: [],
    isPartTime: true,
    title: "Summer Intern",
    company: "CLP Holdings Limited ",
    thumbnail: "/home-experience-clp.png",
  },
  {
    descriptions: [
      "Fabricated food products along production line from raw materials to finished products",
      "Operated baking machine for food catering in a cautious manner",
      "Maintained working environment safety and hygiene on a daily basis",
      "Collaborated with colleagues in procedures and arrangements",
    ],
    link: "https://www.maximsmx.com.hk/",
    dateFrom: moment("2013-06-01"),
    dateTo: moment("2013-08-30"),
    images: [],
    tags: [Tags.maxim, Tags.hongKong],
    isPartTime: false,
    title: "Contract Worker",
    company: "Hong Kong Maxim's Group",
    thumbnail: "/home-experience-maxim.jpg",
  },
  {
    descriptions: [
      "Attended court hearings and recorded trials for future reference",
      "Translated witness statements from English to Chinese to a client understandable version",
      "Assisted preparation for court trials including documenting and various researches",
      "Produced Administrative work including analysis, filing and proof-reading",
    ],
    dateFrom: moment("2012-07-01"),
    dateTo: moment("2012-08-30"),
    tags: [Tags.hongKong],
    images: [],
    isPartTime: true,
    title: "Summer Intern, Legal",
    company: "T.K.Tsui & Co.",
    thumbnail: "/image-placeholder.png",
  },
  {
    descriptions: [
      "This volunteer job last for two months. I was working in the physiotherapy department.",
      "Responsible for patients treatment, work with nurses and physiotherapist in order to provide services to patients.",
    ],
    dateFrom: moment("2012-05-01"),
    dateTo: moment("2012-05-30"),
    images: [],
    link: "https://www3.ha.org.hk/ndh/index_e.asp",
    tags: [Tags.hongKong],
    isPartTime: true,
    title: "Volunteer",
    company: "Hong Kong North District Hospital",
    thumbnail: "/image-placeholder.png",
  },
];

export { Educations, Experiences, Tags };
