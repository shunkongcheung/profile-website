import { NextApiResponse } from "next";

import { highlights } from "../../data";

export default function handler(_, res: NextApiResponse) {
  res.status(200).json(highlights);
}
