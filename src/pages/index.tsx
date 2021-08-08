import React from "react";
import { useRouter } from "next/router";
import Home from "../containers/Home";
import { fetchJobs, fetchTools } from "../utils";

export default function HomePage({ jobs, tools }) {
  const router = useRouter();

  React.useEffect(() => {
    router.push("/en/");
  }, [router]);
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
