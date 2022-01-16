import React, { useState, useEffect } from "react";
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { BsFillImageFill } from "react-icons/bs";
import { AiFillCloseCircle } from "react-icons/ai";
import Progressbar from "../progressbar";
import { students } from "../../apis";

export default function Student() {
  const [addStudent, setAddStudent] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [searchData, setSearchData] = useState("");
  const [searchBy, setSearchBy] = useState("Roll Number");
  const [getData, setGetData] = useState(false);
  const [displayData, setDisplayData] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetch(students)
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          setGetData(result);
        },
        (error) => {
          setGetData(error);
        }
      );
  }, [refresh]);

  function deleteStudent(id) {
    console.log("Delete ", id);
    const options = {
      method: "DELETE",
    };
    fetch(`${students}/${id}`, options)
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          setRefresh(!refresh);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  function toggleModel(e, student) {
    setDisplayData(student);
    if (e === "add") {
      addStudent ? setAddStudent(false) : setAddStudent(true);
    } else if (e === "form") {
      if (editForm) {
        setEditForm(false);
      } else {
        setEditForm(true);
      }
    }
  }

  function handleChange(e) {
    const name = e.target.name;
    var value = e.target.value;
    setDisplayData({ ...displayData, [name]: value });
  }

  function onSubmit(e) {
    e.preventDefault();
    console.log(displayData._id);
    console.log(`${students}/${displayData._id}`);
    const update = {
      email: "frontend@gmail.com",
    };
    const options = {
      method: "patch",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ update }),
    };
    fetch(`${students}/${displayData._id}`, options)
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          setDisplayData(false);
          setRefresh(!refresh);
        },
        (error) => {
          console.log(error);
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
        <select onChange={(e) => setSearchBy(e.target.value)}>
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
              <th scope='col'>#Roll-No</th>
              <th scope='col'>Name</th>
              <th scope='col'>Department</th>
              <th scope='col'>Section</th>
              <th scope='col'>Batch</th>
              <th scope='col'>Email</th>
              <th scope='col'>Phone</th>
              <th colSpan='2' scope='col'>
                Options
              </th>
            </tr>
          </thead>
          <tbody>
            {getData.map((student) => (
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
                    {/* <button className="view-btn" title="Student View" onClick={()=>toggleModel("view",student)}><BsFillImageFill size="1.5rem"/></button> */}
                    <button
                      className='update-user'
                      title='Edit Student'
                      onClick={() => toggleModel("form", student)}
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
              <form className='data-form' autoComplete='off' id='student-form'>
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
                    value={displayData.password}
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
                  onClick={() => toggleModel("form")}
                />
              </span>
              <button
                className='close-data'
                onClick={() => toggleModel("form")}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
