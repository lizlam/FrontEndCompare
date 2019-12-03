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
  resizable: true,
  sortable: true,
  width: 320
};

const columns = [
  { key: "type", name: "Type", sortable: true, sortDescendingFirst: true },
  { key: "title", name: "Title" },
  { key: "company", name: "Company" },
  { key: "location", name: "Location", formatter: LocationFormatter }
].map(c => ({ ...c, ...defaultColumnProperties }));

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

  const Button = styled.button`
    font-size: 2rem;
    border-radius: 25%;
    margin: 0.3rem;
    font-weight: ${props => (props.children === selected ? "bold" : "")};
    background-color: ${props => (props.children === selected ? "yellow" : "")};
    :hover {
      background-color: yellow;
    }
    :focus {
      outline: none;
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

  const EmptyRowsView = () => {
    const message = "No data to show";
    return <h2>{message}</h2>;
  };

  return (
    <>
      <h1>
        <mark>{count}</mark> Job listings with
        <Button onClick={reactClickHandler}>react</Button>
        <Button onClick={vueClickHandler}>vue</Button>
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
        onColumnResize={(idx, width) =>
          console.log(`Column ${idx} has been resized to ${width}`)
        }
        emptyRowsView={EmptyRowsView}
      />
    </>
  );
};

export default Table;
