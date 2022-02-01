import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  supervisorcreatemeetingapi,
  supervisorgetmeetingapi,
  supervisorupdatemeetingapi,
  updatemeetingdocs,
  projectUrl,
  getstdmeetings,
  supervisoraddmeetingnotes,
  addmeetingdocs
} from "../../../apis";
import Progressbar from "../../../components/progressbar";
import styles from "./meetings.module.css";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import ReturnModal from "../../../components/Modals/dashboardmeetingsmodal";
import {
  Meetingupdatemodal,
  Meetingnotesmodal,
} from "../../../components/Modals/dashboardupdatemeetingmodal";
import { erroralert, successalert } from "../../../components/alert";

const Meetings = ({ supervisor }) => {
  const user = localStorage.getItem("supervisor");
  const std = localStorage.getItem("student")

  const [data, setdata] = useState([]);
  const [timeOfMeeting, settimeOfMeeting] = useState(new Date());
  const [notes, setnotes] = useState([]);
  const [projects, setprojects] = useState([]);
  const [notval, setnoteval] = useState("");
  const [refresh, setrefresh] = useState(false);
  const [loading, setloading] = useState(false);
  const [id, setid] = useState("");
  const [projectid, setprojectid] = useState("");
  const [datasend, setdatasend] = useState({
    topic: "",
    timeOfMeeting: new Date(),
    supervisor: user ? JSON.parse(user).userId : null,
    project: "",
  });
  const [visible, setvisible] = useState(false);
  const [visibletwo, setvisibletwo] = useState(false);
  const [visiblethree, setvisiblethree] = useState(false);
  const [file, setFile] = useState("");
  const [templates, settemplates] = useState([]);
  const [fileName, setFileName] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState({});

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  console.log(file);
  console.log(fileName);
  const handlefileSubmit = async (e,id) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    console.log(formData);
    try {
      const response = axios.patch(
        addmeetingdocs(id,JSON.parse(std).rollno),
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
      setrefresh(!refresh);
    } catch (error) {
      erroralert("Error", error.message);
    }
  };

  console.log(projectid);

  const notesfunc = (e) => {
    e.preventDefault();
    setnotes([...notes, notval]);
    setnoteval("");
    setdatasend({ ...datasend, meetingNotes: [...notes] });
  };

  const changenoteval = (e) => {
    setnoteval(e.target.value);
  };

  const handlechange = (e) => {
    const name = e.target.name;
    var value = e.target.value;
    setdatasend({ ...datasend, [name]: value });
  };

  useEffect(() => {
    if (user) {
      const getmeetings = async () => {
        setloading(true);
        try {
          const response = await axios.get(
            supervisorgetmeetingapi(JSON.parse(user).userId)
          );
          console.log(response.data.meetings);
          setdata(response.data.meetings);
          setloading(false);
        } catch (err) {
          erroralert("Error", err.message);
        }
      };
      getmeetings();

      return getmeetings;
    } else {
      const getmeetings = async () => {
        setloading(true);
        try {
          const response = await axios.get(getstdmeetings);
          console.log(response.data.meetings);
          setdata(response.data.meetings);
          setloading(false);
        } catch (err) {
          erroralert("Error", err.message);
        }
      };
      getmeetings();

      return getmeetings;
    }
  }, [refresh]);

  useEffect(() => {
    axios
      .get(projectUrl)
      .then((res) => {
        console.log(res.data.projects);
        setprojects(res.data.projects);
      })
      .catch((err) => {
        erroralert("Error", err.message);
      });
  }, []);

  const updatemeeting = async (e) => {
    e.preventDefault();

    // console.log(new Date(timeOfMeeting))

    const options = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      data: {
        timeOfMeeting: new Date(timeOfMeeting),
      },
      url: supervisorupdatemeetingapi(id),
    };
    try {
      const response = await axios(options);

      if (response.data) {
        setvisibletwo(false);
        successalert("Success", "Meeting has been postponed");
      }
    } catch (error) {
      erroralert("Error", error.message);
    }
  };

  const addmeetingnotes = async (e) => {
    e.preventDefault();

    console.log(notes);

    const obj = {
      meetingNotes: notes,
      id: id,
    };

    console.log(obj);

    const options = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      data: obj,
      url: supervisoraddmeetingnotes,
    };
    try {
      const response = await axios(options);

      if (response.data) {
        setrefresh(!refresh);
        setvisiblethree(false);
        successalert("Success", "Meeting notes has been added");
      }
    } catch (error) {
      erroralert("Error", error.message);
    }
  };

  const createMeeting = async (e) => {
    e.preventDefault();
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: datasend,
      url: supervisorcreatemeetingapi,
    };

    try {
      const response = await axios(options);
      setvisible(false);
      successalert("Success", "meeting has been scheduled");
    } catch (err) {
      erroralert("Error", err.message);
    }

    setrefresh(!refresh);
  };

  const datechange = (e) => {
    settimeOfMeeting(e.target.value);
  };

  return (
    <>
      <div className="data-container-top">
        {/* <input
          type="search"
            value={searchData}
            onChange={(e) => setSearchData(e.target.value)}
            placeholder={"Search Student By " + searchBy}
        />
        onChange={handleSearch}
        <select>
          <option value="Name">Topic Name</option>
          <option value="Date">Time</option>
          <option value="Venue">Supervisor</option>
          <option value="Year">Project</option>
          <option value="Semester">Semester</option>
          <option value="Details">Details</option>
        </select> */}
        {supervisor && (
          <div style={{ margin: "10px auto" }}>
            <button
              className="add-data-btn"
              onClick={() => {
                setvisible(true);
              }}
            >
              Schedule Meeting
            </button>
          </div>
        )}
      </div>

      {loading && (
        <div>
          <Progressbar visibility={true} />
        </div>
      )}
      {!loading && (
        <div style={{ width: "90%", padding: "10px", margin: "auto" }}>
          <h1>Meetings</h1>
        </div>
      )}

      {!loading &&
        data &&
        data?.map((e, i) => {
          const date = new Date(e.timeOfMeeting);

          return (
            <div className={styles.meetingsdiv}>
              <div>
                <h1>Topic Name</h1>
                <h2>{e.topic}</h2>
              </div>
              <div>
                <h1>Time of Meeting</h1>
                <h2>
                  {date.getFullYear() +
                    "/" +
                    (date.getMonth() + 1) +
                    "/" +
                    date.getDate()}
                </h2>
              </div>
              <div>
                <h1>Meeting Docs</h1>
                {e.document?.map((e,i) => {
                  return(
                    <a key={i} href={e.doctype} download={'filename'} style={{color:'green',textDecoration: 'none'}}>{e.doctype}</a>
                  )
                })}
              </div>
              <div>
                <h1>Meeting Notes</h1>
                <ul>
                  {e.meetingNotes?.map((e, i) => {
                    return <li>{e}</li>;
                  })}
                </ul>
              </div>
              <div>
                <h1>Supervisor</h1>
                <h2>{e.supervisor}</h2>
              </div>
              <div>
                <h1>Project</h1>
                <h2>{e.project}</h2>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                  width: "100%",
                  padding: "10px",
                }}
              >
                {supervisor && (
                  <>
                    <button
                      onClick={() => {
                        setid(e._id);
                        setvisibletwo(true);
                      }}
                    >
                      Postpone Meeting
                    </button>
                    <button
                      onClick={() => {
                        setid(e._id);
                        setvisiblethree(true);
                      }}
                    >
                      Add Meeting Notes
                    </button>
                  </>
                )}
                {std && (
                  <form class="register-form" onSubmit={(eve) => handlefileSubmit(eve,e._id)}>
                  <input
                    id="email1"
                    class="form-field widt input1"
                    type="file"
                    placeholder="file"
                    name="file"
                    onChange={onChange}
                  />

                  <button
                    className="form-field button1 docu green"
                    type="submit"
                    name="upload"
                  >
                    Upload
                  </button>
                </form>
                )}
              </div>
            </div>
          );
        })}

      <ReturnModal
        visibilty={visible}
        setvisibility={setvisible}
        changefunc={handlechange}
        submitfunc={createMeeting}
        type="add"
        setsettid={setid}
        projects={projects}
        data={datasend}
        noteaddfunc={notesfunc}
        noteval={notval}
        projectid={projectid}
        setprojectid={setprojectid}
        notes={notes}
        changenotval={changenoteval}
        id={user ? JSON.parse(user).userId : null}
      />
      <Meetingupdatemodal
        visibilty={visibletwo}
        setvisibility={setvisibletwo}
        setsettid={setid}
        changefunc={datechange}
        submitfunc={updatemeeting}
        // val={timeOfMeeting}
      />
      <Meetingnotesmodal
        visibilty={visiblethree}
        setvisibility={setvisiblethree}
        setsettid={setid}
        noteaddfunc={notesfunc}
        noteval={notval}
        notes={notes}
        changenotval={changenoteval}
        submitfunc={addmeetingnotes}
      />
    </>
  );
};

export default Meetings;
