import React, { useState, useEffect } from "react";
import {
  projectUrl,
  students,
  supervisorsUrl,
  stdupdateproject,
  stdgetproject,
  supervisorgetproject,
  stdupdatetemp,
} from "../../../apis";
import axios from "axios";
import { AiFillDelete } from "react-icons/ai";
import Progressbar from "../../../components/progressbar";
import { FaEdit } from "react-icons/fa";
import { AiFillCloseCircle } from "react-icons/ai";
import styles from "../dashboard_supervisor/projects.module.css";
import Modal from "react-awesome-modal";
import ReturnModal from "../../../components/Modals/dashboardprojectmodal";
import { erroralert, successalert } from "../../../components/alert";
import { StudentProjectManagemodel } from "../../../components/Modals/studentprojectmanagemodal";

export default function Projects({ student }) {
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
  const [idset, setidset] = useState("");
  const [file, setFile] = useState("");
  const [templates, settemplates] = useState([]);
  const [fileName, setFileName] = useState("");

  const [flag, setflag] = useState("");
  const std = localStorage.getItem("student");
  const supervisor = localStorage.getItem("supervisor");

  const onChange = (e) => {
    setflag(e.target.id);
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  console.log(file);
  console.log(fileName);
  const handlefileSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    console.log(formData);
    try {
      const response = axios.patch(
        stdupdatetemp(JSON.parse(std).rollno, flag),
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // const { fileName, filePath } = response.data;
      console.log(response);
      // setUploadedFiles({ fileName, filePath });
      successalert("Success", "File uploaded successfully");
      setRefresh(!refresh);
    } catch (error) {
      erroralert("Error", error.message);
    }
  };
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
    if (!std && !supervisor) {
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
              erroralert("Error", err.message);
            });

          studentApi
            .get("/")
            .then((res) => {
              setStudentData(res.data);
            })
            .catch((err) => {
              erroralert("Error", err.message);
            });
        })
        .catch((err) => {
          erroralert("Error", err.message);
        });
    }
    if (supervisor && !std) {
      axios
        .get(supervisorgetproject(JSON.parse(supervisor).userId))
        .then((res) => {
          console.log(res);
          setGetData(res.data.projects);
        })
        .catch((err) => {
          erroralert("Error", err.message);
        });
    }
    if (std && !supervisor) {
      axios
        .get(stdgetproject(JSON.parse(std).rollno))
        .then((res) => {
          console.log(res);
          setGetData(res.data.projects);
        })
        .catch((err) => {
          erroralert("Error", err.message);
        });
    }
  }, [refresh]);

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
    supervisorData &&  supervisorData.map(
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
              setvisibletwo(false);
              successalert("Success", "Project Update Successfully");
            } else if (result.err.code === 11000) {
              erroralert(
                "Error"`This ${JSON.stringify(
                  result.err.keyValue
                )} is already in use`
              );
            } else if (result.err.message) {
              erroralert("Error", result.err.message);
            }
          },
          (error) => {
            erroralert("Error", error.message);
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
              successalert("Success", "Project Add Successfully");
            } else if (result.err.code === 11000) {
              erroralert(
                "Error",
                `This ${JSON.stringify(result.err.keyValue)} is already in use`
              );
            } else if (result.err.message) {
              erroralert("Error", result.err.message);
            }
          },
          (error) => {
            erroralert("Error", error);
          }
        );
    }
  }

  async function studentupdateprojectsubmit(e) {
    e.preventDefault();

    const obj = {
      description: displayData?.description,
      objectives: displayData?.objectives,
    };

    const options = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      data: obj,
      url: stdupdateproject(JSON.parse(std).rollno),
    };

    try {
      const response = await axios(options);
      console.log(response);
      if (response.data) {
        setvisibletwo(false);
        setRefresh(!refresh);
        successalert("Success", "Project Updated Successfully");
      }
    } catch (err) {
      erroralert("Error", err.message);
    }
  }

  function createPerforma(project){
    console.log(project);
    var content = document.getElementById("preliminary-form");
    var pri = document.getElementById("print-preliminary-form").contentWindow;
    pri.document.open();
    pri.document.write(content.innerHTML);
    pri.document.close();
    pri.focus();
    pri.print();
  }

  return (
    <>
      <div className='data-container'>
        {!student && (
          <>
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
                <option value='Batch'>Batch</option>
                <option value='Status'>Status</option>
                <option value='Supervisor'>Supervisor</option>
                <option value='Group Member'>Group Member</option>
              </select>

              <button
                className='add-data-btn'
                onClick={() => {
                  setAddProject(true);
                  setvisible(true);
                }}
              >
                Create A New Project
              </button>
            </div>
          </>
        )}

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
                      <h1 className='project-title'>
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
                        Supervisor : <span> {project.supervisor}</span>
                      </h1>

                      <h1 className='project-group'>
                        Group Members :
                        {project.group.map((group, i) => (
                          // console.log(group)
                          <span key={i}>{group}</span>
                        ))}
                      </h1>
                      <h1 className='project-group'>Project docs :</h1>
                      <div>
                        <h1>proposal</h1>
                        <a
                          style={{ color: "greenyellow" }}
                          href={project.projecDoc?.proposal}
                          download
                        >
                          {project.projectDoc?.proposal.slice(31)}
                        </a>
                      </div>
                      <div>
                        <h1>Mid Evaluation</h1>
                        <a
                          style={{ color: "greenyellow" }}
                          href={project.projecDoc?.midEvaluation}
                        >
                          {project.projectDoc?.midEvaluation?.slice(31)}
                        </a>
                      </div>
                      <div>
                        <h1>Final Documentation</h1>
                        <a
                          style={{ color: "greenyellow" }}
                          href={project.projecDoc?.finalDocumentation}
                        >
                          {project.projectDoc?.finalDocumentation?.slice(31)}
                        </a>
                      </div>

                      <h1>Project ID : {project._id}</h1>
                    </div>
                    <div className='manage-buttons'>
                      <button
                        className='update-user'
                        title='Edit Project'
                        onClick={() => {
                          setDisplayData({
                            _id: project._id,
                            title: project.title,
                            status: project.status,
                            description: project.description,
                            objectives: project.objectives,
                            batch: project.batch,
                            supervisor: project.supervisor,
                            member_1: project.group[0],
                            member_2: project.group[1],
                            member_3: project.group[2],
                          });
                          console.log(project.supervisor);
                          setidset(project._id);
                          setvisible(true);
                        }}
                      >
                        <FaEdit size='1.5rem' />
                      </button>
                      <button
                        className='delete-user'
                        title='Delete Project'
                        onClick={() => deleteProject(project._id)}
                      >
                        <AiFillDelete size='1.5rem' />
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
                console.log(project?.projecDoc?.finalDocumentation);
                console.log(project?.projecDoc?.proposal);
                console.log(project?.projecDoc?.midEvaluation);

                return (
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
                        Supervisor :<span>{project.supervisor}</span>
                      </h1>

                      <h1 className='project-group'>
                        Group Members :
                        {project.group.map((group) => (
                          <span>{group}</span>
                        ))}
                      </h1>
                      <h1 className='project-group'>Project docs :</h1>
                      <div>
                        <h1>proposal</h1>
                        <a
                          style={{ color: "green", fontWeight: "bold" }}
                          href={project.projecDoc?.proposal}
                          download
                        >
                          {project.projectDoc?.proposal.slice(31)}
                        </a>
                      </div>
                      <div>
                        <h1>Mid Evaluation</h1>
                        <a
                          style={{ color: "green", fontWeight: "bold" }}
                          href={project.projecDoc?.midEvaluation}
                        >
                          {project.projectDoc?.midEvaluation?.slice(31)}
                        </a>
                      </div>
                      <div>
                        <h1>Final Documentation</h1>
                        <a
                          style={{ color: "green", fontWeight: "bold" }}
                          href={project.projecDoc?.finalDocumentation}
                        >
                          {project.projectDoc?.finalDocumentation?.slice(31)}
                        </a>
                      </div>

                      <h1>
                        Project ID : <span>{project._id}</span>
                      </h1>
                    </div>
                    <div className='manage-buttons'>
                      <button
                        className='update-user'
                        title='Edit Project'
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
                          setidset(project._id);
                          setEditForm(true);
                          setvisibletwo(true);
                        }}
                      >
                        <FaEdit size='1.5rem' />
                      </button>
                      {!student && (
                        <button
                          className='delete-user'
                          title='Delete Project'
                          onClick={() => deleteProject(project._id)}
                        >
                          <AiFillDelete size='1.5rem' />
                        </button>
                      )}
                      <button onClick={()=>createPerforma(project)}>Preliminary Form</button>
                    </div>
                    {student && (
                      <div style={{ marginTop: "10px" }}>
                        {project.projectDoc?.proposal === undefined && (
                          <form
                            class='register-form'
                            onSubmit={handlefileSubmit}
                          >
                            <h3>Proposal Project</h3>
                            <input
                              id='proposal'
                              class='form-field widt input1'
                              type='file'
                              placeholder='file'
                              name='file'
                              onChange={onChange}
                            />

                            <button
                              className='form-field button1 docu green'
                              type='submit'
                              name='upload'
                            >
                              Upload
                            </button>
                          </form>
                        )}
                        {project.projectDoc?.midEvaluation === undefined && (
                          <form
                            class='register-form'
                            onSubmit={handlefileSubmit}
                          >
                            <h3>Mid Evaluation</h3>
                            <input
                              id='mid'
                              class='form-field widt input1'
                              type='file'
                              placeholder='file'
                              name='file'
                              onChange={onChange}
                            />

                            <button
                              className='form-field button1 docu green'
                              type='submit'
                              name='upload'
                            >
                              Upload
                            </button>
                          </form>
                        )}
                        {project.projectDoc?.finalDocumentation ===
                          undefined && (
                          <form
                            class='register-form'
                            onSubmit={handlefileSubmit}
                          >
                            <h3>Final Evaluation</h3>

                            <input
                              id='final'
                              class='form-field widt input1'
                              type='file'
                              placeholder='file'
                              name='file'
                              onChange={onChange}
                            />

                            <button
                              className='form-field button1 docu green'
                              type='submit'
                              name='upload'
                            >
                              Upload
                            </button>
                          </form>
                        )}
                      </div>
                    )}
                  </div>
                );
              })
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
              type='add'
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
              type='update'
              setid={setidset}
              supid={supervisor ? JSON.parse(supervisor).userId : null}
              supervisor={supervisor}
            />
          </>
        )}
        {student && (
          <StudentProjectManagemodel
            visibilty={visibletwo}
            setvisibility={setvisibletwo}
            setformtype={setEditForm}
            submitfunc={studentupdateprojectsubmit}
            changefunc={handleChange}
            data={displayData}
            type='update'
            setid={setidset}
          />
        )}
      </div>
      <iframe id="print-preliminary-form" style={{display:"none"}} title="Preliminary Form">
          <div  id="preliminary-form"  style={{display:"none",width:"100%"}}>
             <div className="main" style={{border: "1px solid black"}}>
              <div className="hdr">
                  <div className="imgdiv">
                      <img src="logo.jpg" height="76%"  alt="logo"/>
                  </div>
                  <div className="hdrdiv2">
                      <h2>Gujrat Institute of Management Sciences</h2>
                          <h2>PMAS-Arid Agriculture University Rawalpindi/</h2>
                          <h3 className="hd1">Preliminary Proposal Form</h3>
                  </div>
              </div>
        <div className="content">
             <div className="heading">
                <h3>Preliminary Proposal Form</h3>
                
            </div> 
            <div className="t1">
                <table className="t4" style={{border: "1px solid black"}} spellspace="0">
                    <tr>
                        <th className="blackc">Program/Semester</th>
                        <td></td>
                    </tr>
                </table> 
                <table style={{border: "1px solid black"}} spellspace="0">
                    <tr>
                        <td className="blackc"><b>Program/Semester </b></td>
                        <td className="td-width"></td>
                        <td className="blackc"><b>No.of Members </b></td>
                        <td className="td-width"></td>
                    </tr>
                    
                    <tr>
                        <td className="blackc"><b>SUPERVISOR NAME </b></td>
                        <td className="td-width"></td>
                        <td className="blackc"><b>Date </b></td>
                        <td className="td-width"></td>
                    </tr>
                     <tr>
                        <td className="grayc"><b>ENTITLED AS: </b></td>
                        <td> <input type="checkbox"/> <b>Permanent </b> <input type="checkbox"/> <b>Visiting</b> </td>
                        <td className="grayc"><b>DESIGNATION: </b></td>
                        <td></td>
                    </tr> 
                </table>
            </div>
            <div>
                <h4 classNameName="studhd"></h4>
            </div>
            <div className="tab23">
                <table style={{border: "1px solid black"}}>
                    <tr>
                        <th></th>
                        <th>Reg.No.</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Contact</th>
                        
                    </tr>
                    <tr>
                        <th>1</th>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        
                    </tr>
                    <tr>
                        <th>2</th>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        
                    </tr>
                    <tr>
                        <th>3</th>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        
                    </tr>
                </table>
            </div>
            <div>
                <h3 className="studhd">(Provide 3 project ideas starting from first priority):</h3>
            </div>
            <div className="t3">
                <table style={{border: "1px solid black"}}>
                    <tr>
                        <td colspan="4"><b>1st preference:</b></td>
                    </tr>
                    <tr>
                        <td colspan="4"><b>2nd preference:</b></td>
                    </tr>
                    <tr>
                        <td colspan="4"><b>3rd preference:</b></td>
                    </tr>
                    
                </table>
            </div>
            <div>
                <h3 className="studhd">(Mention here elective courses taken in degree):</h3>
            </div>
            <div className="t3">
                <table style={{border: "1px solid black"}}>
                    <tr>
                        <td colspan="4"></td>
                    </tr>
                    <tr>
                        <td colspan="4"></td>
                    </tr>
                    <tr>
                        <td colspan="4"></td>
                    </tr>
                    
                </table>
            </div>
            <div>
                <h3 className="studhd">(Mention your programming languages, tools you are skilled in:</h3>
            </div>
            <div className="t3">
                <table style={{border: "1px solid black"}}>
                    <tr>
                        <td colspan="4"></td>
                    </tr>
                    <tr>
                        <td colspan="4"></td>
                    </tr>
                    <tr>
                        <td colspan="4"></td>
                    </tr>
                    
                </table>
            </div>
            <div className="space">

            </div>
            <div>
                <table>
                    <tr>
                        <td>
                            <table style={{border: "1px solid black"}} spellspace="0">
                                <tr>
                                    <th colspan="3" className="blackc padd1">MEMBERS’ SIGNATURES</th>
                                </tr>
                                <tr>
                                    <td className="srwidth">1</td>
                                    <td colspan="2"></td>
                                </tr>
                                <tr>
                                    <td className="srwidth">2</td>
                                    <td colspan="2"></td>
                                </tr>
                                <tr>
                                    <td className="srwidth">3</td>
                                    <td colspan="2"></td>
                                </tr>
                            </table>
                        </td>
                         <td><div className="signdiv"><p>Supervisor’s Signature</p></div></td>   
                    </tr>
                    <tr >
                          
                    </tr>

                </table>
            </div>
            <div>
                <ul>
                    <li><h2>Note:</h2></li>
                    <li className="mmargin"><h3>Skills, objectives or idea you choose shoul be purposeful</h3></li>
                    <li className="mmargin"><h3>Skills/project being covered in the projects should be objective driven</h3></li>
                    <li className="mmargin"><h3>Confirm that the projects are rigors and truly assess your abilities</h3></li>
                </ul>
            </div>
            <div className="space">
                
            </div>
        </div>
        
    </div>
         </div>
      </iframe>
    </>
  );
}
