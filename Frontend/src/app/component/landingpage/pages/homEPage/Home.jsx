import React from "react";
import HeroSection from "../../HeroSection";
import { homeObjOne, homeObjTwo, homeObjThree, homeObjFour } from "./Data";

const Home = () => {
  return (
    <>
      <HeroSection {...homeObjOne} />
      <HeroSection {...homeObjThree} />
      <HeroSection {...homeObjTwo} />
      <HeroSection {...homeObjFour} />
    </>
  );
};

export default Home;
