import React, { useState } from "react";
import "../../login.css";
import { AiFillDelete } from "react-icons/ai";
import { HiDownload } from "react-icons/hi";
import axios from "axios";
import {pmouploadtemplate} from '../../../apis'
const Document = () => {
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState({});
  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = axios.post(pmouploadtemplate, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const { fileName, filePath } = response.data;
      setUploadedFiles({ fileName, filePath });
    } catch (error) {
      console.log(error.response);
    }
  };
  return (
    <div className='maindiv1'>
      <div className='margin-top'>
        <div class='form-container1'>
          <h3 className='padd12'>Upload Template</h3>
          <form class='register-form' onSubmit={handleSubmit}>
            {/* Uncomment the next line to show the success message */}
            {/* <div class="success-message">Success! Thank you for registering</div> */}

            <input
              id='email1'
              class='form-field widt input1'
              type='file'
              placeholder='file'
              name='file'
              onChange={onChange}
            />
            {/* Uncomment the next line to show the error message */}
            {/* <span id="email-error">Please enter an email address</span> */}

            <button
              className='form-field button1 docu green'
              type='submit'
              name='upload'
            >
              Upload
            </button>
            <ul className='lists'>
              <li>
                <h3>
                  Supervisor midterm Certifcate{" "}
                  <button className='btnn'>
                    <AiFillDelete className='iconic' />
                  </button>{" "}
                  <button className='btnn'>
                    <HiDownload className='iconic' />
                  </button>
                </h3>
              </li>
            </ul>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Document;
