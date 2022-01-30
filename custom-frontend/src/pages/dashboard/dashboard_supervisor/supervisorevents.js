import React,{useState,useEffect} from 'react';
import axios from 'axios'
import { eventUrl } from '../../../apis';
import Progressbar from '../../../components/progressbar';

export const SupervisorViewEvents = () => {

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

    return(
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
                      
                    </tr>
                  );
                })}
            </tbody>
          </table>
        )}
      </div>
    )
}