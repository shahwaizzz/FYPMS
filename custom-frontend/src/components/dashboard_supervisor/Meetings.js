import React, { useState, useEffect } from "react";
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { AiFillCloseCircle } from "react-icons/ai";
import Progressbar from "../progressbar";
import { students } from "../../apis";
import axios from "axios";

export default function Meetings() {
  const [addStudent, setAddStudent] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [searchData, setSearchData] = useState("");
  const [searchBy, setSearchBy] = useState("Roll Number");
  const [getData, setGetData] = useState(false);
  const [displayData, setDisplayData] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [searchValue, setSearchValue] = useState("rollNumber");

  const api = axios.create({
    baseURL: students,
  });

  useEffect(() => {
    axios
      .get(students)
      .then((res) => {
        setGetData(res.data);
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
    fetch(students, options)
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          if (result.err.code === 0) {
            setDisplayData(false);
            setRefresh(!refresh);
            alert("Student Add Successfully");
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
    const options = {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(displayData),
    };
    fetch(`${students}/${displayData._id}`, options)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.err.code === 0) {
            setDisplayData(false);
            setRefresh(!refresh);
            alert("Student Update Successfully");
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
          placeholder={"Search Student By " + searchBy}
        />

        <select onChange={handleSearch}>
          <option value='Roll Number'>Roll Number</option>
          <option value='Name'>Name</option>
          <option value='Batch'>Batch</option>
          <option value='Section'>Section</option>
          <option value='Department'>Department</option>
          <option value='Email'>Email</option>
          <option value='Phone'>Phone</option>
        </select>
        <button className='add-data-btn' onClick={() => toggleModel("add")}>
          Add Student
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
              <th scope='col'>Sr No.</th>
              <th scope='col'>Title</th>
              <th scope='col'>Project</th>
              <th scope='col'>Date</th>
              <th scope='col'>Time</th>
              <th scope='col'>Venu</th>
              <th scope='col'>Phone</th>
              <th colSpan='2' scope='col'>
                Options
              </th>
            </tr>
          </thead>
          <tbody>
            {getData
              .filter(
                (student) =>
                  student[searchValue].toString().indexOf(searchData) > -1
              )
              .map((student) => (
                <tr key={student._id}>
                  <td data-label='#Roll-No'>{student.rollNumber}</td>
                  <td data-label='Name'>{student.name}</td>
                  <td data-label='Department'>{student.department}</td>
                  <td data-label='Section'>{student.section}</td>
                  <td data-label='Batch'>{student.batch}</td>
                  <td data-label='Email'>{student.email}</td>
                  <td data-label='Phone'>{student.phone}</td>
                  <td data-label='Options'>
                    <div className='manage-buttons'>
                      <button
                        className='update-user'
                        title='Edit Student'
                        onClick={() => toggleModel("update", student)}
                      >
                        <FaEdit size='1.5rem' />
                      </button>
                      <button
                        className='delete-user'
                        title='Delete Student'
                        onClick={() => deleteStudent(student._id)}
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
      {addStudent && (
        <div className='popup-container'>
          <div className='popup'>
            <h2>Add Student</h2>
            <div className='form-modal'>
              <form
                className='data-form'
                onSubmit={submitStudent}
                autoComplete='off'
                id='student-form'
              >
                <div>
                  <label>Student Roll Number</label>
                  <input
                    type='text'
                    name='rollNumber'
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label>Student Name</label>
                  <input type='text' name='name' onChange={handleChange} />
                </div>
                <div>
                  <label>Department</label>
                  <input
                    type='text'
                    name='department'
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label>Section</label>
                  <input type='text' name='section' onChange={handleChange} />
                </div>
                <div>
                  <label>Batch</label>
                  <input type='text' name='batch' onChange={handleChange} />
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
                  <button type='submit'>Add Student</button>
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
            <h2>Edit Student</h2>
            <div className='form-modal'>
              <form
                className='data-form'
                onSubmit={onSubmit}
                autoComplete='off'
                id='student-form'
              >
                <div>
                  <label>Student Roll Number</label>
                  <input
                    type='text'
                    name='rollNumber'
                    value={displayData.rollNumber}
                    onChange={handleChange}
                  />
                  <input
                    type='text'
                    name='_id'
                    value={displayData._id}
                    hidden
                  />
                </div>
                <div>
                  <label>Student Name</label>
                  <input
                    type='text'
                    name='name'
                    value={displayData.name}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label>Department</label>
                  <input
                    type='text'
                    name='department'
                    value={displayData.department}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label>Section</label>
                  <input
                    type='text'
                    name='section'
                    value={displayData.section}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label>Batch</label>
                  <input
                    type='text'
                    name='batch'
                    value={displayData.batch}
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
                  <label>Password</label>
                  <input
                    type='password'
                    name='password'
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <button type='submit'>Edit Student</button>
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
