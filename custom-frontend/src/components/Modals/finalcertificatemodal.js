import React from 'react';
import Modal from "react-awesome-modal";
import styles from "../../pages/dashboard/dashboard_supervisor/projects.module.css";

const Finalcertificatemodal = ({
    visibilty,
    setvisibility,
    // seteventtype,
    submitfunc,
    changefunc,
    type,
    data,
    setsettid,
    // projname
}) => {
    console.log(data);
    const {group} = {...data};
    
    // console.log(group);
  return( 
      <>
    <Modal style={{overFlow:'auto'}}
        visible={visibilty}
        width="850"
        // height="1650" 
        overFlow="auto"
        effect="fadeInDown"
        onClickAway={() => {
        //   seteventtype(false);
          setsettid("");
          setvisibility(false);
        }}
      >
      <div style={{overflowX:"auto"}}>
        <h2 style={{ textAlign: "center",marginTop: '5%' }}>{type} Mid Certificate</h2>
        <div>
          <form onSubmit={submitfunc} autoComplete="off" id="student-form">
            <input type="text" name="_id" value={data?._id} onChange={changefunc} hidden />

            <div className={styles.inputdiv}>
              <label>Project Title</label>
              <input
                type="text"
                name="title"
                value={data?.title}
                onChange={changefunc}
                readOnly
                style={{marginLeft:'40px'}}
              />
            </div>
            <div className={styles.inputdiv}>
              <label>FYP Requirements</label>
              <select name="fyprequirements" value={data?.fyprequriements} style={{marginLeft:'40px'}} required onChange={changefunc}>
                <option value="">Select Option</option>
                <option value="Full Complete">Full Complete</option>
                <option value="Partial Complete">Partial Complete</option>
                <option value="Not Complete">Not Complete</option>
              </select>
            </div>
            <div className={styles.inputdiv}>
              <label>Use Cases</label>
              <select name="usecases" value={data?.usecases} required style={{marginLeft:'40px'}} onChange={changefunc}>
                <option value="">Select Option</option>
                <option value="Full Complete">Full Complete</option>
                <option value="Partial Complete">Partial Complete</option>
                <option value="Not Complete">Not Complete</option>
              </select>
            </div>
            <div className={styles.inputdiv}>
              <label>functional Requirements</label>
              <select name="funrequirements" value={data?.funrequirements} required onChange={changefunc} style={{marginLeft:'40px'}}>
                <option value="">Select Option</option>
                <option value="Full Complete">Full Complete</option>
                <option value="Partial Complete">Partial Complete</option>
                <option value="Not Complete">Not Complete</option>
              </select>
            </div>
            <div className={styles.inputdiv}>
              <label>Usecase Diagram</label>
              <select name="diagrams" value={data?.diagrams} onChange={changefunc} required style={{marginLeft:'40px'}}>
                <option value="">Select Option</option>
                <option value="Full Complete">Full Complete</option>
                <option value="Partial Complete">Partial Complete</option>
                <option value="Not Complete">Not Complete</option>
              </select>
            </div>
            {/* <div className={styles.inputdiv}>
              <label>Usecase Diagram</label>
              <select name="name" value={data?.name} onChange={changefunc} style={{marginLeft:'40px'}}>
                <option value="">Select Option</option>
                <option value="Defense">Full Complete</option>
                <option value="Mid Evaluation">Partial Complete</option>
                <option value="Final Evaluation">Not Complete</option>
              </select>
            </div> */}
            {group?group.map((element, i)=>{
                
                return(
                <>
                <div className={styles.inputdiv}>
              <label>Group member {i+1}</label>
              <input
                type="text"
                name={"member".concat(i)}
                value={data?.group[i]}
                onChange={changefunc}
                readOnly
                style={{marginLeft:'40px'}}
              />
            </div>
                <div className={styles.inputdiv}>
                <label className="event-details" style={{paddingRight:' 24px',marginLeft: '-20px'}}>Comments for Member{i+1}</label>
                <textarea
                    rows={3}
                    cols={40}
                    type="text"
                    name={"commentmember"+i}
                    value={data?.commentmember1}
                    onChange={changefunc}
                    style={{marginLeft:'40px'}}
                    required
                />
                </div>
                </>)
            }):null}
            
                <div className={styles.inputdiv}>
                <label className="event-details" style={{paddingRight:' 24px',marginLeft: '-20px'}}>Genral Feedback</label>
                <textarea
                    rows={3}
                    cols={40}
                    type="text"
                    name="feedback"
                    value={data?.feedback}
                    onChange={changefunc}
                    style={{marginLeft:'40px'}}
                    required
                />
                </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "10px",
                marginTop: "10px",
              }}
            >
              <button type="submit">
                {/* {type === "add" ? "Create" : "update"}  */}
                Assign Certificate
              </button>
            </div>
          </form>
        </div>
        </div>
      </Modal>
  </>);
};

export default Finalcertificatemodal;
