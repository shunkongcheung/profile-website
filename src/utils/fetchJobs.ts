import { gql } from "@apollo/client";

import getApolloClient from "./getApolloClient";

interface Job {
  id: number;
  images: Array<string>;
  title: string;
  companyName: string;
  companyUrl: string;
  dateFrom: string;
  dateTo: string;
  isEducation: boolean;
  isPartTime: boolean;
  tags: Array<{
    name: string;
    en: string;
    zh: string;
  }>;
  descriptions: Array<string>;
}

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

const fetchJobs = async () => {
  const client = getApolloClient();
  const { data } = await client.query<{ jobs: Array<Job> }>({ query: Jobs });
  return data.jobs;
};

export default fetchJobs;
