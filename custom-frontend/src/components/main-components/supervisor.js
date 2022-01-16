import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { supervisorsUrl } from "../../apis";
import axios from "axios";

const api = axios.create({
  baseURL: `http://localhost:3000/api/v1/pmo/supervisors`,
});
export default function Supervisor() {
  const [supervisors, setSupervisors] = useState([]);
  const [addsupervisor, setAddsupervisor] = useState(false);
  //dfdfd jjjjjjjjjjjj
  const [editForm, setEditForm] = useState(false);
  const [searchData, setSearchData] = useState("");
  const [searchBy, setSearchBy] = useState("Roll Number");
  const [getData, setGetData] = useState(false);
  const [displayData, setDisplayData] = useState(false);
  const [refresh, setRefresh] = useState(false);
  //sdddddddddddddddddddddddddddd

  const deleteSupervisor = async (id) => {
    const response = await api.delete(`/${id}`);
    const newSupervisor = supervisors.filter(
      (supervisor) => supervisor._id !== id
    );
    setSupervisors(newSupervisor);
    console.log("Supervisor delete", response);
  };
  useEffect(() => {
    api
      .get("/")
      .then((response) => {
        setSupervisors(response.data.supervisor);
      })
      .catch((error) => console.log(error));
  }, [supervisors]);

  return (
    <div className='data-container'>
      <div className='data-container-top'>
        <input
          type='search'
          value={searchData}
          onChange={(e) => setSearchData(e.target.value)}
          placeholder={"Search supervisor By " + searchBy}
        />
        <select onChange={(e) => setSearchBy(e.target.value)}>
          <option value='Roll Number'>Roll Number</option>
          <option value='Name'>Name</option>
          <option value='Batch'>Batch</option>
          <option value='Section'>Section</option>
          <option value='Department'>Department</option>
          <option value='Email'>Email</option>
          <option value='Phone'>Phone</option>
        </select>
        <button
          className='add-data-btn'
          onClick={() => {
            console.log("hellow"); /*toggleModel("add")*/
          }}
        >
          Add supervisor
        </button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {supervisors.map((supervisor) => {
            const { _id: id, name, email, department } = supervisor;
            return (
              <tr key={id}>
                <td>{id}</td>
                <td>{name}</td>
                <td>{email}</td>
                <td>{department}</td>
                <td>
                  <div className='manage-buttons'>
                    <button className='update-user' title='Edit Supervisor'>
                      <FaEdit size='1.5rem' />
                    </button>
                    <button
                      className='delete-user'
                      title='Delete Supervisor'
                      onClick={() => deleteSupervisor(id)}
                    >
                      <AiFillDelete size='1.5rem' />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
