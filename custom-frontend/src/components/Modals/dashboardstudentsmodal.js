import React from "react";
import Modal from "react-awesome-modal";
import styles from "../../pages/dashboard/dashboard_supervisor/projects.module.css";

const ReturnModal = ({
  visibilty,
  setvisibility,
  setstdtype,
  submitfunc,
  changefunc,
  type,
  setsettid,
  data
}) => {
  return (
    <>
      <Modal
        visible={visibilty}
        width="650"
        height="650"
        effect="fadeInUp"
        onClickAway={() => {
          setstdtype(false);
          setsettid("");
          setvisibility(false);
        }}
      >
        <h2 style={{ textAlign: "center" }}>{type} Student</h2>
        <div>
          <form onSubmit={submitfunc} autoComplete="off" id="student-form">
            {/* <input type='text' name='_id' value={data?._id} hidden /> */}

            <div className={styles.inputdiv}>
              <label>Student Roll Number</label>
              <input type="text" name="rollNumber" onChange={changefunc} value={data?.rollNumber} />
              </div>
              <div className={styles.inputdiv}>
                <label>Student Name</label>
                <input type="text" name="name" onChange={changefunc} value={data?.name} />
              </div>
              <div className={styles.inputdiv}>
                <label>Department</label>
                <input type="text" name="department" onChange={changefunc} value={data?.department}/>
              </div>
              <div className={styles.inputdiv}>
                <label>Section</label>
                <input type="text" name="section" onChange={changefunc} value={data?.section}/>
              </div>
              <div className={styles.inputdiv}>
                <label>Batch</label>
                <input type="text" name="batch" onChange={changefunc} value={data?.batch}/>
              </div>
              <div className={styles.inputdiv}>
                <label>Email</label>
                <input type="email" name="email" onChange={changefunc} value={data?.email}/>
              </div>
              <div className={styles.inputdiv}>
                <label>Phone Number</label>
                <input type="number" name="phone" onChange={changefunc} value={data?.phone}/>
              </div>
              <div className={styles.inputdiv}>
                <label>Password</label>
                <input type="password" name="password" onChange={changefunc} />
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
                {type === "add" ? "Create" : "update"} Student
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default ReturnModal;
