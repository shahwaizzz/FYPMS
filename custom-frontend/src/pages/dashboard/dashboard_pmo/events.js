import React, { useState, useEffect } from "react";
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { AiFillCloseCircle } from "react-icons/ai";
import axios from "axios";
import Progressbar from "../../../components/progressbar";
import { eventUrl } from "../../../apis";

export default function Events() {
  const [getData, setGetData] = useState(false);
  const [editEvent, setEditEvent] = useState(false);
  const [addEvent, setAddEvent] = useState(false);
  const [displayData, setDisplayData] = useState(false);
  const [searchBy, setSearchBy] = useState("Name");
  const [searchValue, setSearchValue] = useState("name");
  const [searchData, setSearchData] = useState("");
  const [refresh, setRefresh] = useState(false);

  const api = axios.create({
    baseURL: eventUrl,
  });

  useEffect(() => {
    api
      .get("/")
      .then((res) => {
        setGetData(res.data.events);
      })
      .catch((err) => {
        alert(err);
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
    var check = window.confirm("Are sure you want to delete the event");
    if (check) {
      api
        .delete(`/${id}`)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            setRefresh(!refresh);
            alert("Event Delete Successfully");
          }
        })
        .catch((res) => {
          alert(res);
        });
    }
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
            toggleModel("add", false);
            alert("Event Create Successfully");
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
  function handleEditSubmit(e) {
    e.preventDefault();
    const options = {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(displayData),
    };
    fetch(`${eventUrl}/${displayData._id}`, options)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.err.code === 0) {
            setRefresh(!refresh);
            toggleModel("update", false);
            alert("Event Update Successfully");
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
    <>
      <div className='data-container'>
        <div className='data-container-top'>
          <input
            type='search'
            value={searchData}
            onChange={(e) => setSearchData(e.target.value)}
            placeholder={"Search Student By " + searchBy}
          />

          <select onChange={handleSearch}>
            <option value='Name'>Name</option>
            <option value='Date'>Date</option>
            <option value='Venue'>Venue</option>
            <option value='Year'>Year</option>
            <option value='Semester'>Semester</option>
            <option value='Details'>Details</option>
          </select>
          <button
            className='add-data-btn'
            onClick={() => toggleModel("add", false)}
          >
            Add New Event
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
                <th scope='col'>Name</th>
                <th scope='col'>Date</th>
                <th scope='col'>Venue</th>
                <th scope='col'>Year</th>
                <th scope='col'>Semester</th>
                <th scope='col'>Details</th>
                <th colSpan='2' scope='col'>
                  Options
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Call event data here */}
              {getData
                .filter(
                  (event) =>
                    event[searchValue].toString().indexOf(searchData) > -1
                )
                .slice(0)
                .reverse()
                .map((event) => {
                  let date = new Date(event.date);
                  return (
                    <tr key={event._id}>
                      <td data-label='Name'>{event.name}</td>
                      <td data-label='Date'>
                        {date.getFullYear() +
                          "/" +
                          (date.getMonth() + 1) +
                          "/" +
                          date.getDate()}
                      </td>
                      <td data-label='Venue'>{event.venue}</td>
                      <td data-label='Year'>{event.year}</td>
                      <td data-label='Semester'>{event.semester}</td>
                      <td data-label='Details'>{event.details}</td>
                      <td data-label='Options'>
                        <div className='manage-buttons'>
                          <button
                            className='update-user'
                            title='Edit Student'
                            onClick={() => toggleModel("update", event)}
                          >
                            <FaEdit size='1.5rem' />
                          </button>
                          <button
                            className='delete-user'
                            title='Delete Student'
                          >
                            <AiFillDelete
                              size='1.5rem'
                              onClick={() => deleteEvent(event._id)}
                            />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        )}
      </div>
      {addEvent && (
        <div className='popup-container'>
          <div className='popup'>
            <h2>Create a New Event</h2>
            <div className='form-modal'>
              <form
                className='data-form'
                onSubmit={handleAddSubmit}
                autoComplete='off'
                id='student-form'
              >
                <input type='text' name='_id' value={displayData._id} hidden />
                <div>
                  <label>Event Name</label>
                  <select
                    name='name'
                    value={displayData.name}
                    onChange={handleChange}
                  >
                    <option value='Defense'>Defense</option>
                    <option value='Mid Evaluation'>Mid Evaluation</option>
                    <option value='Final Evaluation'>Final Evaluation</option>
                  </select>
                </div>
                <div>
                  <label>Event Date</label>
                  <input
                    type='date'
                    name='date'
                    value={displayData.date}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label>Venue</label>
                  <input
                    type='text'
                    name='venue'
                    value={displayData.venue}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label>Year</label>
                  <input
                    type='number'
                    name='year'
                    value={displayData.year}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label>Semester</label>
                  <select
                    name='semester'
                    value={displayData.semester}
                    onChange={handleChange}
                  >
                    <option value='Fall'>Fall</option>
                    <option value='Spring'>Spring</option>
                  </select>
                </div>
                <div>
                  <label className='event-details'>Details</label>
                  <textarea
                    type='text'
                    name='details'
                    value={displayData.details}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <button type='submit'>Save Event</button>
                </div>
              </form>
              <span>
                <AiFillCloseCircle
                  size='1.7rem'
                  onClick={() => toggleModel("add", false)}
                />
              </span>
              <button
                className='close-data'
                onClick={() => toggleModel("add", false)}
              >
                Close
              </button>
              <form />
            </div>
          </div>
        </div>
      )}
      {editEvent && displayData && (
        <div className='popup-container'>
          <div className='popup'>
            <h2>Edit Event</h2>
            <div className='form-modal'>
              <form
                className='data-form'
                onSubmit={handleEditSubmit}
                autoComplete='off'
                id='student-form'
              >
                <input type='text' name='_id' value={displayData._id} hidden />
                <div>
                  <label>Event Name</label>
                  <select
                    name='name'
                    value={displayData.name}
                    onChange={handleChange}
                  >
                    <option value='Defense'>Defense</option>
                    <option value='Mid Evaluation'>Mid Evaluation</option>
                    <option value='Final Evaluation'>Final Evaluation</option>
                  </select>
                </div>
                <div>
                  <label>Current Date: {displayData.convertDate}</label>
                </div>
                <div>
                  <label>Event Date</label>
                  <input
                    type='date'
                    name='date'
                    value={displayData.date}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label>Venue</label>
                  <input
                    type='text'
                    name='venue'
                    value={displayData.venue}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label>Year</label>
                  <input
                    type='number'
                    name='year'
                    value={displayData.year}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label>Semester</label>
                  <select
                    name='semester'
                    value={displayData.semester}
                    onChange={handleChange}
                  >
                    <option value='Fall'>Fall</option>
                    <option value='Spring'>Spring</option>
                  </select>
                </div>
                <div>
                  <label className='event-details'>Details</label>
                  <textarea
                    type='text'
                    name='details'
                    value={displayData.details}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <button type='submit'>Edit Event</button>
                </div>
              </form>
              <span>
                <AiFillCloseCircle
                  size='1.7rem'
                  onClick={() => toggleModel("update", false)}
                />
              </span>
              <button
                className='close-data'
                onClick={() => toggleModel("update", false)}
              >
                Close
              </button>
              <form />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
