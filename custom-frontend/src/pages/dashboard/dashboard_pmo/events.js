import React, { useState, useEffect } from "react";
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import Progressbar from "../../../components/progressbar";
import { eventUrl } from "../../../apis";
import ReturnModal from "../../../components/Modals/dashboardeventmodal";
import Swal from "sweetalert2";
import { erroralert, successalert } from "../../../components/alert";
import styles from "./events.module.css";
import moment from "moment";

export default function Events({ admin }) {
  const [getData, setGetData] = useState(false);
  const [editEvent, setEditEvent] = useState(false);
  const [addEvent, setAddEvent] = useState(false);
  const [displayData, setDisplayData] = useState(false);
  const [searchBy, setSearchBy] = useState("Name");
  const [searchValue, setSearchValue] = useState("name");
  const [searchData, setSearchData] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [visible, setvisible] = useState(false);
  const [visibletwo, setvisibletwo] = useState(false);
  const [settid, setsettid] = useState("");
  const [date, setdate] = useState(new Date());
  const [countdown, setcountdown] = useState();
  const token = localStorage.getItem("pmotoken");
  const api = axios.create({
    baseURL: eventUrl,
  });

  useEffect(() => {
    api
      .get("/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setGetData(res.data.events);
      })
      .catch((err) => {
        erroralert("Error", err.message);
      });
  }, [refresh]);

  function handleSearch(e) {
    var getValue = e.target.value;
    if (getValue === "Name") {
      setSearchValue("name");
    } else if (getValue === "Date") {
      setSearchValue("date");
    } else if (getValue === "Venue") {
      setSearchValue("venue");
    } else if (getValue === "Year") {
      setSearchValue("year");
    } else if (getValue === "Semester") {
      setSearchValue("semester");
    } else if (getValue === "Details") {
      setSearchValue("details");
    }
    setSearchBy(getValue);
  }
  function deleteEvent(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#00A65A",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        api
          .delete(`/${id}`)
          .then((res) => {
            if (res.status === 200) {
              setRefresh(!refresh);
              Swal.fire("Deleted!", "Event Deleted Successfully", "success");
            }
          })
          .catch((res) => {
            erroralert("Error", res.message);
          });
      }
    });
  }

  function toggleModel(action, event) {
    let date = new Date(event.date);
    setDisplayData({
      ...event,
      convertDate:
        date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate(),
    });
    if (action === "update") {
      editEvent ? setEditEvent(false) : setEditEvent(true);
    }
    if (action === "add") {
      addEvent ? setAddEvent(false) : setAddEvent(true);
    }
  }

  function handleChange(e) {
    const name = e.target.name;
    var value = e.target.value;
    setDisplayData({ ...displayData, [name]: value });
  }
  function handleAddSubmit(e) {
    e.preventDefault();
    const options = {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(displayData),
    };
    fetch(`${eventUrl}`, options)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.err.code === 0) {
            setRefresh(!refresh);
            setAddEvent(false);
            setvisible(false);
            successalert("Completed", "Event has been Created");
            setdate(new Date());
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
          erroralert("Error", error.message);
        }
      );
  }
  function handleEditSubmit(e) {
    e.preventDefault();
    const options = {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(displayData),
    };
    fetch(`${eventUrl}/${settid}`, options)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.err.code === 0) {
            setRefresh(!refresh);
            setvisibletwo(false);
            successalert("Completed", "Event has been Edited");
            setdate(new Date());
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
          erroralert("Error", error.message);
        }
      );
  }

  return (
    <>
      <div className='data-container'>
        {!getData ? (
          <div>
            <Progressbar visibility={true} />
          </div>
        ) : (
          <>
            <div
              style={{
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <h1>Events</h1>
              {admin && (
                <button
                  style={{ margin: "10px auto" }}
                  className='add-data-btn'
                  onClick={() => {
                    setAddEvent(true);
                    setvisible(true);
                  }}
                >
                  Add New Event
                </button>
              )}
            </div>
            {getData &&
              getData
                ?.map((e, i) => {
                  const eventdate = new Date(e.date);
                  const ms = date?.getTime() - eventdate.getTime();
                  const days = ms / (1000 * 60 * 60 * 24);

                  if (Math.ceil(days) > 0 && Math.ceil(days) < 30) {
                    return (
                      <div className={styles.flexdiv}>
                        <div className={styles.flexunderdiv}>
                          <div className={styles.infodivbox}>
                            <h2 className={styles.black}>Event Name :</h2>
                            <h2 className={styles.green}>{e.name}</h2>
                          </div>
                          <div className={styles.infodivbox}>
                            <h2 className={styles.black}>Date:</h2>

                            <h2 className={styles.green}>
                              {eventdate.getFullYear() +
                                "/" +
                                (eventdate.getMonth() + 1) +
                                "/" +
                                eventdate.getDate()}
                            </h2>
                          </div>
                          <div className={styles.infodivbox}>
                            <h2 className={styles.black}>Venue :</h2>
                            <h2 className={styles.green}>{e.venue}</h2>
                          </div>
                          <div className={styles.infodivbox}>
                            <h2 className={styles.black}>Year :</h2>
                            <h2 className={styles.green}>{e.year}</h2>
                          </div>
                          <div className={styles.infodivbox}>
                            <h2 className={styles.black}>Semester :</h2>
                            <h2 className={styles.green}>{e.semester}</h2>
                          </div>

                          <div className={styles.infodivbox}>
                            <h2 className={styles.black}>Details :</h2>
                            <h2 className={styles.green}>{e.details}</h2>
                          </div>
                          <div className={styles.infodivbox}>
                            {admin && (
                              <>
                                <FaEdit
                                  size='1.5rem'
                                  color='green'
                                  onClick={() => {
                                    setsettid(e._id);
                                    setEditEvent(true);
                                    setvisibletwo(true);
                                  }}
                                />

                                <AiFillDelete
                                  size='1.5rem'
                                  color='red'
                                  onClick={() => deleteEvent(e._id)}
                                />
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  } else {
                    return (
                      <div className={styles.eventdiv}>
                        <div className={styles.countdowndiv}>
                          <h1>{Math.abs(Math.ceil(days))}</h1>
                          <h3>days left</h3>
                          <h2>Current Event</h2>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              width: "100%",
                              justifyContent: "space-around",
                              marginTop: "25px",
                            }}
                          >
                            {admin && (
                              <>
                                <button
                                  title='Edit Student'
                                  onClick={() => {
                                    setsettid(e._id);
                                    setEditEvent(true);
                                    setvisibletwo(true);
                                  }}
                                >
                                  Update
                                </button>
                                <button onClick={() => deleteEvent(e._id)}>
                                  Delete
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                        <div>
                          <div className={styles.infodivbox}>
                            <h2 className={styles.black}>Event Name :</h2>
                            <h2 className={styles.green}>{e.name}</h2>
                          </div>
                          <div className={styles.infodivbox}>
                            <h2 className={styles.black}>Date:</h2>
                            <h2 className={styles.green}>
                              {eventdate.getFullYear() +
                                "/" +
                                (eventdate.getMonth() + 1) +
                                "/" +
                                eventdate.getDate()}
                            </h2>
                          </div>
                          <div className={styles.infodivbox}>
                            <h2 className={styles.black}>Venue :</h2>
                            <h2 className={styles.green}>{e.venue}</h2>
                          </div>
                          <div className={styles.infodivbox}>
                            <h2 className={styles.black}>Year :</h2>
                            <h2 className={styles.green}>{e.year}</h2>
                          </div>
                          <div className={styles.infodivbox}>
                            <h2 className={styles.black}>Semester :</h2>
                            <h2 className={styles.green}>{e.semester}</h2>
                          </div>

                          <div className={styles.infodivbox}>
                            <h2 className={styles.black}>Description :</h2>
                            <h2 className={styles.green}>{e.details}</h2>
                          </div>
                        </div>
                      </div>
                    );
                  }
                })
                .reverse()}
          </>
        )}
      </div>

      <ReturnModal
        visibilty={visibletwo}
        setvisibility={setvisibletwo}
        seteventtype={setEditEvent}
        submitfunc={handleEditSubmit}
        changefunc={handleChange}
        data={displayData}
        type='update'
        setsettid={setsettid}
      />
      <ReturnModal
        visibilty={visible}
        setvisibility={setvisible}
        seteventtype={setAddEvent}
        submitfunc={handleAddSubmit}
        changefunc={handleChange}
        data={displayData}
        type='add'
        setsettid={setsettid}
      />
    </>
  );
}

// <table className='table'>
//   <thead>
//     <tr>
//       <th scope='col'>Name</th>
//       <th scope='col'>Date</th>
//       <th scope='col'>Venue</th>
//       <th scope='col'>Year</th>
//       <th scope='col'>Semester</th>
//       <th scope='col'>Details</th>
//       {admin && (
//         <th colSpan='2' scope='col'>
//         Options
//       </th>
//       )}
//     </tr>
//   </thead>
//   <tbody>
//     {/* Call event data here */}
//     {getData
//       .filter(
//         (event) =>
//           event[searchValue].toString().indexOf(searchData) > -1
//       )
//       .slice(0)
//       .reverse()
//       .map((event) => {
//         let date = new Date(event.date);
//         return (
//           <tr key={event._id}>
//             <td data-label='Name'>{event.name}</td>
//             <td data-label='Date'>
//               {date.getFullYear() +
//                 "/" +
//                 (date.getMonth() + 1) +
//                 "/" +
//                 date.getDate()}
//             </td>
//             <td data-label='Venue'>{event.venue}</td>
//             <td data-label='Year'>{event.year}</td>
//             <td data-label='Semester'>{event.semester}</td>
//             <td data-label='Details'>{event.details}</td>
//             {admin && (
//               <td data-label='Options'>
//               <div className='manage-buttons'>
//                 <button
//                   className='update-user'
//                   title='Edit Student'
//                   onClick={() => {
//                     setsettid(event._id)
//                     setEditEvent(true)
//                     setvisibletwo(true)
//                   }}
//                 >
//                   <FaEdit size='1.5rem' />
//                 </button>
//                 <button
//                   className='delete-user'
//                   title='Delete Student'
//                 >
//                   <AiFillDelete
//                     size='1.5rem'
//                     onClick={() => deleteEvent(event._id)}
//                   />
//                 </button>
//               </div>
//             </td>
//             )}

//           </tr>
//         );
//       })}
//   </tbody>
// </table>
