import { gql } from "@apollo/client";

import getApolloClient from "./getApolloClient";

interface Highlight {
  id: number;
  nameEn: string;
  nameZh: string;
  thumbnail: string;
  tags: Array<{ name: string }>;
}

const Highlights = gql`
  query Highlights {
    highlights {
      id
      nameEn
      nameZh
      thumbnail
      tags {
        name
      }
    }
  }
`;

const fetchJobs = async () => {
  const client = getApolloClient();
  const { data } = await client.query<{ highlights: Array<Highlight> }>({
    query: Highlights,
  });
  return data.highlights;
};

export default fetchJobs;
