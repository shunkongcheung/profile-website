const tools = [
  { name: "React", icon: "tools-react.png" },
  { name: "TypeScript", icon: "tools-typescript.png" },
  { name: "Next JS", icon: "tools-next.png" },
  { name: "GraphQL", icon: "tools-graphql.png" },
  { name: "Firebase", icon: "tools-firebase.png" },
  { name: "NodeJS", icon: "tools-nodejs.png" },
  { name: "HTML 5", icon: "tools-html5.png" },
  { name: "CSS", icon: "tools-css.png" },
  { name: "Sass", icon: "tools-sass.png" },
  { name: "Styled Components", icon: "tools-styled-components.png" },
  { name: "Vercel", icon: "tools-vercel.png" },
  { name: "Netlify", icon: "tools-netlify.png" },
  { name: "TypeORM", icon: "tools-typeorm.png" },
  { name: "PostgreSQL", icon: "tools-postgres.png" },
  { name: "MySQL", icon: "tools-mysql.png" },
  { name: "C#", icon: "tools-csharp.png" },
  { name: "AWS EC2", icon: "tools-aws-ec2.png" },
  { name: "AWS Lambda", icon: "tools-aws-lambda.png" },
  { name: "Git", icon: "tools-git.png" },
  { name: "Vim", icon: "tools-vim.png" },
  { name: "MS Access", icon: "tools-ms-access.png" },
];

export default tools.map((itm, id) => ({
  ...itm,
  id,
  icon: `/tools/${itm.icon}`,
}));
