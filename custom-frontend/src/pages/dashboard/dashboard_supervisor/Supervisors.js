import React, { useState, useEffect } from "react";
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { AiFillCloseCircle } from "react-icons/ai";
import Progressbar from "../../../components/progressbar";
import { supervisorsUrl } from "../../../apis";
import axios from "axios";

export default function Supervisors() {
  const [addStudent, setAddStudent] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [searchData, setSearchData] = useState("");
  const [searchBy, setSearchBy] = useState("Roll Number");
  const [getData, setGetData] = useState(false);
  const [displayData, setDisplayData] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [searchValue, setSearchValue] = useState("rollNumber");
  const [searching, setsearching] = useState(false);

  const api = axios.create({
    baseURL: supervisorsUrl,
  });

  useEffect(() => {
    axios
      .get(supervisorsUrl)
      .then((res) => {
        console.log(res.data.supervisor);
        setGetData(res.data.supervisor);
      })
      .catch((res) => {
        alert(res);
      });
  }, [refresh]);

  function deleteStudent(id) {
    var check = window.confirm("Are sure you want to delete the student");
    if (check) {
      api
        .delete(`/${id}`)
        .then((res) => {
          if (res.status === 200) {
            setRefresh(!refresh);
            alert("Student Delete Successfully");
          }
        })
        .catch((res) => {
          alert(res);
        });
    }
  }

  function toggleModel(e, student) {
    setDisplayData(student);
    if (e === "add") {
      addStudent ? setAddStudent(false) : setAddStudent(true);
    } else if (e === "update") {
      editForm ? setEditForm(false) : setEditForm(true);
    }
  }

  function handleChange(e) {
    const name = e.target.name;
    var value = e.target.value;
    setDisplayData({ ...displayData, [name]: value });
  }

  function handleSearch(e) {
    var getValue = e.target.value;
    if (getValue === "Roll Number") {
      setSearchValue("rollNumber");
    } else if (getValue === "Name") {
      setSearchValue("name");
    } else if (getValue === "Batch") {
      setSearchValue("batch");
    } else if (getValue === "Section") {
      setSearchValue("section");
    } else if (getValue === "Department") {
      setSearchValue("department");
    } else if (getValue === "Email") {
      setSearchValue("email");
    } else if (getValue === "Phone") {
      setSearchValue("phone");
    }
    setSearchBy(e.target.value);
  }
  function submitStudent(e) {
    e.preventDefault();
    const options = {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(displayData),
    };
  }

  function onSubmit(e) {
    e.preventDefault();
    const options = {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(displayData),
    };
  }
  return (
    <div className='data-container'>
      <div className='data-container-top'>
        <input
          type='search'
          value={searchData}
          onChange={(e) => {
            setsearching(true);
            setSearchData(e.target.value);
            if (e.target.value === "") {
              setsearching(false);
            }
          }}
          placeholder={"Search Supervisor By " + searchBy}
        />

        <select onChange={handleSearch}>
          <option value='Name'>Name</option>
          <option value='ID'>ID</option>
          <option value='Department'>Department</option>
          <option value='Email'>Email</option>
          <option value='Phone'>Phone</option>
        </select>
      </div>
      {!getData ? (
        <div>
          <Progressbar visibility={true} />
        </div>
      ) : (
        <table className='table'>
          <thead>
            <tr>
              <th scope='col'>ID</th>
              <th scope='col'>Name</th>
              <th scope='col'>Department</th>
              <th scope='col'>Email</th>
              <th scope='col'>Phone</th>
            </tr>
          </thead>
          <tbody>
            {!searching &&
              getData?.map((supervisor) => (
                <tr key={supervisor._id}>
                  <td data-label='ID'>{supervisor._id}</td>
                  <td data-label='Name'>{supervisor.name}</td>
                  <td data-label='Department'>{supervisor.department}</td>
                  <td data-label='Email'>{supervisor.email}</td>
                  <td data-label='Phone'>{supervisor.phone}</td>
                </tr>
              ))}
            {searching &&
              getData
                ?.filter(
                  (supervisor) =>
                    supervisor[searchValue]?.toString().indexOf(searchData) > -1
                )
                .map((supervisor) => {
                  return (
                    <tr key={supervisor._id}>
                      <td data-label='ID'>{supervisor._id}</td>
                      <td data-label='Name'>{supervisor.name}</td>
                      <td data-label='Department'>{supervisor.department}</td>
                      <td data-label='Email'>{supervisor.email}</td>
                      <td data-label='Phone'>{supervisor.phone}</td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
      )}
    </div>
  );
}
