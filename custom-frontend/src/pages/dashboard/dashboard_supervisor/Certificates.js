import React,{useState, useEffect}  from 'react';
import { Button } from 'react-bootstrap';
import  '../../../index.css';
import axios from 'axios'; 
import Progressbar from "../../../components/progressbar";
import { defencecertificate,assignmarks,assignmarkssupervisor } from "../../../apis";
import { projectUrl } from '../../../apis';
import { successalert,erroralert } from "../../../components/alert";
import Defencecertificatemodal from "../../../components/Modals/defencecertificatemodal";
const projects = axios.create({
    baseURL:projectUrl
})
const Certificates = () =>{
    const [certificateType,setCertificateType]=useState('');
    const [supervisorData,setSupervisorData]= useState(false);
    const [refresh,setRefresh] = useState();
    const [displayData, setDisplayData] = useState(false);
    const [visible, setvisible] = useState(false);
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

    // function handleChange(e) {
    //     const name = e.target.name;
    //     var value = e.target.value;
    //     setGetCertificate({ ...getCertificate, [name]: value });
    // }
    function handleChange(e) {
        const name = e.target.name;
        var value = e.target.value;
        setDisplayData({ ...displayData, [name]: value });
    }
    // console.log(displayData);
    console.log("------");
    function submitCertificate(e) {
        e.preventDefault();
        alert("submit form");
        console.log(displayData)
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
                    (<table className='table'>
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
                                    <td>{project.group.map((student)=>(" "+ student+ "  "))}</td>
                                    <td>Defence certificate</td>
                                    <td><button
                                            onClick={
                                                ()=>{
                                                    setDisplayData(project);
                                                    setidset(project._id);
                                                    setEditForm(true);
                                                    setvisible(true);
                                                    setProjectName(project.title);                        
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
                    )
                    :certificateType ==='mid'?
                    (<table className='table'>
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
                                    
                                    <td><button
                                            onClick={
                                                ()=>{
                                                    setDisplayData(project);
                                                    setidset(project._id);
                                                    setEditForm(true);
                                                    setvisible(true);
                                                    setProjectName(project.title);                        
                                                }
                                            }
                                        >Assign Certificate</button>
                                    </td>
                                </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>)
                    :certificateType === "final"?
                    (<table className='table'>
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
                        </tbody>
                    </table>):null
                    }
                    <Defencecertificatemodal
                        visibilty={visible}
                        setvisibility={setvisible}
                        // setstdtype={setAddCertificate}
                        submitfunc={submitCertificate}
                        changefunc={handleChange}
                        type={"add"}
                        // projname={projectName}
                        setsettid={setidset}
                        data={displayData}
                    />
                </div>
            </div>
        </>
    )
}
export default Certificates;