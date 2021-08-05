import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";
import moment from "moment";

import Head from "next/head";
import Home from "../containers/Home";

const Jobs = gql`
  query Jobs {
    jobs {
      id
      images
      title
      companyName
      companyUrl
      dateFrom
      dateTo
      isEducation
      isPartTime
      tags {
        name
        en
        zh
      }
      descriptions
    }
  }
`;

export default function HomePage({ jobs }) {
  const allExps = jobs.map((itm) => ({
    id: itm.id,
    images: itm.images.map(
      (itm) =>
        `https://home-backend.shunkongcheung.com/static/resume-images/${itm}`
    ),
    companyName: itm.companyName,
    companyUrl: itm.companyUrl,
    title: itm.title,
    dateFrom: moment(itm.dateFrom),
    dateTo: moment(itm.dateTo),
    isEducation: itm.isEducation,
    isPartTime: itm.isPartTime,
    descriptions: itm.descriptions,
    tags: itm.tags,
  }));

  const experiences = allExps.filter((itm) => !itm.isEducation);
  const educations = allExps.filter((itm) => !!itm.isEducation);

  const tags = jobs.reduce((acc, itm) => {
    itm.tags.map((tag) => {
      const exist = acc.find((aItem) => aItem.name === tag.name);
      if (!exist) acc.push({ name: tag.name, en: tag.en, zh: tag.zh });
    });
    return acc;
  }, []);

  return (
    <>
      <Head>
        <title> Welcome</title>
      </Head>
      <Home
        lang="en"
        experiences={experiences}
        educations={educations}
        tags={tags}
      />
    </>
  );
}

export const getStaticProps = async () => {
  const client = new ApolloClient({
    uri: "https://home-backend.shunkongcheung.com/graphql",
    cache: new InMemoryCache(),
  });

  const result = await client.query({ query: Jobs });

  return {
    props: {
      jobs: result.data.jobs,
    },
  };
};
