import { gql } from "@apollo/client";

import getApolloClient from "./getApolloClient";

interface Tool {
  id: number;
  name: string;
  icon: string;
}

const Tools = gql`
  query Tools {
    tools {
      id
      name
      icon
    }
  }
`;

const fetchJobs = async () => {
  const client = getApolloClient();
  const { data } = await client.query<{ tools: Array<Tool> }>({ query: Tools });
  return data.tools;
};

export default fetchJobs;
