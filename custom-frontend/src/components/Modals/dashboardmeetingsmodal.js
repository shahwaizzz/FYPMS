import React from "react";
import Modal from "react-awesome-modal";
import styles from "../../pages/dashboard/dashboard_supervisor/projects.module.css";

const ReturnModal = ({
  visibilty,
  setvisibility,
  submitfunc,
  changefunc,
  type,
  setsettid,
  data,
  noteaddfunc,
  noteval,
  notes,
  setnoteval,
  changenotval,
  projectid,
  setprojectid,
  projects,
  id
}) => {
  return (
      <>
    <Modal
      visible={visibilty}
      width="650"
      height="650"
      effect="fadeInUp"
      onClickAway={() => {
        setsettid("");
        setvisibility(false);
      }}
    >
        <div className={styles.Modal}>
      <h2 style={{ textAlign: "center" }}>{type} Meeting</h2>
      
        <form onSubmit={submitfunc} autoComplete="off" id="student-form">
          <div className={styles.inputdiv}>
            <label>Topic</label>
            <input
              type="text"
              name="topic"
              value={data?.topic}
              onChange={changefunc}
              required
            />
          </div>
          <div className={styles.inputdiv}>
            <label>Time of Meeting</label>
            <input
              name="timeOfMeeting"
              type="date"
              value={data?.timeOfMeeting}
              onChange={changefunc}
              required
            />
          </div>
          <div className={styles.inputdiv}>
            <label>Notes</label>
            <input type="text" value={noteval} onChange={changenotval}/>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "10px",
            }}
          >
            <button onClick={noteaddfunc}>Add Note point</button>

            

            
          </div>
          <div className={styles.notesdiv}>
                
                {notes?.length > 0 &&
              notes?.map((e, i) => {
                return <p key={i}>{e}</p>
              })}
                
            </div>
          <div className={styles.inputdiv}>
            <label>Supervisor</label>
            <input
              type="text"
              name="supervisor"
              disabled
              value={id}
            />
          </div>
          <div className={styles.inputdiv}>
            <label>Project Id</label>
            <input
              type="text"
              name="project"
              required
              value={data?.project}
              onChange={changefunc}
              list="project-list"
            />
             <datalist id="project-list">
                  {projects && projects?.map((e,i) => {
                    // setprojectid(e._id)
                    return(
                      <option key={i}>{e.title}</option>
                    )
                  })}
                </datalist>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "10px",
              margin:'15px auto'
            }}
          >
            <button type="submit">
              {type === "add" ? "Create" : "update"} meeting
            </button>
          </div>
        </form>
      </div>
    </Modal>
    </>
  );
};



export default ReturnModal;
