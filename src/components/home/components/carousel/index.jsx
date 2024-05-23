import React, { useEffect, useRef, useState } from "react";
import { AppCard } from "./AppCard";
import { AppsContainer, InnerContainer, ArrowButton } from "../../style";
import { useCarouselDataFetcher } from "./hooks/useCarouselDataFetcher";
import { useArrowsVisibility } from "./hooks/useArrowsVisibility";
import { useScrollManager } from "./hooks/useScrollManager";
import { Loading } from "./loading";

export const Carousel = ({ horizontalAlignment }) => {
  const [cardFactor, setCardFactor] = useState(0);
  const innerContainerRef = useRef(null);
  const cardsMargin = 20;

  const { dataContainer } = useCarouselDataFetcher(horizontalAlignment);

  const { showArrows, handleMouseEnter, handleMouseLeave } =
    useArrowsVisibility();

  const { currentIndex, useTransition, handleNext, handlePrev } =
    useScrollManager(dataContainer);

  useEffect(() => {
    const handleResize = () => {
      const containerWidth = innerContainerRef.current.offsetWidth;
      const itemFactor = cardFactor
        ? cardFactor
        : containerWidth / dataContainer.data.length - 2;
      if (horizontalAlignment) {
        innerContainerRef.current.style.transform = `translateX(-${
          currentIndex * (itemFactor + cardsMargin)
        }px)`;
      } else {
        innerContainerRef.current.style.transform = `translateY(-${
          currentIndex * (itemFactor + cardsMargin)
        }px)`;
      }
    };
    if (dataContainer.data.length > 0) {
      window.addEventListener("resize", handleResize);
      handleResize();
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [currentIndex, dataContainer, cardFactor, horizontalAlignment]);

  return (
    <>
      {dataContainer.data.length > 0 ? (
        <AppsContainer
          $horizontal={horizontalAlignment}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <ArrowButton
            $horizontal={horizontalAlignment}
            $isFirst={true}
            $showArrows={showArrows}
            onClick={handlePrev}
          ></ArrowButton>
          <InnerContainer
            $horizontal={horizontalAlignment}
            ref={innerContainerRef}
            $useTransition={useTransition}
          >
            {dataContainer.data.length > 0 &&
              dataContainer.data.map((item, index) => (
                <AppCard
                  horizontalAlignment={horizontalAlignment}
                  key={item.id + index}
                  data={item}
                  index={index}
                  setCardFactor={setCardFactor}
                />
              ))}
          </InnerContainer>
          <ArrowButton
            $horizontal={horizontalAlignment}
            $isFirst={false}
            $showArrows={showArrows}
            onClick={handleNext}
          ></ArrowButton>
        </AppsContainer>
      ) : (
        <Loading />
      )}
    </>
  );
};
