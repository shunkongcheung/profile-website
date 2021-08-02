import React, { memo, ReactNode } from "react";
import styled from "styled-components";

import useCarouselIdx from "./useCarouselIdx";
import useCarouselScroll from "./useCarouselScroll";
import useCarouselUncontrolled from "./useCarouselUncontrolled";

interface CarouselProps {
  children: Array<ReactNode>;
  control?: Control;
  isVertical?: boolean;
  uncontrol?: UnControl;
  handleScroll?: (idx: number) => any;
  scrollable?: boolean;
}

interface Control {
  idx: number;
}

interface UnControl {
  interval: number;
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
  uncontrol,
  handleScroll = () => {},
  isVertical = false,
  scrollable = false,
}) => {
  const count = children?.length || 1;

  const refs = React.useRef<Array<HTMLElement>>(Array.from({ length: count }));

  const { initUncontrolled, ...uncontrolState } = useCarouselUncontrolled(
    count,
    uncontrol
  );
  const currIdx = useCarouselIdx(handleScroll, uncontrolState, control);
  useCarouselScroll(currIdx, refs.current);

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

  // React.useEffect(() => {
  //   const handler = (evt) => {
  //     console.log(
  //       evt.originalTarget.scrollingElement.scrollTop,
  //       evt.originalTarget.scrollingElement.scrollLeft
  //     );
  //   };
  //   window.addEventListener("scroll", handler);
  //   return () => window.removeEventListener("scroll", handler);
  // }, []);

  if (!children || !children.length) return <></>;

  return (
    <Container isVertical={isVertical} scrollable={scrollable}>
      <Slider {...containerSizes} isVertical={isVertical}>
        {children.map((item, idx) => (
          <ItemContainer
            key={`CarouselItem-${idx}`}
            {...itemSizes}
            ref={(ref) => {
              if (!ref) return;
              refs.current[idx] = ref;
              initUncontrolled();
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
