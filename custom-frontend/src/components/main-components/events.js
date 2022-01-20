// import React, { useEffect, useState } from "react";
// import { eventUrl } from "../../apis";
import axios from "axios";

import React, { useState, useEffect } from "react";
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { AiFillCloseCircle } from "react-icons/ai";
import Progressbar from "../progressbar";

export default function Events() {
  const [showModal, setShowModal] = useState(false);
  const [eventsList, setEventList] = useState([]);
  const [displayData, setDisplayData] = useState(false);
  const api = axios.create({
    baseURL: `/api/v1/pmo/events`,
  });

  useEffect(() => {
    api
      .get("/")
      .then((res) => {
        console.log(res.data);
        setEventList(res.data.events);
      })
      .catch((res) => {
        alert(res);
      });
  }, []);

  function handleChange(e) {
    const name = e.target.name;
    let value = e.target.value;
    setDisplayData({ ...displayData, [name]: value });
  }

  return (
    <>
      <div className='data-container'>
        <div className='data-container-top'>
          <input type='search' placeholder={"Search Student By "} />

          <select>
            <option value='Roll Number'>Roll Number</option>
            <option value='Name'>Name</option>
            <option value='Batch'>Batch</option>
            <option value='Section'>Section</option>
            <option value='Department'>Department</option>
            <option value='Email'>Email</option>
            <option value='Phone'>Phone</option>
          </select>
          <button className='add-data-btn' onClick={() => setShowModal(true)}>
            Add Student
          </button>
        </div>
        {!eventsList ? (
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
              {eventsList.map((event) => {
                const eventDate = new Date(event.year);
                const myYear = eventDate.getFullYear();
                return (
                  <tr key={event._id}>
                    <td scope='col'>{event.name}</td>
                    <td scope='col'>{`${event.date.day}-${event.date.month}-${event.date.year}`}</td>
                    <td scope='col'>{event.venue}</td>
                    <td scope='col'>{myYear}</td>
                    <td scope='col'>{event.semester}</td>
                    <td scope='col'>{event.details}</td>
                    <td>
                      <div className='manage-buttons'>
                        <button className='update-user' title='Edit Student'>
                          <FaEdit size='1.5rem' />
                        </button>
                        <button className='delete-user' title='Delete Student'>
                          <AiFillDelete size='1.5rem' />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        {showModal && (
          <div className='popup-container'>
            <div className='popup'>
              <h2>New Event</h2>
              <div className='form-modal'>
                <form
                  className='data-form'
                  autoComplete='off'
                  id='student-form'
                >
                  <div>
                    <label>Name</label>
                    <input type='text' name='name' onChange={handleChange} />
                  </div>
                  <div>
                    <label>Venue</label>
                    <input type='text' name='venue' onChange={handleChange} />
                  </div>
                  <div>
                    <label>Date</label>
                    <input
                      type='date'
                      name='eventDate'
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label>Details</label>
                    <input
                      type='textarea'
                      name='eventDetails'
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label>Year</label>
                    <input
                      type='text'
                      name='eventYear'
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label>Semester</label>
                    <input
                      type='email'
                      name='eventSemester'
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <button type='submit'>Create Event</button>
                  </div>
                </form>
                <span>
                  <AiFillCloseCircle
                    size='1.7rem'
                    onClick={() => setShowModal(false)}
                  />
                </span>
                <button className='close-data'>Close</button>
                <form />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
