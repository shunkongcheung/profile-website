import Home from "../../containers/Home";
import { highlights, jobs, tools } from "../../data";

export default function ZhHomePage() {
  return <Home lang="zh" highlights={highlights} jobs={jobs} tools={tools} />;
}
