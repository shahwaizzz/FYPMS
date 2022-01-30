import React, { useState, useEffect } from "react";
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { AiFillCloseCircle } from "react-icons/ai";
import axios from "axios";
import Progressbar from "../../../components/progressbar";
import { eventUrl } from "../../../apis";
import ReturnModal from '../../../components/Modals/dashboardeventmodal'
import Swal from 'sweetalert2'
import {erroralert,successalert} from '../../../components/alert'

export default function Events({admin}) {
  const [getData, setGetData] = useState(false);
  const [editEvent, setEditEvent] = useState(false);
  const [addEvent, setAddEvent] = useState(false);
  const [displayData, setDisplayData] = useState(false);
  const [searchBy, setSearchBy] = useState("Name");
  const [searchValue, setSearchValue] = useState("name");
  const [searchData, setSearchData] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [visible,setvisible] = useState(false);
  const [visibletwo,setvisibletwo] = useState(false);
  const [settid,setsettid] = useState('');

  console.log(settid)

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
        erroralert('Error',err.message);
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
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#00A65A',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        api
        .delete(`/${id}`)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            setRefresh(!refresh);
            Swal.fire(
              'Deleted!',
              'Event Deleted Successfully',
              'success'
            )
          }
        })
        .catch((res) => {
          alert(res);
        });
        
      }
    })
   
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
            setAddEvent(false)
            setvisible(false);
            successalert('Completed','Event has been Created')
          } else if (result.err.code === 11000) {
            erroralert('Error',
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
            setvisibletwo(false)
            successalert('Completed','Event has been Edited')
            
          } else if (result.err.code === 11000) {
            erroralert('Error',
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
          {admin && (
            <button
            className='add-data-btn'
            onClick={() => {
             
              setAddEvent(true)
              setvisible(true)
            }}
          >
            Add New Event
          </button>
          )}
          
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
                {admin && (
                  <th colSpan='2' scope='col'>
                  Options
                </th>
                )}
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
                      {admin && (
                        <td data-label='Options'>
                        <div className='manage-buttons'>
                          <button
                            className='update-user'
                            title='Edit Student'
                            onClick={() => {
                              setsettid(event._id)
                              setEditEvent(true)
                              setvisibletwo(true)
                            }}
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
                      )}
                      
                    </tr>
                  );
                })}
            </tbody>
          </table>
        )}
      </div>
     
      <ReturnModal visibilty={visibletwo} setvisibility={setvisibletwo} seteventtype={setEditEvent} submitfunc={handleEditSubmit} changefunc={handleChange} data={displayData} type="update" setsettid={setsettid}/>
      <ReturnModal visibilty={visible} setvisibility={setvisible} seteventtype={setAddEvent} submitfunc={handleAddSubmit} changefunc={handleChange} data={displayData} type="add" setsettid={setsettid}/>
      
    </>
  );
}
