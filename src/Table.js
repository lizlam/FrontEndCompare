import React, { useState } from "react";
import ReactDataGrid from "react-data-grid";
import styled from "styled-components";
import reactSampleData from "./data-react";
import vueSampleData from "./data-vue";
import angularSampleData from "./data-angular";

const LocationFormatter = ({ value }) => {
  let remote = value === "Remote";
  return <>{remote ? <b>{value}</b> : <span>{value}</span>}</>;
};

const defaultColumnProperties = {
  width: 320
};

const columns = [
  { key: "type", name: "Type", sortable: true, sortDescendingFirst: true },
  { key: "title", name: "Title" },
  { key: "company", name: "Company" },
  { key: "location", name: "Location", formatter: LocationFormatter }
].map(c => ({ ...c, ...defaultColumnProperties }));

console.log(columns);

const getRows = obj => {
  let rows = obj.map(v => ({
    type: v.type,
    title: v.title,
    company: v.company,
    location: v.location
  }));
  return rows;
};

const initialRows = getRows(reactSampleData);
const vueRows = getRows(vueSampleData);
const angularRows = getRows(angularSampleData);

const sortRows = (initialRows, sortColumn, sortDirection) => rows => {
  const comparer = (a, b) => {
    if (sortDirection === "ASC") {
      return a[sortColumn] > b[sortColumn] ? 1 : -1;
    } else if (sortDirection === "DESC") {
      return a[sortColumn] < b[sortColumn] ? 1 : -1;
    }
  };
  return sortDirection === "NONE" ? initialRows : [...rows].sort(comparer);
};

const Table = props => {
  const [rows, setRows] = useState(initialRows);
  const [count, setCount] = useState(initialRows.length);
  const [selected, setSelected] = useState("react");

  console.log(selected);
  const Button = styled.button`
    font-size: 2rem;
    border-radius: 25%;
    margin: 0.3rem;
    background-color: ${props.selected ? "yellow" : ""};
    :hover {
      background-color: yellow;
    }
  `;

  const vueClickHandler = e => {
    setRows(vueRows);
    setCount(vueRows.length);
    setSelected("vue");
  };

  const angularClickHandler = e => {
    setRows(angularRows);
    setCount(angularRows.length);
    setSelected("angular");
  };

  const reactClickHandler = e => {
    setRows(initialRows);
    setCount(initialRows.length);
    setSelected("react");
  };

  return (
    <>
      <h1>
        <mark>{count}</mark> Job listings with '{selected}'
        <Button
          onClick={reactClickHandler}
          selected={() => (selected === "react" ? true : false)}
        >
          react
        </Button>
        <Button
          onClick={vueClickHandler}
          selected={selected === "vue" ? true : false}
        >
          vue
        </Button>
        <Button onClick={angularClickHandler}>angular</Button> in the
        description.
      </h1>
      <ReactDataGrid
        columns={columns}
        rowGetter={i => rows[i]}
        rowsCount={rows.length}
        onGridSort={(sortColumn, sortDirection) =>
          setRows(sortRows(initialRows, sortColumn, sortDirection))
        }
      />
    </>
  );
};

export default Table;
