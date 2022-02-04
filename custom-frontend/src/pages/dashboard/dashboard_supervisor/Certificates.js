import React,{useState, useEffect}  from 'react';
import { Button } from 'react-bootstrap';
import  '../../../index.css';
import axios from 'axios';
import { projectUrl } from '../../../apis';
const projects = axios.create({
    baseURL:projectUrl
})
const Certificates = () =>{
    const [certificateType,setCertificateType]=useState('');
    const [supervisorData,setSupervisorData]= useState(false);
    const [refresh,setRefresh] = useState();
    const token = localStorage.getItem("token");
    const  supervisor =JSON.parse(localStorage.getItem("supervisor"));
    console.log(supervisor)
    const {name,userId}=supervisor;
    console.log('user id', userId);
    useEffect(()=>{

        projects
        .get("/")
        .then((res)=>{
            console.log(res.data);
            setSupervisorData(res.data.projects);
        })
        .catch((err)=>{
            alert(err);
        })
    },[refresh])

    return(
        <>
            <div>
                <div className='btn-div'>
                    <Button onClick={()=>setCertificateType('defence')} className='btns'>Defence Certificate</Button>
                    <Button onClick={()=>setCertificateType('mid')} className='btns'>Mid Evaluation Certificate</Button>
                    <Button onClick={()=>setCertificateType('final')} className='btns'>Final Evaluation Certificate</Button>
                </div>
                <div>
                    
                    <table className='table'>
                        <thead>
                            <tr>
                                <th scope='col'>Sr No</th>
                                <th scope='col'>Project Title</th>
                                <th scope='col'>Batch</th>
                                <th scope='col'>Session</th>
                                <th scope='col'>Comments</th>
                            </tr>
                        </thead>
                        <tbody>
                        {supervisorData&&
                            supervisorData.filter((currentS)=>{
                                return currentS.supervisor === "61e7b4b7814131655d342c72";
                            }).map((project,i)=>{
                                {/* {console.log(project._id)} */}
                                return(
                                    <tr key={i}>
                                    <td>{i+1}</td>
                                    <td>{project.title}</td>
                                    <td>{project.batch}</td>
                                    <td>{project.group.map((student)=>(" "+ student+ "  "))}</td>
                                    <td><button>Assign Comments</button></td>
                                </tr>
                                )
                            })
                        }
                            
                            {/* <tr>
                                <td>2</td>
                                <td>Weed Detection</td>
                                <td>Fall</td>
                                <td>2018</td>
                                <td><button>Assign Comments</button></td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>Doctor Pok</td>
                                <td>Fall</td>
                                <td>2018</td>
                                <td><button>Assign Comments</button></td>
                            </tr> */}
                            </tbody>
                    </table>
                    {/* certificateType === 'mid'? */}
                    {certificateType ==='defence'?
                    <table>
                        <tr>
                            <th>Sr No</th>
                            <th>Project Title</th>
                            <th>Batch</th>
                            <th>Session</th>
                            <th>type</th>
                            <th>Comments</th>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>Project Approval System</td>
                            <td>Fall</td>
                            <td>2018</td>
                            <td>mid</td>
                            <td><button>Assign Comments</button></td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Weed Detection</td>
                            <td>Fall</td>
                            <td>2018</td>
                            <td>mid</td>
                            <td><button>Assign Comments</button></td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Doctor Pok</td>
                            <td>Fall</td>
                            <td>2018</td>
                            <td>mid</td>
                            <td><button>Assign Comments</button></td>
                        </tr>
                    </table>:certificateType === "final"?
                    <table>
                        <tr>
                            <th>Sr No</th>
                            <th>Project Title</th>
                            <th>Batch</th>
                            <th>Session</th>
                            <th>Comments</th>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>Project Approval System</td>
                            <td>Fall</td>
                            <td>2018</td>
                            <td><button>Assign Comments</button></td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Weed Detection</td>
                            <td>Fall</td>
                            <td>2018</td>
                            <td><button>Assign Comments</button></td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Doctor Pok</td>
                            <td>Fall</td>
                            <td>2018</td>
                            <td><button>Assign Comments</button></td>
                        </tr>
                    </table>:''
                    }
                    
                </div>
            </div>
        </>
    )
}
export default Certificates;