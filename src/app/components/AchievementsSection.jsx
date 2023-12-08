"use client";
import React, { useEffect, useState } from "react";

let AnimatedNumbers;
if (typeof window !== "undefined") {
  AnimatedNumbers = require("react-animated-numbers").default;
}

const AchievementsSection = () => {

  // State to manage the dynamic import
  const [AnimatedNumbersModule, setAnimatedNumbersModule] = useState(null);

  // useEffect to dynamically import AnimatedNumbers when component mounts
  useEffect(() => {
    if (!AnimatedNumbersModule) {
      import("react-animated-numbers").then((module) => {
        setAnimatedNumbersModule(module.default);
      });
    }
  }, [AnimatedNumbersModule]);

  // If AnimatedNumbersModule is not yet available, you can show a loading state
  if (!AnimatedNumbersModule) {
    return <p>Loading...</p>;
  }

  // Data for achievements
  const achievementsList = [
    {
      metric: "Projects",
      value: "1",
      postfix: "",
    },
    {
      prefix: "",
      metric: "Leetcode Questions",
      value: "2",
    },
    {
      metric: "Certificates",
      value: "3",
    },
    {
      metric: "Years",
      value: "4",
    },
  ];

  return (
    <div id="about" className="py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
      <div className="sm:border-[#33353F] sm:border rounded-md py-8 px-16 flex flex-col sm:flex-row items-center justify-between">
        {achievementsList.map((achievement, index) => {
          return (
            <div
              className="flex flex-col items-center justify-center mx-4"
              key={index}
            >
              <h2 className="text-white text-4xl font-bold flex flex-row">
                {achievement.prefix}
                <AnimatedNumbersModule
                  includeComma
                  locale="en-US"
                  className="text-white text-4xl font-bold"
                  configs={(_, index) => {
                    return {
                      mass: 1,
                      friction: 100,
                      tensions: 140 * (index + 1),
                    };
                  }}
                  animateToNumber={parseInt(achievement.value)}
                />
                {achievement.postfix}
              </h2>
              <p className="text-base text-[#ADB7BE]">{achievement.metric}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AchievementsSection;
