import React, { useState, useEffect } from "react";
import { projectUrl, students, supervisorsUrl } from "../../../apis";
import axios from "axios";
import { AiFillDelete } from "react-icons/ai";
import Progressbar from "../../../components/progressbar";
import { FaEdit } from "react-icons/fa";
import { AiFillCloseCircle } from "react-icons/ai";
import styles from "../dashboard_supervisor/projects.module.css";
import Modal from "react-awesome-modal";
import ReturnModal from "../../../components/Modals/dashboardprojectmodal";
import { erroralert,successalert } from "../../../components/alert";
import {StudentProjectManagemodel} from '../../../components/Modals/studentprojectmanagemodal'

export default function Projects({student}) {
  const [visible, setvisible] = useState(false);
  const [visibletwo, setvisibletwo] = useState(false);
  const [getData, setGetData] = useState(false);
  const [searchData, setSearchData] = useState("");
  const [searchBy, setSearchBy] = useState("Title");
  const [searchValue, setSearchValue] = useState("title");
  const [supervisorData, setSupervisorData] = useState(false);
  const [searchSupervisor, setSearchSupervisor] = useState(false);
  const [studentData, setStudentData] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [addProject, setAddProject] = useState(false);
  const [displayData, setDisplayData] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [idset,setidset] = useState('');
  const data = [];
  const api = axios.create({
    baseURL: projectUrl,
  });

  const studentApi = axios.create({
    baseURL: students,
  });

  const supervisorApi = axios.create({
    baseURL: supervisorsUrl,
  });
  useEffect(() => {
    api
      .get("/")
      .then((res) => {
        setGetData(res.data.projects);

        supervisorApi
          .get("/")
          .then((res) => {
            setSupervisorData(res.data.supervisor);
          })
          .catch((err) => {
            erroralert('Error',err.message);
          });

        studentApi
          .get("/")
          .then((res) => {
            setStudentData(res.data);
          })
          .catch((err) => {
            erroralert('Error',err.message);
          });
      })
      .catch((err) => {
        erroralert('Error',err.message);
      });
  }, [refresh]);

  // function toggleModel(action, project) {
  //   if (action === "add") {
  //     addProject ? setAddProject(false) : setAddProject(true);
  //   } else if (action === "update") {
  //     editForm ? setEditForm(false) : setEditForm(true);
  //   }
  //   if (project !== null) {
  //     var supervisorName = "";
  //     supervisorData.map(
  //       (e) => project.supervisor === e._id && (supervisorName = e.name)
  //     );

  //     setDisplayData({
  //       _id: project._id,
  //       title: project.title,
  //       status: project.status,
  //       description: project.description,
  //       objectives: project.objectives,
  //       batch: project.batch,
  //       supervisor: supervisorName,
  //       member_1: project.group[0],
  //       member_2: project.group[1],
  //       member_3: project.group[2],
  //     });
  //   }
  // }

  function handleSearch(e) {
    setRefresh(!refresh);
    var getValue = e.target.value;
    if (getValue === "Title") {
      setSearchValue("title");
    } else if (getValue === "Project ID") {
      setSearchValue("_id");
    } else if (getValue === "Batch") {
      setSearchValue("batch");
    } else if (getValue === "Supervisor") {
      var data = [];
      getData &&
        getData.map((project) =>
          supervisorData.map(
            (sp) =>
              project.supervisor === sp._id &&
              (data = [...data, { ...project, supervisorName: sp.name }])
          )
        );
      setSearchSupervisor(data);
      setSearchValue("supervisorName");
    } else if (getValue === "Status") {
      setSearchValue("status");
    } else if (getValue === "Group Member") {
      setSearchValue("group");
    }
    setSearchBy(e.target.value);
  }
  function handleChange(e) {
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
  function handleSubmit(e) {
    e.preventDefault();
    var supervisorID;
    supervisorData.map(
      (e) => e.name === displayData.supervisor && (supervisorID = e._id)
    );
    console.log(supervisorID);

    var manageGroup = [displayData.member_1];
    if (displayData.member_2 !== "" && displayData.member_2 !== undefined) {
      manageGroup = [...manageGroup, displayData.member_2];
    }
    if (displayData.member_3 !== "" && displayData.member_3 !== undefined) {
      manageGroup = [...manageGroup, displayData.member_3];
    }
    var putProject = {
      title: displayData.title,
      status: displayData.status,
      description: displayData.description,
      objectives: displayData.objectives,
      batch: displayData.batch,
      supervisor: supervisorID,
      group: manageGroup,
    };
    if (editForm) {
      putProject = { ...putProject, _id: idset };
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
              setDisplayData(false);
              setvisibletwo(false)
              successalert('Success',"Project Update Successfully");
            } else if (result.err.code === 11000) {
              erroralert('Error'
                `This ${JSON.stringify(result.err.keyValue)} is already in use`
              );
            } else if (result.err.message) {
              erroralert('Error',result.err.message);
            }
          },
          (error) => {
            erroralert('Error',error.message);
          }
        );
    }
    if (addProject) {
      console.log(putProject);
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(putProject),
      };
      fetch(`${projectUrl}`, options)
        .then((res) => res.json())
        .then(
          (result) => {
            console.log(result);
            if (result.err.code === 0) {
              setRefresh(!refresh);
              setvisible(false);
              successalert('Success',"Project Add Successfully");
            } else if (result.err.code === 11000) {
              erroralert('Error'
                `This ${JSON.stringify(result.err.keyValue)} is already in use`
              );
            } else if (result.err.message) {
              erroralert('Error',result.err.message);
            }
          },
          (error) => {
            erroralert('Error',error);
          }
        );
    }
  }

  return (
    <>
      
      <div className="data-container">
        <div className="data-container-top">
          <input
            type="search"
            value={searchData}
            onChange={(e) => setSearchData(e.target.value)}
            placeholder={"Search Project By " + searchBy}
          />

          <select onChange={handleSearch}>
            <option value="Title">Title</option>
            <option value="Project ID">Project ID</option>
            <option value="Batch">Batch</option>
            <option value="Status">Status</option>
            <option value="Supervisor">Supervisor</option>
            <option value="Group Member">Group Member</option>
          </select>
          <button
            className="add-data-btn"
            onClick={() => {
              setAddProject(true);
              setvisible(true);
            }}
          >
            Create A New Project
          </button>
        </div>
        
        <div className={styles.mainprojectdiv}>
          {/* <div className={styles.halfdiv}> */}
          {!getData ? (
            <div style={{ width: "100%" }}>
              <Progressbar visibility={true} />
            </div>
          ) : searchSupervisor ? (
            searchSupervisor
              .filter(
                (project) =>
                  project[searchValue].toString().indexOf(searchData) > -1
              )
              .map((project, i) => {
                
                console.log(project);
                return (
                  <div className={styles.halfdiv} key={i}>
                    <div>
                      <h1 className="project-title">
                        Project Title : <span>{project.title}</span>
                      </h1>

                      <h1>
                        Status : <span>{project.status}</span>
                      </h1>

                      <h1>
                        Description : <span>{project.description}</span>
                      </h1>

                      <h1>
                        Objectives : <span>{project.objectives}</span>
                      </h1>

                      <h1>
                        Batch : <span>{project.batch}</span>
                      </h1>

                      <h1>
                        Supervisor : <span> {project.supervisorName}</span>
                      </h1>

                      <h1 className="project-group">
                        Group Members :
                        {project.group.map((group, i) => (
                          // console.log(group)
                          <span key={i}>{group}</span>
                        ))}
                      </h1>

                      <h1>Project ID : {project._id}</h1>
                    </div>
                    <div className="manage-buttons">
                      <button
                        className="update-user"
                        title="Edit Project"
                        onClick={() => {
                          setDisplayData({
                            _id: project._id,
                            title: project.title,
                            status: project.status,
                            description: project.description,
                            objectives: project.objectives,
                            batch: project.batch,
                            // supervisor: supervisorName,
                            member_1: project.group[0],
                            member_2: project.group[1],
                            member_3: project.group[2],
                          });
                          setidset(project._id)
                          setvisible(true)}}
                      >
                        <FaEdit size="1.5rem" />
                      </button>
                      <button
                        className="delete-user"
                        title="Delete Project"
                        onClick={() => deleteProject(project._id)}
                      >
                        <AiFillDelete size="1.5rem" />
                      </button>
                    </div>
                  </div>
                );
              })
          ) : (
            getData &&
            getData
              .filter(
                (project) =>
                  project[searchValue].toString().indexOf(searchData) > -1
              )
              .map((project, i) => {
                
                return(
                <div className={styles.halfdiv} key={i}>
                  <div>
                    <h1>
                      Project Title : <span>{project.title}</span>
                    </h1>

                    <h1>
                      Status : <span>{project.status}</span>
                    </h1>

                    <h1>
                      Description : <span>{project.description}</span>
                    </h1>

                    <h1>
                      Objectives : <span>{project.objectives}</span>
                    </h1>

                    <h1>
                      Batch : <span>{project.batch}</span>
                    </h1>

                    <h1>
                      Supervisor :
                      {supervisorData &&
                        supervisorData.map(
                          (e) =>
                            project.supervisor === e._id && (
                              <span>{e.name}</span>
                            )
                        )}
                    </h1>

                    <h1 className="project-group">
                      Group Members :
                      {project.group.map((group) => (
                        <span>{group}</span>
                      ))}
                    </h1>
                    <h1>
                      Project ID : <span>{project._id}</span>
                    </h1>
                  </div>
                  <div className="manage-buttons">
                    <button
                      className="update-user"
                      title="Edit Project"
                      onClick={() => {
                        setDisplayData({
                          _id: project._id,
                          title: project.title,
                          status: project.status,
                          description: project.description,
                          objectives: project.objectives,
                          batch: project.batch,
                          // supervisor: supervisorName,
                          member_1: project.group[0],
                          member_2: project.group[1],
                          member_3: project.group[2],
                        });
                        setidset(project._id)
                        setEditForm(true);
                        setvisibletwo(true);
                      }}
                    >
                      <FaEdit size="1.5rem" />
                    </button>
                    {!student && (
                      <button
                      className="delete-user"
                      title="Delete Project"
                      onClick={() => deleteProject(project._id)}
                    >
                      <AiFillDelete size="1.5rem" />
                    </button>
                    )}
                    
                  </div>
                </div>
              )})
          )}
        </div>

        {!student && (
          <>
          <ReturnModal
          visibilty={visible}
          setvisibility={setvisible}
          setformtype={setAddProject}
          submitfunc={handleSubmit}
          changefunc={handleChange}
          data={displayData}
          supdata={supervisorData}
          stddata={studentData}
          type="add"
          setid={setidset}
        />
        <ReturnModal
          visibilty={visibletwo}
          setvisibility={setvisibletwo}
          setformtype={setEditForm}
          submitfunc={handleSubmit}
          changefunc={handleChange}
          data={displayData}
          supdata={supervisorData}
          stddata={studentData}
          type="update"
          setid={setidset}
        />
        </>
        )}
        {student && (
          <StudentProjectManagemodel
          visibilty={visibletwo}
          setvisibility={setvisibletwo}
          setformtype={setEditForm}
          submitfunc={handleSubmit}
          changefunc={handleChange}
          data={displayData}
          supdata={supervisorData}
          stddata={studentData}
          type="update"
          setid={setidset}
        />
        )}
          
        
      </div>
    </>
  );
}
