import React, { useState, useEffect } from "react";
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { AiFillCloseCircle } from "react-icons/ai";
import Progressbar from "../progressbar";
import axios from "axios";
import { eventUrl } from "../../apis";

export default function Events() {
  const [getData, setGetData] = useState(false);
  const [editEvent, setEditEvent] = useState(false);
  const [displayData, setDisplayData] = useState(false);
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
},[refresh]);

function deleteEvent(id){
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

function toggleModel(action,event){
  setDisplayData(event);
  if(action === "update"){
    editEvent ? setEditEvent(false) : setEditEvent(true);
  }
}

function handleChange(e){
  const name = e.target.name;
  var value = e.target.value;
  setDisplayData({ ...displayData, [name]: value });
}

function handleSubmit(){
  
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
          {/* <button className='add-data-btn' onClick={() => setShowModal(true)}>
            Add Student
          </button> */}
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
              {getData.map((event) => {
                const eventDate = new Date();
                const myYear = eventDate.getFullYear();
                let date = new Date(event.date);
                return (
                  <tr key={event._id}>
                    <td data-label="Name">{event.name}</td>
                    <td data-label="Date">
                      {date.getFullYear() +
                        "/" +
                        (date.getMonth() + 1) +
                        "/" +
                        date.getDate()}
                    </td>
                    <td data-label="Venue">{event.venue}</td>
                    <td data-label="Year">{myYear}</td>
                    <td data-label="Semester">{event.semester}</td>
                    <td data-label="Details">{event.details}</td>
                    <td data-label="Options">
                      <div className='manage-buttons'>
                        <button className='update-user' title='Edit Student' onClick={() => toggleModel("update",event)}>
                          <FaEdit size='1.5rem' />
                        </button>
                        <button className='delete-user' title='Delete Student'>
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
      {editEvent && displayData && (
         <div className='popup-container'>
         <div className='popup'>
           <h2>Edit Event</h2>
           <div className='form-modal'>
             <form
               className='data-form'
               onSubmit={handleSubmit}
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
                  <option value="Defense">Defense</option>
                  <option value="Mid Evaluation">Mid Evaluation</option>
                  <option value="Final Evaluation">Final Evaluation</option>
                 </select>
               </div>
               <div>
                 <label>Event Date</label>
                 <input 
                   type="date"
                   name="date" 
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
                  <option value="Fall">Fall</option>
                  <option value="Spring">Spring</option>
                 </select>
               </div>
               <div>
                 <label className="event-details">Details</label>
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
                 onClick={() => toggleModel("update",null)}
               />
             </span>
             <button
               className='close-data'
               onClick={() => toggleModel("update",null)}
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
