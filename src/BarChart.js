import React, { useState, useEffect } from "react";
import { VictoryChart, VictoryBar } from "victory";
import reactSampleData from "./data-react";
import vueSampleData from "./data-vue";
import angularSampleData from "./data-angular";

function BarChart() {
  useEffect(() => {
    let timerId = setTimeout(() => console.log("Hello!"), 5000);
    return () => {
      clearTimeout(timerId);
    };
  }, []);

  return (
    <>
      <VictoryChart domainPadding={25}>
        <VictoryBar
          animate={{ duration: 1000 }}
          categories={{
            x: ["React", "Vue", "Angular"]
          }}
          data={[
            { x: "React", y: reactSampleData.length },
            { x: "Vue", y: vueSampleData.length },
            { x: "Angular", y: angularSampleData.length }
          ]}
        />
      </VictoryChart>
    </>
  );
}

export default BarChart;
