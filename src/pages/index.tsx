import React from "react";
import { useRouter } from "next/router";
import Home from "../containers/Home";
import { fetchHighlights, fetchJobs, fetchTools } from "../utils";

export default function HomePage({ highlights, jobs, tools }) {
  const router = useRouter();

  React.useEffect(() => {
    router.push("/en/");
  }, [router]);
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
