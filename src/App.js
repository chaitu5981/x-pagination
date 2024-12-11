import React, { useEffect, useState } from "react";
import "./App.css";
const App = () => {
  const [page, setPage] = useState(0);
  const [employees, setEmployees] = useState([]);
  const fetchData = async () => {
    try {
      const res = await fetch(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      const data = await res.json();
      setEmployees(data);
    } catch (error) {
      alert("failed to fetch data");
    }
  };

  const goToNext = () => {
    let n = employees.length;
    let pages = n / 10 ? Math.floor(n / 10) + 1 : n / 10;
    if (page === pages - 1) return;
    setPage(page + 1);
  };

  const goToPrevious = () => {
    if (page === 0) return;
    setPage(page - 1);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <h1>Employee Data Table</h1>
      <table className="table">
        <thead>
          <tr className="row">
            <td>ID</td>
            <td>Name</td>
            <td>Email</td>
            <td>Role</td>
          </tr>
        </thead>
        <tbody>
          {employees.slice(page * 10, (page + 1) * 10).map((e) => (
            <tr className="row">
              <td>{e.id}</td>
              <td>{e.name}</td>
              <td>{e.email}</td>
              <td>{e.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="btns">
        <button onClick={goToPrevious}>Previous</button>
        <div className="page">{page + 1}</div>
        <button onClick={goToNext}>Next</button>
      </div>
    </div>
  );
};

export default App;
