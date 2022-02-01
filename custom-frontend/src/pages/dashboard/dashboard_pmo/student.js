import React, { useState, useEffect } from "react";
import { AiFillDelete } from "react-icons/ai";
import { FaEdit, FaMarker } from "react-icons/fa";
import { AiFillCloseCircle } from "react-icons/ai";
import Progressbar from "../../../components/progressbar";
import { students,assignmarks,assignmarkssupervisor } from "../../../apis";
import axios from "axios";
import {MarksModal,Supervisorassignmarks} from "../../../components/Modals/assignmarksstudentpmomodal";
import ReturnModal from "../../../components/Modals/dashboardstudentsmodal";
import { successalert,erroralert } from "../../../components/alert";


export default function Student({admin}) {
  const [addStudent, setAddStudent] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [searchData, setSearchData] = useState("");
  const [searchBy, setSearchBy] = useState("Roll Number");
  const [getData, setGetData] = useState(false);
  const [displayData, setDisplayData] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [searchValue, setSearchValue] = useState("rollNumber");
  const [visible, setvisible] = useState(false);
  const [visibletwo, setvisibletwo] = useState(false);
  const [visiblethree, setvisiblethree] = useState(false);
  const [idset, setidset] = useState();
  const [marksdata, setmarksdata] = useState({});
  const [supervisormarks,setsupervisormarks] = useState({
    studentId:'',
    marks:''
  });


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
        erroralert('Error',res.message);
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
          erroralert('Error',res.message);
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
  function handleChangemarks(e) {
    const name = e.target.name;
    var value = e.target.value;
    if (name === "proposal") {
      setmarksdata({
        flag: "proposal",
        marks: +value,
      });
    } else if (name === "mid") {
      setmarksdata({
        flag: "mid",
        marks: +value,
      });
    } else if (name === "final") {
      setmarksdata({
        flag: "final",
        marks: +value,
      });
    }
  }

  function changesupervisormarks(e){
    setsupervisormarks({studentId:idset,marks:+e.target.value})
  }
  
  async function Submitsupervisormarks(e){
    e.preventDefault()
    setsupervisormarks({...supervisormarks,marks:""})

    const options = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      data:supervisormarks,
      url:assignmarkssupervisor
    }

    try{

      const response = await axios(options)
      console.log(response)
      if(response.data){
        setvisiblethree(false)
        successalert('Success','Marks has been assigned')
      }
    }catch(err){
      erroralert('Error',err.message)
    }
  }

  async function submitmarks(e) {

    e.preventDefault()

    const options = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      data: marksdata,
      url:assignmarks(idset)
    };

    try{

      const response = await axios(options)
      if(response.data){
        setvisiblethree(false)

        successalert('Success','Marks has been assigned')
      }
      console.log(response.data);

    }catch(err){
      console.log(err)
    }
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
            setDisplayData(result);
            setRefresh(!refresh);
            setvisible(false)
            successalert('Success',"Student Add Successfully");
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

  function onSubmit(e) {
    e.preventDefault();
    const options = {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(displayData),
    };
    fetch(`${students}/${idset}`, options)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.err.code === 0) {
            setDisplayData(result);
            setRefresh(!refresh);
            setvisibletwo(false)
            successalert('Success',"Student updated Successfully");
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

  console.log(displayData);
  console.log(marksdata);

  return (
    <div className="data-container">
      <div className="data-container-top">
        <input
          type="search"
          value={searchData}
          onChange={(e) => setSearchData(e.target.value)}
          placeholder={"Search Student By " + searchBy}
        />

        <select onChange={handleSearch}>
          <option value="Roll Number">Roll Number</option>
          <option value="Name">Name</option>
          <option value="Batch">Batch</option>
          <option value="Section">Section</option>
          <option value="Department">Department</option>
          <option value="Email">Email</option>
          <option value="Phone">Phone</option>
        </select>
        <button
          className="add-data-btn"
          onClick={() => {
            setAddStudent(true);
            setvisible(true);
          }}
        >
          Add Student
        </button>
      </div>
      {!getData ? (
        <div>
          <Progressbar visibility={true} />
        </div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#Roll-No</th>
              <th scope="col">Name</th>
              <th scope="col">Department</th>
              <th scope="col">Section</th>
              <th scope="col">Batch</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th colSpan="3" scope="col">
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
                  <td data-label="#Roll-No">{student.rollNumber}</td>
                  <td data-label="Name">{student.name}</td>
                  <td data-label="Department">{student.department}</td>
                  <td data-label="Section">{student.section}</td>
                  <td data-label="Batch">{student.batch}</td>
                  <td data-label="Email">{student.email}</td>
                  <td data-label="Phone">{student.phone}</td>
                  <td data-label="Options">
                    <div className="manage-buttons">
                      {admin ? (
                        <>
                        <button
                        className="update-user"
                        title="Edit Student"
                        onClick={() => {
                          setDisplayData(student)
                          setidset(student._id);
                          setEditForm(true);
                          setvisibletwo(true);
                        }}
                      >
                        <FaEdit size="1.5rem" />
                      </button>
                      <button
                        className="delete-user"
                        title="Assign Marks"
                        onClick={() => {
                          setidset(student._id);
                          setvisiblethree(true);
                        }}
                      >
                        <FaMarker size="1.5rem" />
                      </button>
                      <button
                        className="delete-user"
                        title="Delete Student"
                        onClick={() => deleteStudent(student._id)}
                      >
                        <AiFillDelete size="1.5rem" />
                      </button>
                      </>
                      ) : (
                        <button
                        className="delete-user"
                        title="Assign Marks"
                        onClick={() => {
                          setidset(student._id);
                          setvisiblethree(true);
                        }}
                      >
                        <FaMarker size="1.5rem" />
                      </button>
                      )}
                      
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
      <ReturnModal
        visibilty={visible}
        setvisibility={setvisible}
        setstdtype={setAddStudent}
        submitfunc={submitStudent}
        changefunc={handleChange}
        type={"add"}
        setsettid={setidset}
        data={displayData}
      />
      <ReturnModal
        visibilty={visibletwo}
        setvisibility={setvisibletwo}
        setstdtype={setEditForm}
        submitfunc={onSubmit}
        changefunc={handleChange}
        type={"update"}
        setsettid={setidset}
        data={displayData}
      />
      {admin ? (
        <MarksModal
        visibilty={visiblethree}
        setvisibility={setvisiblethree}
        changefunc={handleChangemarks}
        data={marksdata}
        setsettid={setidset}
        submitfunc={submitmarks}
      />
      ) : (
<Supervisorassignmarks
        visibilty={visiblethree}
        setvisibility={setvisiblethree}
        changefunc={changesupervisormarks}
        data={supervisormarks}
        setsettid={setidset}
        submitfunc={Submitsupervisormarks}
      />
      )}
      
      
    </div>
  );
}
