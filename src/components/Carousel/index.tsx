import React, { memo, ReactNode } from "react";
import styled from "styled-components";

import useCarouselScroll from "./useCarouselScroll";
import useCarouselScrollEvt from "./useCarouselScrollEvt";

interface CarouselProps {
  children: Array<ReactNode>;
  control: Control;
  isVertical?: boolean;
  handleScroll?: (idx: number) => any;
  scrollable?: boolean;
}

interface Control {
  idx: number;
}

const Container = styled.div<{ scrollable: boolean; isVertical: boolean }>`
  width: 100%;
  height: 100%;
  overflow-x: ${(props) =>
    !props.isVertical && props.scrollable ? "scroll" : "hidden"};
  overflow-y: ${(props) =>
    !!props.isVertical && props.scrollable ? "scroll" : "hidden"};
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
  handleScroll = () => {},
  isVertical = false,
  scrollable = false,
}) => {
  const count = children?.length || 1;

  const refs = React.useRef<Array<HTMLElement>>(Array.from({ length: count }));
  const { idx: currIdx } = control;

  useCarouselScroll(currIdx, refs.current);
  const { handleScrollEvt } = useCarouselScrollEvt(
    count,
    isVertical,
    handleScroll
  );

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

  if (!children || !children.length) return <></>;

  return (
    <Container
      isVertical={isVertical}
      scrollable={scrollable}
      onScroll={handleScrollEvt as any}
    >
      <Slider {...containerSizes} isVertical={isVertical}>
        {children.map((item, idx) => (
          <ItemContainer
            key={`CarouselItem-${idx}`}
            {...itemSizes}
            ref={(ref) => {
              if (!ref) return;
              refs.current[idx] = ref;
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
