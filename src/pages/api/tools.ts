import { NextApiResponse } from "next";

import { tools } from "../../data";

export default function handler(_, res: NextApiResponse) {
  res.status(200).json(tools);
}
