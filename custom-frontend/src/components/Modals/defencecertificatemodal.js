import React from 'react';
import Modal from "react-awesome-modal";
import styles from "../../pages/dashboard/dashboard_supervisor/projects.module.css";

const Defencecertificatemodal = ({
    visibilty,
    setvisibility,
    // seteventtype,
    submitfunc,
    changefunc,
    data,
    type,
    setsettid,
    // projname
}) => {
    console.log(data);
  return( 
      <>
    <Modal
        visible={visibilty}
        width="650"
        height="650"
        effect="fadeInUp"
        onClickAway={() => {
        //   seteventtype(false);
          setsettid("");
          setvisibility(false);
        }}
      >
        <h2 style={{ textAlign: "center",marginTop: '10%' }}>{type} Defence Certificate</h2>
        <div>
          <form onSubmit={submitfunc} autoComplete="off" id="student-form">
            <input type="text" name="_id" value={data?._id} hidden />

            <div className={styles.inputdiv}>
              <label>Project Title</label>
              <input
                type="text"
                name="title"
                value={data?.title}
                onChange={changefunc}
                readOnly
              />
            </div>
            
            <div className={styles.inputdiv}>
              <label className="event-details" style={{paddingRight:' 24px',marginLeft: '-20px'}}>SUPERVISOR’S COMMENTS ABOUT PROJECT AND STUDENTS	</label>
              <textarea
                rows={12}
                cols={40}
                type="text"
                name="comments"
                value={data?.comments}
                onChange={changefunc}
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
      </Modal>
  </>);
};

export default Defencecertificatemodal;
