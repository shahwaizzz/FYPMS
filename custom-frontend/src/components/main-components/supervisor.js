import React, { useState, useEffect } from "react";
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { AiFillCloseCircle } from "react-icons/ai";
import Progressbar from "../progressbar";
import { supervisorsUrl } from "../../apis";
import axios from "axios";

export default function Supervisor() {
  const [addSupervisor, setAddSupervisor] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [searchData, setSearchData] = useState("");
  const [searchBy, setSearchBy] = useState("Name");
  const [getData, setGetData] = useState(false);
  const [displayData, setDisplayData] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [searchValue, setSearchValue] = useState("name");

  const api = axios.create({
    baseURL: supervisorsUrl,
  });

  useEffect(() => {
    fetch("/")
      .then((res) => {
        console.log(res);
        res.json();
      })
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
    // api
    //   .get("/")
    //   .then((res) => {
    //     console.log("sssss");
    //     setGetData(res.data.supervisor);
    //   })
    //   .catch((err) => {
    //     // alert(err, "hello");
    //     console.log("hello");
    //   });
  }, [refresh]);

  function deleteStudent(id) {
    var check = window.confirm("Are sure you want to delete the supervisor");
    if (check) {
      api
        .delete(`/${id}`)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            setRefresh(!refresh);
            alert("Supervisor Delete Successfully");
          }
        })
        .catch((res) => {
          alert(res);
        });
    }
  }

  function toggleModel(e, supervisor) {
    setDisplayData(supervisor);
    if (e === "add") {
      addSupervisor ? setAddSupervisor(false) : setAddSupervisor(true);
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
    if (getValue === "ID") {
      setSearchValue("_id");
    } else if (getValue === "Name") {
      setSearchValue("name");
    } else if (getValue === "Department") {
      setSearchValue("department");
    } else if (getValue === "Email") {
      setSearchValue("email");
    } else if (getValue === "Phone") {
      setSearchValue("phone");
    }
    setSearchBy(e.target.value);
  }
  function submitSupervisor(e) {
    e.preventDefault();
    const options = {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(displayData),
    };
    fetch(supervisorsUrl, options)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.err.code === 0) {
            setDisplayData(false);
            setRefresh(!refresh);
            alert("Supervisor Add Successfully");
          } else if (result.err.code === 11000) {
            alert(
              `This ${JSON.stringify(result.err.keyValue)} is already in use`
            );
          } else if (result.err.message) {
            alert(result.err.message);
          }
        },
        (error) => {
          alert(error);
        }
      );
  }

  function onSubmit(e) {
    e.preventDefault();
    console.log(displayData);
    const options = {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(displayData),
    };
    fetch(`${supervisorsUrl}/${displayData._id}`, options)
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          if (result.err.code === 0) {
            setDisplayData(false);
            setRefresh(!refresh);
            alert("Supervisor Update Successfully");
          } else if (result.err.code === 11000) {
            alert(
              `This ${JSON.stringify(result.err.keyValue)} is already in use`
            );
          } else if (result.err.message) {
            alert(result.err.message);
          }
        },
        (error) => {
          alert(error);
        }
      );
  }
  return (
    <div className='data-container'>
      <div className='data-container-top'>
        <input
          type='search'
          value={searchData}
          onChange={(e) => setSearchData(e.target.value)}
          placeholder={"Search Supervisor By " + searchBy}
        />

        <select onChange={handleSearch}>
          <option value='Name'>Name</option>
          <option value='ID'>ID</option>
          <option value='Department'>Department</option>
          <option value='Email'>Email</option>
          <option value='Phone'>Phone</option>
        </select>
        <button className='add-data-btn' onClick={() => toggleModel("add")}>
          Add Supervisor
        </button>
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
              <th colSpan='2' scope='col'>
                Options
              </th>
            </tr>
          </thead>
          <tbody>
            {getData
              .filter(
                (supervisor) =>
                  supervisor[searchValue].toString().indexOf(searchData) > -1
              )
              .map((supervisor) => (
                <tr key={supervisor._id}>
                  <td data-label='ID'>{supervisor._id}</td>
                  <td data-label='Name'>{supervisor.name}</td>
                  <td data-label='Department'>{supervisor.department}</td>
                  <td data-label='Email'>{supervisor.email}</td>
                  <td data-label='Phone'>{supervisor.phone}</td>
                  <td data-label='Options'>
                    <div className='manage-buttons'>
                      <button
                        className='update-user'
                        title='Edit Student'
                        onClick={() => toggleModel("update", supervisor)}
                      >
                        <FaEdit size='1.5rem' />
                      </button>
                      <button
                        className='delete-user'
                        title='Delete Student'
                        onClick={() => deleteStudent(supervisor._id)}
                      >
                        <AiFillDelete size='1.5rem' />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
      {addSupervisor && (
        <div className='popup-container'>
          <div className='popup'>
            <h2>Add Supervisor</h2>
            <div className='form-modal'>
              <form
                className='data-form'
                onSubmit={submitSupervisor}
                autoComplete='off'
                id='student-form'
              >
                <div>
                  <label>Supervisor Name</label>
                  <input type='text' name='name' onChange={handleChange} />
                </div>
                <div>
                  <label>Department</label>
                  <select name='department' onChange={handleChange} required>
                    <option value=''>Select Department</option>
                    <option value='CS'>Computer Science</option>
                    <option value='IT'>Information Security</option>
                    <option value='SE'>Software Engineering</option>
                  </select>
                </div>
                <div>
                  <label>Email</label>
                  <input type='email' name='email' onChange={handleChange} />
                </div>
                <div>
                  <label>Phone Number</label>
                  <input type='number' name='phone' onChange={handleChange} />
                </div>
                <div>
                  <label>Password</label>
                  <input
                    type='password'
                    name='password'
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <button type='submit'>Add Supervisor</button>
                </div>
              </form>
              <span>
                <AiFillCloseCircle
                  size='1.7rem'
                  onClick={() => toggleModel("add")}
                />
              </span>
              <button className='close-data' onClick={() => toggleModel("add")}>
                Close
              </button>
              <form />
            </div>
          </div>
        </div>
      )}
      {editForm && displayData && (
        <div className='popup-container'>
          <div className='popup'>
            <h2>Edit Supervisor</h2>
            <div className='form-modal'>
              <form
                className='data-form'
                onSubmit={onSubmit}
                autoComplete='off'
                id='student-form'
              >
                <input type='text' name='_id' value={displayData._id} hidden />
                <div>
                  <label>Supervisor Name</label>
                  <input
                    type='text'
                    name='name'
                    value={displayData.name}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label>Email</label>
                  <input
                    type='email'
                    name='email'
                    value={displayData.email}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label>Phone Number</label>
                  <input
                    type='number'
                    name='phone'
                    value={displayData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label>Department</label>
                  <select
                    name='department'
                    value={displayData.department}
                    onChange={handleChange}
                    required
                  >
                    <option value=''>Select Department</option>
                    <option value='CS'>Computer Science</option>
                    <option value='IT'>Information Security</option>
                    <option value='SE'>Software Engineering</option>
                  </select>
                </div>
                <div>
                  <label>Password</label>
                  <input
                    type='password'
                    name='password'
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <button type='submit'>Edit Supervisor</button>
                </div>
              </form>
              <span>
                <AiFillCloseCircle
                  size='1.7rem'
                  onClick={() => toggleModel("update")}
                />
              </span>
              <button
                className='close-data'
                onClick={() => toggleModel("update")}
              >
                Close
              </button>
              <form />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
