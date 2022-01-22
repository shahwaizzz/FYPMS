import React from "react";
import "../login/index.css";
import { Link } from "react-router-dom";

export default function ManageProjects() {
  return (
    <div className='testing'>
      <Card />
      <Card />
      <Card />
    </div>
  );
}
const Card = () => {
  return (
    <div className='card-div'>
      <div class='card-container'>
        <h3 className='card-heading'>Weed Detection</h3>
        <h3 className='card-shd'>Batch</h3>
        <h4 className='card-shd-dat'>Fall 2019</h4>
        <h3 className='card-shd'>Group Members</h3>
        <h4 className='card-shd-dat'>18-ARID-37 | Safiullah Maaz</h4>
        <h4 className='card-shd-dat'>18-ARID-37 | Safiullah Maaz</h4>
        <h4 className='card-shd-dat'>18-ARID-37 | Safiullah Maaz</h4>
        <Link to='/supervisor/progress/12' className=' link green btn-center'>
          View Progress
        </Link>
      </div>
    </div>
  );
};
