import React, { useState } from "react";
import ReactDataGrid from "react-data-grid";
import reactSampleData from "./data-react";
import vueSampleData from "./data-vue";
import angularSampleData from "./data-angular";
import Button from "./Button";

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

  const vueClickHandler = e => {
    setRows(vueRows);
    setCount(vueRows.length);
  };

  const angularClickHandler = e => {
    setRows(angularRows);
    setCount(angularRows.length);
  };

  const reactClickHandler = e => {
    setRows(initialRows);
    setCount(initialRows.length);
  };

  return (
    <>
      <h1>
        <mark>{count}</mark> Job listings with{" "}
        <Button onClick={reactClickHandler}>
          <mark>react</mark>
        </Button>
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
      />
    </>
  );
};

export default Table;
