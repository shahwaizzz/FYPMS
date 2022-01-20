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
const [searchSupervisor, setSearchSupervisor] = useState(false);
const [studentData, setStudentData] = useState(false);
const [editForm, setEditForm] = useState(false);
const [displayData, setDisplayData] = useState(false);
const [refresh, setRefresh] = useState(false);
var std = [];
var data = [];
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
      
  },[refresh]);

  function toggleModel(project) {
    if(project !== null){
        var supervisorName = "";
        supervisorData.map(e => project.supervisor === e._id && (supervisorName = e.name));
  
      setDisplayData({
        _id:project._id,
        title:project.title,
        status:project.status,
        description:project.description,
        objectives:project.objectives,
        batch:project.batch,
        supervisor:supervisorName,
        member_1:project.group[0],
        member_2:project.group[1],
        member_3:project.group[2],
      });
    }
    editForm ? setEditForm(false) : setEditForm(true);
    }
  
  function handleSearch(e){
    setRefresh(!refresh)
    var getValue = e.target.value;
    if (getValue === "Title") {
      setSearchValue("title");
    } else if (getValue === "Project ID") {
      setSearchValue("_id");
    }else if (getValue === "Batch") {
      setSearchValue("batch");
    } else if (getValue === "Supervisor") {
      var data = [];
      getData && getData.map(project =>
        supervisorData.map(sp=> (project.supervisor === sp._id) &&(data = [...data,{...project,supervisorName:sp.name}])
      ))
        setSearchSupervisor(data);
        setSearchValue("supervisorName");
    }else if (getValue === "Status") {
      setSearchValue("status");
    } else if (getValue === "Group Member") {
      setSearchValue("group");
    }
    setSearchBy(e.target.value);
  }
  function handleChange(e){
    const name = e.target.name;
    var value = e.target.value;
    setDisplayData({ ...displayData, [name]: value });
  }
  function deleteProject(id) {
    var check = window.confirm("Are sure you want to delete the project");
    if (check) {
      api
        .delete(`/${id}`)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            setRefresh(!refresh);
            alert("Project Delete Successfully");
          }
        })
        .catch((res) => {
          alert(res);
        });
    }
  }
  function handleSubmit(e){
    e.preventDefault();
    var supervisorID;
    supervisorData.map(e => e.name === displayData.supervisor && (supervisorID = e._id))
    console.log(supervisorID)

    var manageGroup = [displayData.member_1];
    if(displayData.member_2 !== '' ){
      manageGroup = [...manageGroup,displayData.member_2]
    }
    if(displayData.member_3 !== '' ){
      manageGroup = [...manageGroup,displayData.member_3]
    }
    const putProject = {
      _id:displayData._id,
      title:displayData.title,
      status:displayData.status,
      description:displayData.description,
      objectives:displayData.objectives,
      batch:displayData.batch,
      supervisor:supervisorID,
      group:manageGroup,
    } 
    console.log(putProject);
    const options = {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(putProject),
    };
    fetch(`${projectUrl}/${putProject._id}`, options)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.err.code === 0) {
            setRefresh(!refresh);
            toggleModel(null);
            setDisplayData(false);
            alert("Project Update Successfully");
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
          placeholder={"Search Project By " + searchBy}
        />

        <select onChange={handleSearch}>
          <option value='Title'>Title</option>
          <option value='Project ID'>Project ID</option>
          <option value="Batch">Batch</option>
          <option value='Status'>Status</option>
          <option value='Supervisor'>Supervisor</option>
          <option value='Group Member'>Group Member</option>
        </select>
      </div>
      {searchSupervisor ? ( searchSupervisor.filter((project) =>(project[searchValue].toString().indexOf(searchData) > -1)
        ).map(project => 
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
          <h1>Batch : <span>{project.batch}</span></h1>
          <br/>
          <h1>Supervisor : 
          {supervisorData && supervisorData.map(e => project.supervisor === e._id &&
            <span> {e.name}</span>
          )}
          </h1>
          <br/>
          <h1 className="project-group">Group Members : 
          {project.group.map(group => (
              <span> {group} , </span>
            ))}
          </h1>
          <br/>
          <h1>Project ID : <span>{project._id}</span></h1>
          </div>
          <div className="manage-buttons">
            <button className="update-user" title="Edit Project" onClick={() => toggleModel(project)}><FaEdit size="1.5rem"/></button>
            <button className="delete-user" title="Delete Project" onClick={() => deleteProject(project._id)}><AiFillDelete size="1.5rem"/></button>
          </div>
        </div>)):(
      getData && getData.filter((project) =>(project[searchValue].toString().indexOf(searchData) > -1)
        ).map(project => 
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
          <h1>Batch : <span>{project.batch}</span></h1>
          <br/>
          <h1>Supervisor : 
          {supervisorData && supervisorData.map(e => project.supervisor === e._id &&
            <span> {e.name}</span>
          )}
          </h1>
          <br/>
          <h1 className="project-group">Group Members : 
          {project.group.map(group => (
              <span> {group} , </span>
            ))}
          </h1>
          <br/>
          <h1>Project ID : <span>{project._id}</span></h1>
          </div>
          <div className="manage-buttons">
            <button className="update-user" title="Edit Project" onClick={() => toggleModel(project)}><FaEdit size="1.5rem"/></button>
            <button className="delete-user" title="Delete Project" onClick={() => deleteProject(project._id)}><AiFillDelete size="1.5rem"/></button>
          </div>
        </div>
        )
      )}
         {editForm && displayData && (
        <div className='popup-container'>
          <div className='popup'>
            <h2>Edit Project</h2>
            <div className='form-modal'>
              <form
                className='data-form'
                onSubmit={handleSubmit}
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
                  <label>Status</label>
                  <select 
                    name="status" 
                    value={displayData.status} 
                    onChange={handleChange}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Approved">Approved</option>
                    <option value="Working">Working</option>
                    <option value="Complete">Complete</option>
                  </select>
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
                    name='objectives'
                    value={displayData.objectives}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label>Batch</label>
                  <input
                    type='number'
                    name='batch'
                    value={displayData.batch}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label>Supervisor</label>
                    <input
                    type='text'
                    name='supervisor'
                    value={displayData.supervisor}
                    list = "supervisor-list"
                    onChange={handleChange}
                  />
                  <datalist id="supervisor-list">
                    {supervisorData.map(e =>
                      <option>{e.name}</option>
                    )}
                  </datalist>
                </div>
                  <div>
                  <label>Group Leader</label>
                  <input
                  type='text'
                  name='member_1'
                  value={displayData.member_1}
                  onChange={handleChange}
                  list="student-list"
                  placeholder="None"
                  required
                />
                </div>
                <div>
                  <label>Group Member</label>
                  <input
                  type='text'
                  name='member_2'
                  value={displayData.member_2}
                  onChange={handleChange}
                  list="student-list"
                  placeholder="None"
                />
                </div>
                <div>
                  <label>Group Member</label>
                  <input
                  type='text'
                  name='member_3'
                  value={displayData.member_3}
                  onChange={handleChange}
                  list="student-list"
                  placeholder="None"
                />
                </div>
                <datalist id="student-list">
                    {studentData.map(e =>
                      <option>{e.rollNumber}</option>
                    )}
                  </datalist>
                
                <div>
                  <button type='submit'>Edit Project</button>
                </div>
              </form>
              <span>
                <AiFillCloseCircle
                  size='1.7rem'
                  onClick={() => toggleModel(null)}
                />
              </span>
              <button
                className='close-data'
                onClick={() => toggleModel(null)}
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