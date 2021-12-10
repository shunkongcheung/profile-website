import Home from "../../containers/Home";
import { highlights, jobs, tools } from "../../data";

export default function EnHomePage() {
  return <Home lang="en" highlights={highlights} jobs={jobs} tools={tools} />;
}
