import { NextApiResponse } from "next";

import { tags } from "../../data";

export default function handler(_, res: NextApiResponse) {
  res.status(200).json(tags);
}
