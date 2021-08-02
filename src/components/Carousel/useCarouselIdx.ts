import { useEffect, useState } from "react";

interface State {
  idx: number;
}

type HandleScroll = (id: number) => any;

function useCarouselIdx(
  handleScroll: HandleScroll,
  uncontrol: State,
  control?: State
) {
  // uncontrol is the state return by useCarouselUncontrolled, it is always true
  // control is the state provided by props, it can be undefined
  // choose currId base on whether control is provided
  //
  const [currIdx, setCurIdx] = useState(control?.idx || uncontrol.idx);

  useEffect(() => {
    // update currIdx when control.idx updated
    if (!!control) setCurIdx(control.idx);
  }, [control]);

  useEffect(() => {
    // update with uncontrol.
    if (!!control) return;
    setCurIdx(uncontrol.idx);
  }, [control, uncontrol.idx]);

  useEffect(() => {
    handleScroll(currIdx);
  }, [currIdx, handleScroll]);

  return currIdx;
}

export default useCarouselIdx;
