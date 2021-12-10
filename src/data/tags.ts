const tags = [
  // location
  { name: "hongKong", en: "Hong Kong", zh: "香港" },
  { name: "toronto", en: "Toronto", zh: "多倫多" },
  // random
  { name: "compeng", en: "computer eng.", zh: "電腦工程" },
  { name: "dbs", en: "Diocesan Boys' School", zh: "拔萃男書院" },
  { name: "fencing", en: "fencing", zh: "劍擊" },
  { name: "it", en: "IT dog", zh: "IT狗" },
  { name: "uoft", en: "UofT", zh: "多倫多大學" },
  // technology
  { name: "adobe", en: "Adobe", zh: "Adobe" },
  { name: "broadBand", en: "Broadband", zh: "寬頻" },
  { name: "cSharp", en: "C#", zh: "C#" },
  { name: "django", en: "django", zh: "django" },
  { name: "flask", en: "flask", zh: "flask" },
  { name: "javascript", en: "javascript", zh: "javascript" },
  { name: "hubl", en: "HubL", zh: "HubL" },
  { name: "mux", en: "Mux", zh: "Mux" },
  { name: "mySql", en: "MySQL", zh: "MySQL" },
  { name: "msAccss", en: "MS Access", zh: "MS Access" },
  { name: "msExcel", en: "MS Excel", zh: "MS Excel" },
  { name: "php", en: "php", zh: "php" },
  { name: "python", en: "python", zh: "python" },
  { name: "postgres", en: "PostgreSQL", zh: "PostgreSQL" },
  { name: "react", en: "react", zh: "react" },
  { name: "reactNative", en: "react-native", zh: "react-native" },
  { name: "firebase", en: "firebase", zh: "firebase" },
  // company
  { name: "clp", en: "CLP", zh: "中電" },
  { name: "hkbn", en: "HKBN", zh: "香港寬頻" },
  { name: "hsbc", en: "HSBC", zh: "匯豐" },
  { name: "maxim", en: "Maxim MX", zh: "美心" },
  { name: "sickKids", en: "Sickkids", zh: "Sickkids" },
  { name: "radica", en: "Radica", zh: "雷克" },
  { name: "qmo", en: "Quantum Mobs", zh: "Quantum Mobs" },
];

export default tags.map((itm, id) => ({ ...itm, id }));
