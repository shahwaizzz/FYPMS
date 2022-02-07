import React, {useState, useEffect} from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import  '../../../index.css';
import Defencecertificatemodal from "../../../components/Modals/defencecertificatemodal";
import Midcertificatemodal from "../../../components/Modals/midcertificatemodal";
import Finalcertificatemodal from "../../../components/Modals/finalcertificatemodal";
import { defencecertificate, midcertificate, finalcertificate } from '../../../apis';
import { successalert,erroralert } from "../../../components/alert";

const projects = axios.create({
    baseURL:"projectUrl"
})

const DownloadPerform = () => {
  const [userId,setUserID] = useState('');
    const [certificateType,setCertificateType]=useState('defence');
    const [supervisorData,setSupervisorData]= useState(false);
    const [refresh,setRefresh] = useState();
    const [displayData, setDisplayData] = useState(false);
    const [visible, setvisible] = useState(false);
    const [visibletwo, setvisibletwo] = useState(false);
    const [visiblethree, setvisiblethree] = useState(false);
    const [idset, setidset] = useState();
    const [addCertificate, setAddCertificate] = useState(false);
    const [editForm, setEditForm] = useState(false);
    const [projectName, setProjectName]= useState(false);
    const [getCertificate, setGetCertificate] = useState(false);
    const token = localStorage.getItem("token");

    useEffect(()=>{
      projects
      .get("/")
      .then((res)=>{
          // console.log(res.data);
          setSupervisorData(res.data.projects);
      })
      .catch((err)=>{
          alert(err);
      })
  },[refresh])

  return (<div>
      <div className='btn-div'>
            <Button onClick={()=>setCertificateType('defence')} className='btns'>Defence Certificate</Button>
            <Button onClick={()=>setCertificateType('mid')} className='btns'>Mid Evaluation Certificate</Button>
            <Button onClick={()=>setCertificateType('final')} className='btns'>Final Evaluation Certificate</Button>
      </div>
      <div>
                    {certificateType ==='defence'?
                    (<><table className='table'>
                        <thead>
                            <tr>
                                <th scope='col'>Sr No</th>
                                <th scope='col'>Project Title</th>
                                <th scope='col'>Batch</th>
                                <th scope='col'>Session</th>
                                <th scope='col'>Type</th>
                                <th scope='col'>Group Members</th>
                                <th scope='col'>Comments</th>
                            </tr>
                        </thead>
                        <tbody>
                        
                        {
                            supervisorData&&
                            supervisorData.filter((currentS)=>{
                                return currentS.supervisor === userId;
                            }).map((project,i)=>{
                                {/* {console.log(project._id)} */}
                                return(
                                    <tr key={project._id}>
                                    <td>{i+1}</td>
                                    <td>{project.title}</td>
                                    <td>{project.batch}</td>
                                    <td>Fall</td>
                                    <td>Defence certificate</td>
                                    <td>
                                    {project&&project.group.map((student)=>(" "+ student+ "  "))}</td>
                                    <td>{project&&project.defence === 1?(<b>Assigned</b>) : (<button
                                            onClick={
                                                ()=>{
                                                    setDisplayData({...project, project: project._id});
                                                    setidset(project._id);
                                                    setEditForm(true);
                                                    setvisible(true);
                                                    setProjectName(project.title);                         
                                                }
                                            }
                                        >Assign Certificate</button>)}
                                    </td>
                                </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                    </>
                    )
                    :certificateType ==='mid'?
                    (<><table className='table'>
                        <thead>
                            <tr>
                                <th scope='col'>Sr No</th>
                                <th scope='col'>Project Title</th>
                                <th scope='col'>Batch</th>
                                <th scope='col'>Session</th>
                                <th scope='col'>type</th>
                                <th scope='col'>Group Members</th>
                                <th scope='col'>Comments</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            supervisorData&&
                            supervisorData.filter((currentS)=>{
                                return currentS.supervisor === userId;
                            }).map((project,i)=>{
                                {/* {console.log(project._id)} */}
                                return(
                                    <tr key={project._id}>
                                    <td>{i+1}</td>
                                    <td>{project.title}</td>
                                    <td>{project.batch}</td>
                                    <td>Fall</td>
                                    <td>Mid</td>
                                    <td>{project.group.map((student)=>(" "+ student+ "  "))}</td>
                                    
                                    <td>{project&&project.mid === 1?(<b>Assigned</b>) : ( <button
                                            onClick={
                                                ()=>{
                                                    setvisibletwo(true);
                                                    setDisplayData(project);
                                                    setidset(project._id);
                                                    setProjectName(project.title);
                                                    // console.warn("onclick button check");
                                                    // getCertificate.project=project._id;
                                                    setGetCertificate({getCertificate,...project._id, ...project.supervisor});
                                                    // setGetCertificate({...project.group})
                                                    // console.warn("obj",getCertificate);
                                                    setGetCertificate({ ...getCertificate, project: project._id, supervisor: project.supervisor, ...project.group});                        
                                                    // setGetCertificate({ ...getCertificate});                        
                                                }
                                            }
                                        >Assign Certificate</button>)}
                                    </td>
                                </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                    </>
                    )
                    :certificateType === "final"?
                    (<><table className='table'>
                        <thead>
                            <tr>
                                <th scope='col'>Sr No</th>
                                <th scope='col'>Project Title</th>
                                <th scope='col'>Batch</th>
                                <th scope='col'>Session</th>
                                <th scope='col'>type</th>
                                <th scope='col'>Group Members</th>
                                <th scope='col'>Comments</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            supervisorData&&
                            supervisorData.filter((currentS)=>{
                                return currentS.supervisor === userId;
                            }).map((project,i)=>{
                                {/* {console.log(project._id)} */}
                                return(
                                    <tr key={project._id}>
                                    <td>{i+1}</td>
                                    <td>{project.title}</td>
                                    <td>{project.batch}</td>
                                    <td>Fall</td>
                                    <td>Final</td>
                                    <td>{project.group.map((student)=>(" "+ student+ "  "))}</td>
                                    
                                    <td><button
                                            onClick={
                                                ()=>{
                                                    setGetCertificate(project);
                                                    setidset(project._id);
                                                    setvisiblethree(true);
                                                    // setProjectName(project.title);
                                                    // setGetCertificate({getCertificate,...project._id, ...project.supervisor});
                                                    setGetCertificate({ ...getCertificate,title: project.title, project: project._id, supervisor: project.supervisor,group: project.group, member0:project.group[0], member1: project.group[1], member2: project.group[2]});                        
                                                }
                                            }
                                        >Assign Certificate</button>
                                    </td>
                                </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                    
                    </>):null
                    }
                    
                </div>

  </div>);
};

export default DownloadPerform;













