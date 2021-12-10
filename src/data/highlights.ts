import tags from "./tags";

const highlights = [
  {
    nameEn: "C2 Virtual Spatial Networking",
    nameZh: "C2 虛擬會議空間網絡",
    descEn:
      "C2 Montreal 2021 is hosted during October 2021. One of the key feature to enable virtual conference is to allow participant to meet each other online. Spatial networking is one of the prioritized feature that the client would like to have. The virtual space allows participants to meet and talk to each other, view each other's profile. A lot of focus is put to ensure people on different table are able to chat without distrubing people outside that area. One of my responsibility is to integrate highfidelity library into the platform, which includes voice volume control, stereo, and others.",
    descZh:
      "C2 蒙特利爾 2021 於 2021 年 10 月舉辦。虛擬會議的關鍵功能之一是允許參與者在線見面，空間網絡是客戶希望擁有的優先功能之一。虛擬空間允許參與者相互見面和交談，查看彼此的個人資料，空間網絡的重點是確保不同桌子上的人能夠聊天而不會打擾該區域外的人。我的職責之一是將語音成到平台中，其中包括音量控制、立體聲等。",
    thumbnail: "c2-spatial-networking.png",
    assets: ["c2-spatial-networking.mp4"],
    tags: ["react"],
    links: ["https://www.highfidelity.com"],
  },
  {
    nameEn: "C2 Network App",
    nameZh: "C2 聯絡平台",
    descEn:
      "C2 Montreal 2021 is hosted during October 2021. A mobile application is developed for the participants. A QRCode is displayed at the mobile application, which contains information about the participant. Within the venue, participants can use the app to scan the QRCode of one another, this will immediately connect the two. The application is powered by react native, Expo and more.",
    descZh:
      "C2 蒙特利爾 2021 將於 2021 年 10 月舉辦。為參與者開發了一個移動應用程序。 移動應用程序上會顯示一個二維碼，其中包含有關參與者的信息。 在會場內，參與者可以使用該應用程序掃描彼此的二維碼，這將立即將兩者聯繫起來。 該應用程序由 react native、Expo 等提供支持。 ",
    thumbnail: "c2-network-app-homepage.png",
    assets: [
      "c2-network-app-qrcode.mp4",
      "c2-network-app-realtime-update.mp4",
      "c2-network-app-homepage.png",
    ],
    tags: ["react", "reactNative", "firebase", "qmo"],
    links: [],
  },
  {
    nameEn: "C2 Administrator App",
    nameZh: "C2 管理平台",
    descEn:
      "C2 Montreal 2021 is hosted during October 2021. Within the event participants has various permission level, while the event is divided into different zones. Participants are given a Badge when entering the venue. The C2 Administrator app is developed for the venue administrators, who will use the mobile application to scan the RFID attached to a badge and verify the permission of a participant. Furthermore, to control the participant flow, the # of participants within a zone is also realtime displayed on the application. This application is powered by React Native, Firebase, PhP and more.",
    descZh:
      "C2 蒙特利爾 2021 於 2021 年 10 月舉辦。 參與者有不同的權限級別，而場地則被劃分為不同的區域。 參加者在進入會場時會獲發徽章。 C2 管理員應用程序是為場館管理員開發的，他們將使用移動應用程序掃描貼在徽章上的 RFID 並驗證參與者的權限。 此外，為了控制參與者流量，一個區域內的參與者數量也會實時顯示在應用程序上。 此應用程序由 React Native、Firebase、PhP 等提供支持。 ",
    thumbnail: "c2-admin-app-firebase.jpg",
    assets: ["c2-admin-app-rfid.mp4", "c2-admin-app-firebase.jpg"],
    tags: ["react", "reactNative", "firebase", "qmo"],
    links: [],
  },
  {
    nameEn: "INBOUND",
    nameZh: "INBOUND",
    descEn:
      "INBOUND 2021 is a marketing conference event hosted in October, 2021, at Boston. Marketers from the globe are invited to join the three days event. Executive and founders from reputable companies are invited to the conference to speak at the stage. The website serves as a landing page and registration page. It also allows sponsor to register to the event. The website is built on hubspot CMS. It is also powered by AirTable.",
    descZh:
      "NBOUND 2021 是一項營銷會議活動，於 2021 年 10 月在波士頓舉辦。 來自全球的營銷人員受邀參加為期三天的活動。 來自知名公司的高管和創始人應邀出席會議並在舞台上發言。 該網站用作登錄頁面和註冊頁面。 它還允許贊助商註冊活動。 該網站建立在 hubspot CMS 上。 它還由 AirTable 提供支持。 ",
    thumbnail: "inbound-website.png",
    assets: [
      "inbound-home-landing.png",
      "inbound-agenda-landing.png",
      "inbound-agenda-filter.png",
      "inbound-speaker.png",
      "inbound-hubspot.jpg",
      "inbound-airtable.png",
    ],
    tags: ["qmo", "hubl", "javascript"],
    links: [
      "https://www.inbound.com",
      "https://www.hubspot.com/",
      "https://www.airtable.com/",
    ],
  },
  {
    nameEn: "Quanmin Education",
    nameZh: "全民教育",
    descEn:
      "Quanmin Education is a education streaming platform. The purpose is to connect teachers and student. It also allows teachers to upload realtime or steaming online courses. The platform is built with express, reactjs and mux.",
    descZh:
      "全民教育是一個教育流媒體平台。 目的是連接老師和學生。 它還允許教師上傳實時或在線課程。 該平台由 express、reactjs 和 mux 構建。 ",
    thumbnail: "quanminedu-homepage.png",
    assets: ["quanminedu-landing.png", "quanminedu-login.png"],
    tags: ["react", "javascript", "mux"],
    links: [
      "https://festive-jennings-011dc0.netlify.app/",
      "https://www.mux.com/",
    ],
  },
  {
    nameEn: "RI+",
    nameZh: "RI+",
    descEn:
      "RI+ is a web based workflow system built by Radica. The system is responsible for email, SMS, whatsapp blasting and more. RI+ consists of a workflow editing system, which allows administrators to create marketing campaigns with smart segmenetation. It also allows marketer to easily analyse the campaign based on campaign metrics like open, receive rate etc. The system is built with React.js, Django, RabitMQ, Nginx and more. The system is deployed onto AWS.",
    descZh:
      "RI+ 是一個工作流程建設系統，主要服務對像為營銷作業者。RI+能讓使用者建立不同的營銷活動，並且透過不同平台發送，包括電郵，手機短訊，WhatsApp，WeChat等等。RI＋更提供不同的分析工具，令活動效果一目了然。RI+使建於React.js, Django, RabbitMQ, Nginx 等不同網路工具之上，而整個系統則放置於AWS伺服器上。",
    thumbnail: "riplus-login.png",
    assets: [
      "riplus-homepage.png",
      "riplus-analytics.png",
      "riplus-workflow.png",
      "riplus-email.png",
      "riplus-whatsapp.png",
      "riplus-thumbnail.png",
    ],
    tags: ["react", "django", "postgres", "radica", "hongKong"],
    links: ["https://www.radicasys.com/ri-2/"],
  },
  {
    nameEn: "Fencing",
    nameZh: "劍擊",
    descEn:
      "Started fencing since primary school. Has been fencing for over 10+ years. Participated in various interschool competition in Hong Kong and in Canada. Won the Ontario Varsity silver medal in individual and team. Was the champion of Canada Cup.",
    descZh:
      "自小參與劍擊比賽，擁有超過10年經驗。曾參加多項校際及國內比賽。在安省大學校際比賽中獲得團隊及個人亞軍，同時獲得加拿大杯賽冠軍。",
    thumbnail: "fencing-stage.png",
    assets: ["fencing-stage.png", "fencing-game.jpg", "fencing-coach.png"],
    tags: ["fencing", "dbs", "uoft", "toronto", "hongKong"],
    links: [],
  },
];

export default highlights.map((itm, id) => ({
  id,
  ...itm,
  tags: itm.tags.map((name) => tags.find((itm) => itm.name === name)),
  thumbnail: `/highlights/${itm.thumbnail}`,
  assets: itm.assets.map((itm) => `/highlights/${itm}`),
}));
