import { ApolloClient, InMemoryCache } from "@apollo/client";

const getApolloClient = () => {
  const client = new ApolloClient({
    uri: "https://home-backend.shunkongcheung.com/graphql",
    cache: new InMemoryCache(),
  });
  return client;
};

export default getApolloClient;
