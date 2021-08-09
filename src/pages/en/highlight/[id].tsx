import { GetStaticPropsContext } from "next";

import HighlightDetail from "../../../containers/HighlightDetail";
import { fetchHighlight, fetchHighlights } from "../../../utils";

export default function HighlightDetailPage({ highlight }) {
  return <HighlightDetail {...highlight} lang="en" />;
}

export const getStaticPaths = async () => {
  const highlights = await fetchHighlights();
  return {
    paths: highlights.map((itm) => ({ params: { id: `${itm.id}` } })),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const { id } = params;
  return {
    props: {
      highlight: await fetchHighlight(Number(id)),
    },
  };
};
