import Home from "../../containers/Home";
import { fetchJobs, fetchTools } from "../../utils";

export default function EnHomePage({ jobs, tools }) {
  return <Home lang="en" jobs={jobs} tools={tools} />;
}

export const getStaticProps = async () => {
  return {
    props: {
      jobs: await fetchJobs(),
      tools: await fetchTools(),
    },
  };
};
