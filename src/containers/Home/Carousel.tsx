import React, { memo, ReactNode } from "react";
import styled from "styled-components";

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

interface CarouselProps {
  children: Array<ReactNode>;
  interval?: number;
  isInfinite?: boolean;
  isVertical?: boolean;
  handleScroll?: (idx: number) => any;
}

const Carousel: React.FC<CarouselProps> = ({
  children,
  handleScroll = () => {},
  interval = 5000,
  isInfinite = false,
  isVertical = false,
}) => {
  const [state, setState] = React.useState({ idx: -1 });

  const count = children?.length || 1;
  const refs = React.useRef(Array.from({ length: count }));

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
    const clear = setInterval(() => {
      setState((state) => {
        const oIdx = state.idx;
        const nIdx = oIdx + 1;

        const isOver = nIdx >= count;

        if (!isInfinite && isOver) {
          clearInterval(clear);
          return { idx: oIdx };
        } else {
          return { idx: nIdx % count };
        }
      });
    }, interval);

    return () => clearInterval(clear);
  }, [setState, count, interval, isInfinite]);

  React.useEffect(() => {
    const ref = refs.current[state.idx] as HTMLElement;
    if (!ref) return;

    ref.scrollIntoView({ behavior: "smooth" });
  }, [state.idx]);

  React.useEffect(() => {
    handleScroll(state.idx);
  }, [state.idx, handleScroll]);

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
