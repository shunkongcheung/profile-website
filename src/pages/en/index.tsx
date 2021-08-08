import Home from "../../containers/Home";
import { fetchHighlights, fetchJobs, fetchTools } from "../../utils";

export default function EnHomePage({ highlights, jobs, tools }) {
  return <Home lang="en" highlights={highlights} jobs={jobs} tools={tools} />;
}

export const getStaticProps = async () => {
  return {
    props: {
      highlights: await fetchHighlights(),
      jobs: await fetchJobs(),
      tools: await fetchTools(),
    },
  };
};
