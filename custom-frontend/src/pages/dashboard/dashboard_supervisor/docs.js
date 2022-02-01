import React, { useState,useEffect } from "react";
import "../../login.css";
import { AiFillDelete } from "react-icons/ai";
import { HiDownload } from "react-icons/hi";
import axios from "axios";
import {pmouploadtemplatetwo,findtemplates} from '../../../apis'
import { erroralert,successalert } from "../../../components/alert";


export const Showdocments = () => {

    const [refresh,setrefresh] = useState(false)
  const [templates,settemplates] = useState([])

    useEffect(() => {
        const gettemplates = async () => {
          try{
           const response = await axios.get(findtemplates)
           console.log(response.data.data)
           settemplates(response.data.data)
          }catch(err){
   
           erroralert('Error', err.message);
          }
        }
        gettemplates();
     },[refresh])

     return (
        <div className='maindiv1'>
          <div className='margin-top'>
            <div className='form-container1'>
            <h3 style={{fontSize:'25px',fontWeight:'bold',textAlign:'center'}}>Global Template</h3>
              
              <div style={{display:'flex',alignItems: 'center',justifyContent: 'center'}}>
              <ul className='lists'>
                  {templates && templates?.map((e,i) => {
    
                //   const pdfname = e.templateurl.slice(-3)
                //   if(pdfname === 'pdf'){
                //     const downloadimage = async () => {
                //       const image = await fetch(e.templateurl)
                //       const blob = await image.blob()
                //       const IMG_URL = URL.createObjectURL(blob)
                //       console.log(IMG_URL)  
                //     }
                    
                //     downloadimage()
                //   }
    
                    return(
    
                    
                    <li>
                    <h3>
                      {e.templateurl.slice(30)}
                      <a href={e.templateurl} download={e.templateurl}>
                  <button className='btnn'>
                    <HiDownload className='iconic' />
                  </button>
                  </a>
                    </h3>
                  </li>
                    )
                  })}
                  
                </ul>
                </div>
            </div>
          </div>
        </div>
      );

}