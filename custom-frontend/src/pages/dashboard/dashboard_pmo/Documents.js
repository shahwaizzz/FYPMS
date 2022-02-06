import React, { useState, useEffect } from "react";
import "../../login.css";
import { AiFillDelete } from "react-icons/ai";
import { HiDownload } from "react-icons/hi";
import axios from "axios";
import {
  pmouploadtemplatetwo,
  findtemplates,
  downloadImage,
} from "../../../apis";
import { erroralert, successalert } from "../../../components/alert";
const Document = () => {
  const [file, setFile] = useState("");
  const [refresh, setrefresh] = useState(false);
  const [templates, settemplates] = useState([]);
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
    console.log(formData);
    try {
      const response = axios.post(pmouploadtemplatetwo, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // const { fileName, filePath } = response.data;
      console.log(response);
      // setUploadedFiles({ fileName, filePath });
      successalert("Success", "File uploaded successfully");
      setrefresh(!refresh);
    } catch (error) {
      erroralert("Error", error.message);
    }
  };

  useEffect(() => {
    const gettemplates = async () => {
      try {
        const response = await axios.get(findtemplates);
        console.log(response.data.data);
        settemplates(response.data.data);
      } catch (err) {
        erroralert("Error", err.message);
      }
    };
    gettemplates();
  }, [refresh]);

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
          </form>
          <ul className='lists'>
            {templates &&
              templates?.map((e, i) => {
                // const pdfname = e.templateurl.slice(-3)
                // if(pdfname === 'pdf'){
                //   const downloadimage = async () => {
                //     const image = await fetch(e.templateurl)
                //     const blob = await image.blob()
                //     const IMG_URL = URL.createObjectURL(blob)
                //     console.log(IMG_URL)
                //   }

                //   downloadimage()
                // }

                return (
                  // onClick={() => downloadImage(e.templateurl)}
                  <li key={i}>
                    <h3>
                      {e.templateurl.slice(30)}
                      <button className='btnn'>
                        <AiFillDelete className='iconic' />
                      </button>{" "}
                      <a href={e.templateurl} download={e.templateurl}>
                        <button className='btnn'>
                          <HiDownload className='iconic' />
                        </button>
                      </a>
                    </h3>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Document;
