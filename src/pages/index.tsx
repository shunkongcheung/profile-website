import React from "react";
import { useRouter } from "next/router";
import Home from "../containers/Home";
import { fetchJobs } from "../utils";

export default function HomePage({ jobs }) {
  const router = useRouter();

  React.useEffect(() => {
    console.log("hey here");
    router.push("/en/");
  }, [router]);
  return <Home lang="en" jobs={jobs} />;
}

export const getStaticProps = async () => {
  return {
    props: {
      jobs: await fetchJobs(),
    },
  };
};
