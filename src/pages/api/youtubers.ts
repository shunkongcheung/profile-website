import { NextApiResponse } from "next";

import { youtubers } from "../../data";

export default async function handler(_, res: NextApiResponse) {
  res.status(200).json(await youtubers());
}

