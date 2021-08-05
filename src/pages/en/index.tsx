import Home from "../../containers/Home";
import { fetchJobs } from "../../utils";

export default function EnHomePage({ jobs }) {
  return <Home lang="en" jobs={jobs} />;
}

export const getStaticProps = async () => {
  return {
    props: {
      jobs: await fetchJobs(),
    },
  };
};
