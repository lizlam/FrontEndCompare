import React, { useState } from "react";
import { VictoryChart, VictoryBar } from "victory";
import reactSampleData from "./data-react";
import vueSampleData from "./data-vue";
import angularSampleData from "./data-angular";
import Table from "./Table";

function BarChart() {
  const [selected, setSelected] = useState("vue");
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
      <Table value={selected} />
    </>
  );
}

export default BarChart;
