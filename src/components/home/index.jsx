import React from "react";
import { HomeContainer } from "./style";
import { Carousel } from "./components/carousel";
import { Navbar } from "../navbar";
import { useTheme } from "../../global/themeContext.js";

export const Home = () => {
  const { isDarkMode } = useTheme();
  return (
    <HomeContainer $isDarkMode={isDarkMode}>
      <Navbar />
      <Carousel horizontalAlignment={true} key={"horizontal"} />
      <Carousel horizontalAlignment={false} key={"vertical"} />
    </HomeContainer>
  );
};
