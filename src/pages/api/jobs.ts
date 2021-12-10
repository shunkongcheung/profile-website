import { NextApiResponse } from "next";

import { jobs } from "../../data";

export default function handler(_, res: NextApiResponse) {
  res.status(200).json(jobs);
}
