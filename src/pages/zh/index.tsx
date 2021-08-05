import Home from "../../containers/Home";
import { fetchJobs } from "../../utils";

export default function ZhHomePage({ jobs }) {
  return <Home lang="zh" jobs={jobs} />;
}

export const getStaticProps = async () => {
  return {
    props: {
      jobs: await fetchJobs(),
    },
  };
};
