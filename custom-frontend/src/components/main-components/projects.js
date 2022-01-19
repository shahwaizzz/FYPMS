import React, { useState, useEffect } from "react";
import { projectUrl, students, supervisorsUrl} from "../../apis";
import axios from "axios";
import {AiFillDelete} from "react-icons/ai";
import {FaEdit} from "react-icons/fa";
import { AiFillCloseCircle } from "react-icons/ai";

export default function Projects() {
const [getData, setGetData] = useState(false);
const [searchData, setSearchData] = useState("");
const [searchBy, setSearchBy] = useState("Title");
const [searchValue, setSearchValue] = useState("title");
const [supervisorData, setSupervisorData] = useState(false);
const [studentData, setStudentData] = useState(false);
const [editForm, setEditForm] = useState(false);
const [displayData, setDisplayData] = useState(false);

  const api = axios.create({
    baseURL: projectUrl,
  });

  const studentApi = axios.create({
    baseURL: students,
  });

  const supervisorApi = axios.create({
    baseURL: supervisorsUrl,
  })
  useEffect(() => {
       api
      .get("/")
      .then((res) => {
        setGetData(res.data.projects);

        supervisorApi.get("/").then((res) => {
          setSupervisorData(res.data.supervisor);
        }).catch((err) => {
          alert(err);
        });

        studentApi.get("/").then((res) => {
          setStudentData(res.data);
        }).catch((err) => {
          alert(err);
        });
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  function toggleModel(project) {
    setDisplayData(project);
    editForm ? setEditForm(false) : setEditForm(true);
    }
  
  function handleSearch(){}
  function handleChange(){}
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
          <option value='Title'>Title</option>
          <option value='ID'>ID</option>
          <option value='Status'>Status</option>
          <option value='Email'>Email</option>
          <option value='Phone'>Phone</option>
        </select>
      </div>
        {getData && getData.map(project => 
        <div className="show-projects">
          <div>
          <h1 className="project-title">Project Title : <span>{project.title}</span></h1>
          <br/>
          <h1>Status : <span>{project.status}</span></h1>
          <br/>
          <h1>Description : <span>{project.description}</span></h1>
          <br/>
          <h1>Objectives : <span>{project.objectives}</span></h1>
          <br/>
          <h1>Supervisor : 
          {supervisorData && supervisorData.map(e => project.supervisor === e._id &&
            <span> {e.name}</span>
          )}
          </h1>
          <br/>
          <h1 className="project-group">Group Members : 
          {project.group.map(group => (
            studentData && studentData.map(e=> group === e._id && (
              <span> {e.rollNumber} , </span>
            ))))}
          </h1>
          <br/>
          <h1>Project ID : <span>{project._id}</span></h1>
          </div>
          <div className="manage-buttons">
            <button className="update-user" title="Edit Project" onClick={() => toggleModel(project)}><FaEdit size="1.5rem"/></button>
            <button className="delete-user" title="Delete Project"><AiFillDelete size="1.5rem"/></button>
          </div>
        </div>
        )}
         {editForm && displayData && (
        <div className='popup-container'>
          <div className='popup'>
            <h2>Edit Project</h2>
            <div className='form-modal'>
              <form
                className='data-form'
                // onSubmit={onSubmit}
                autoComplete='off'
                id='student-form'
              >
                <input type='text' name='_id' value={displayData._id} hidden />
                <div>
                  <label>Project Title</label>
                  <input
                    type='text'
                    name='title'
                    value={displayData.title}
                    onChange={handleChange}
                  />
                </div>
                 <div>
                  <label>Description</label>
                  <input
                    type='text'
                    name='description'
                    value={displayData.description}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label>Objective</label>
                  <input
                    type='text'
                    name='objective'
                    value={displayData.objectives}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label>Supervisor</label>
                  {supervisorData && supervisorData.map(e => displayData.supervisor === e._id &&
                    <input
                    type='text'
                    name='supervisor'
                    value={e.name}
                    onChange={handleChange}
                  />
                  )}  
                </div>
               
                  {displayData.group.map(group => (
                  studentData && studentData.map(e=> group === e._id && (
                    <div>
                    <label>Group Member</label>
                    <input
                    type='text'
                    name=''
                    value={e.rollNumber}
                    onChange={handleChange}
                  />
                  </div>
                  ))))}
                  
                 
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
