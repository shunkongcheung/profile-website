import React, { memo, ReactNode } from "react";
import styled from "styled-components";
import { useWindowSize } from "../../hooks";

interface CarouselProps {
  children: Array<ReactNode>;
  control?: Control;
  isVertical?: boolean;
  uncontrol?: UnControl;
}

interface Control {
  idx: number;
}

interface UnControl {
  interval: number;
  handleScroll: (idx: number) => any;
}

const Container = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
`;

const Slider = styled.div<{
  width: number;
  height: number;
  isVertical: boolean;
}>`
  width: ${(props) => props.width * 100}%;
  height: ${(props) => props.height * 100}%;
  ${(props) => !props.isVertical && "display: flex;"}
`;

const ItemContainer = styled.div<{ width: number; height: number }>`
  width: ${(props) => props.width * 100}%;
  height: ${(props) => props.height * 100}%;
  padding-left: 5px;
  padding-right: 5px;
`;

const Carousel: React.FC<CarouselProps> = ({
  children,
  control,
  uncontrol,
  isVertical = false,
}) => {
  const [state, setState] = React.useState({ idx: -1 });
  const windowSize = useWindowSize();

  const count = children?.length || 1;
  const refs = React.useRef(Array.from({ length: count }));

  // current id
  const currId = React.useRef(!!control ? control.idx : state.idx);

  const containerSizes = React.useMemo(() => {
    return {
      width: isVertical ? 1 : count,
      height: isVertical ? count : 1,
    };
  }, [count, isVertical]);

  const itemSizes = React.useMemo(() => {
    return {
      width: isVertical ? 1 : 1 / count,
      height: isVertical ? 1 / count : 1,
    };
  }, [count, isVertical]);

  React.useEffect(() => {
    if (!uncontrol) return;
    const { interval } = uncontrol;

    const clear = setInterval(() => {
      setState((state) => {
        const oIdx = state.idx;
        const nIdx = oIdx + 1;

        const isOver = nIdx >= count;

        if (isOver) {
          clearInterval(clear);
          return { idx: oIdx };
        } else {
          return { idx: nIdx % count };
        }
      });
    }, interval);

    return () => clearInterval(clear);
  }, [setState, count, uncontrol]);

  React.useEffect(() => {
    // only update in uncontrol state
    if (!uncontrol) return;

    currId.current = state.idx;
    const ref = refs.current[state.idx] as HTMLElement;
    if (!ref) return;

    ref.scrollIntoView({ behavior: "smooth" });
  }, [uncontrol, state.idx]);

  React.useEffect(() => {
    // only update in uncontrol state
    if (!uncontrol) return;
    const { handleScroll } = uncontrol;
    handleScroll(state.idx);
  }, [state.idx, uncontrol]);

  React.useEffect(() => {
    // on resize, refocus to current item
    const refId = currId.current;
    const ref = refs.current[refId] as HTMLElement;
    if (!!ref) ref.scrollIntoView();
  }, [windowSize]);

  React.useEffect(() => {
    // only update uncontrol state
    if (!control) return;
    const { idx } = control;

    currId.current = idx;
    const ref = refs.current[idx] as HTMLElement;
    if (!ref) return;

    ref.scrollIntoView({ behavior: "smooth" });
  }, [control]);

  if (!children || !children.length) return <></>;

  return (
    <Container>
      <Slider {...containerSizes} isVertical={isVertical}>
        {children.map((item, idx) => (
          <ItemContainer
            key={`CarouselItem-${idx}`}
            {...itemSizes}
            ref={(ref) => {
              refs.current[idx] = ref;
              setState((o) => (o.idx !== -1 ? o : { idx: 0 }));
            }}
          >
            {item}
          </ItemContainer>
        ))}
      </Slider>
    </Container>
  );
};

export default memo(Carousel);
