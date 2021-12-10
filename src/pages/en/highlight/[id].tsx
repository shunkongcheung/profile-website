import { GetServerSidePropsContext } from "next";

import HighlightDetail from "../../../containers/HighlightDetail";
import {highlights} from "../../../data";

export default function HighlightDetailPage({ id }) {
  const highlight = highlights.find(itm => itm.id === Number(id))
  return <HighlightDetail {...highlight!!} lang="en" />;
}

export const getServerSideProps = async ({ params }: GetServerSidePropsContext) => {
  const { id } = params;
  return { props: { id } };
};
