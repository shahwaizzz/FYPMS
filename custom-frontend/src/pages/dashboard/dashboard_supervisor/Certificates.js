import React,{useState, useEffect}  from 'react';
import { Button } from 'react-bootstrap';
import  '../../../index.css';
import axios from 'axios'; 
import Progressbar from "../../../components/progressbar";
import { defencecertificate,assignmarks,assignmarkssupervisor } from "../../../apis";
import { projectUrl, midcertificate } from '../../../apis';
import { successalert,erroralert } from "../../../components/alert";
import Defencecertificatemodal from "../../../components/Modals/defencecertificatemodal";
import Midcertificatemodal from "../../../components/Modals/midcertificatemodal";
import Finalcertificatemodal from "../../../components/Modals/finalcertificatemodal";
const projects = axios.create({
    baseURL:projectUrl
})
const Certificates = () =>{
    const [certificateType,setCertificateType]=useState('');
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
    const  supervisor =JSON.parse(localStorage.getItem("supervisor"));
    // console.log(supervisor)
    const {name,userId}=supervisor;
    // console.log('user id', userId);
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

    function handleChange1(e) {
        const name = e.target.name;
        var value = e.target.value;
        setGetCertificate({ ...getCertificate, [name]: value });
    }
    function handleChange(e) {
        const name = e.target.name;
        var value = e.target.value;
        setDisplayData({ ...displayData, [name]: value });
    }
    // console.log(displayData);
    // console.log("------");
    function submitCertificate(e) {
        e.preventDefault();
        alert("submit form");
        console.log(displayData)
        console.log(displayData);
        const options = {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(displayData),
        };
        fetch(defencecertificate, options)
          .then((res) => res.json())
          .then(
            (result) => {
              console.log(result);
              if (result.err.code === 0) {
                setDisplayData(result);
                setRefresh(!refresh);
                setvisible(false)
                successalert('Success',"Student Add Successfully");
                setDisplayData(false);
              } else if (result.err.code === 11000) {
                erroralert('Error',`This ${JSON.stringify(result.err.keyValue)} is already in use`
                );
              } else if (result.err.message) {
                erroralert('Error',result.err.message);
              }
            },
            (error) => {
              erroralert('Error',error);
            }
          );
      }
    
      function submitMidCertificate(e) {
        e.preventDefault();
        alert("submit form");
        console.log(getCertificate);
        console.log(displayData)
        // setGetCertificate({...idset})
        console.warn(getCertificate);
        console.warn(idset);
        const options = {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(getCertificate),
        };
        fetch(midcertificate, options)
          .then((res) => res.json())
          .then(
            (result) => {
                alert("then 2");
              console.log(result);
              if (result.err.code === 0) {
                setGetCertificate(result);
                setRefresh(!refresh);
                setvisibletwo(false)
                successalert('Success',"Certificate Send Successfully");
              } else if (result.err.code === 11000) {
                erroralert('Error'
                  `This ${JSON.stringify(result.err.keyValue)} is already in use`
                );
              } else if (result.err.message) {
                erroralert('Error',result.err.message);
              }
            },
            (error) => {
              erroralert('Error',error);
            }
          );
      }


    return(
        <>
            <div>
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
                        <Defencecertificatemodal
                        visibilty={visible}
                        setvisibility={setvisible}
                        setDisplayData={setDisplayData}
                        // setstdtype={setAddCertificate}
                        submitfunc={submitCertificate}
                        changefunc={handleChange}
                        type={"add"}
                        projname={projectName}
                        setsettid={setidset}
                        data={displayData}
                    />
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
                    <Midcertificatemodal
                        visibilty={visibletwo}
                        setvisibility={setvisibletwo}
                        setDisplayData={setDisplayData}
                        submitfunc={submitMidCertificate}
                        changefunc={handleChange1}
                        type={"add"}
                        // projname={projectName}
                        setsettid={setidset}
                        data={displayData}
                    />
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
                                    
                                    <td>{project&&project.final === 1?(<b>Assigned</b>) : (<button
                                            onClick={
                                                ()=>{
                                                    setDisplayData(project);
                                                    setidset(project._id);
                                                    setEditForm(true);
                                                    setvisiblethree(true);
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
                    <Finalcertificatemodal
                        visibilty={visiblethree}
                        setvisibility={setvisiblethree}
                        setDisplayData={setDisplayData}
                        submitfunc={submitMidCertificate}
                        changefunc={handleChange1}
                        type={"add"}
                        // projname={projectName}
                        setsettid={setidset}
                        data={displayData}
                    />
                    </>):null
                    }
                    
                    

                </div>
            </div>
        </>
    )
}
export default Certificates;