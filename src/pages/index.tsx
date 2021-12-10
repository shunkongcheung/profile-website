import React from "react";
import { useRouter } from "next/router";

import Home from "../containers/Home";
import { highlights, jobs, tools } from "../data";


export default function HomePage() {
  const router = useRouter();

  React.useEffect(() => {
    router.push("/en/");
  }, [router]);
  return <Home lang="en" highlights={highlights} jobs={jobs} tools={tools} />;
}
