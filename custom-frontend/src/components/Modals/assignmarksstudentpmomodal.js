import React from 'react';
import Modal from 'react-awesome-modal'
import styles from "../../pages/dashboard/dashboard_supervisor/projects.module.css";


const MarksModal = ({
    visibilty,
    setvisibility,
    submitfunc,
    changefunc,
    type,
    setsettid,
    data,
    id
  }) => {
    return (
        <>
      <Modal
        visible={visibilty}
        width="450"
        height="350"
        effect="fadeInUp"
        onClickAway={() => {
          setsettid("");
          setvisibility(false);
        }}
      >
          <div className={styles.Modal}>
        <h2 style={{ textAlign: "center" }}>Assign Marks</h2>
        
          <form onSubmit={submitfunc} autoComplete="off" id="student-form">
            <div className={styles.inputdiv}>
              <label>Proposal</label>
              <input
                type="number"
                name="proposal"
                value={data?.proposal}
                onChange={changefunc}
              />
            </div>
            <div className={styles.inputdiv}>
              <label>Mid</label>
              <input
                name="mid"
                type="number"
                value={data?.mid}
                onChange={changefunc}
              />
            </div>
            <div className={styles.inputdiv}>
              <label>Final</label>
              <input type="number" value={data?.final} onChange={changefunc} name="final"/>
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
                assign marks
              </button>
            </div>
          </form>
        </div>
      </Modal>
      </>
    );
  };

  const Supervisorassignmarks = (
    {
        visibilty,
        setvisibility,
        submitfunc,
        changefunc,
        type,
        setsettid,
        data,
        id
      }
  ) => {
      return(
          <Modal 
          visible={visibilty}
          width="450"
          height="250"
          effect="fadeInUp"
          onClickAway={() => {
            setsettid("");
            setvisibility(false);
          }}
          >
 <div className={styles.Modal}>
        <h2 style={{ textAlign: "center" }}>Assign Marks</h2>
        <form onSubmit={submitfunc} autoComplete="off" id="student-form">
            <div className={styles.inputdiv}>
              <label>Supervisor Marks</label>
              <input
                type="number"
                name="marks"
                value={data?.marks}
                onChange={changefunc}
              />
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
                assign marks
              </button>
            </div>
            </form>
        </div>
          </Modal>
      )
  }
  
  
  
  export {MarksModal,Supervisorassignmarks};