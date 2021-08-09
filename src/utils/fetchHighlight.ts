import { gql } from "@apollo/client";

import getApolloClient from "./getApolloClient";

interface Highlight {
  id: number;
  nameEn: string;
  nameZh: string;
  descEn: string;
  descZh: string;
  tags: Array<Tag>;
}

interface Tag {
  name: string;
  en: string;
  zh: string;
}

const Highlights = gql`
  query Highlights {
    highlights {
      id
      nameEn
      nameZh
      descEn
      descZh
      assets
      links
      tags {
        name
        en
        zh
      }
    }
  }
`;

const fetchhighlight = async (id: number) => {
  const client = getApolloClient();
  const { data } = await client.query<{ highlights: Array<Highlight> }>({
    query: Highlights,
  });
  return data.highlights.find((item) => item.id === id);
};

export default fetchhighlight;
