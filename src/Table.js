import React, { useState } from "react";
import ReactDataGrid from "react-data-grid";
import reactSampleData from "./data-react";
import vueSampleData from "./data-vue";
import angularSampleData from "./data-angular";

const LocationFormatter = ({ value }) => {
  let remote = value === "Remote";
  return <>{remote ? <b>{value}</b> : <span>{value}</span>}</>;
};

const columns = [
  { key: "type", name: "Type", sortable: true, sortDescendingFirst: true },
  { key: "title", name: "Title" },
  { key: "company", name: "Company" },
  { key: "location", name: "Location", formatter: LocationFormatter }
];

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
  const { value } = props;
  if (value === "react") {
    //let data = getRows(reactSampleData);
    //setRows(data);
  } else if (value === "vue") {
    console.log(vueRows);
    //setRows(vueRows);
  } else {
    setRows(getRows(angularSampleData));
  }

  return (
    <>
      <h1>
        Job listings with <b>'{value}'</b> in the description.
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
