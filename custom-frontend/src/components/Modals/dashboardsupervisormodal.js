import React from "react";
import Modal from "react-awesome-modal";
import styles from "../../pages/dashboard/dashboard_supervisor/projects.module.css";

const ReturnModal = ({
  visibilty,
  setvisibility,
  setsuptype,
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
        height="500"
        effect="fadeInUp"
        onClickAway={() => {
          setsuptype(false);
          setsettid("");
          setvisibility(false);
        }}
      >
        <h2 style={{ textAlign: "center" }}>{type} Supervisor</h2>
        <div>
          <form onSubmit={submitfunc} autoComplete="off" id="student-form">
            {/* <input type='text' name='_id' value={data?._id} hidden /> */}

               <div className={styles.inputdiv}>
                  <label>Supervisor Name</label>
                  <input
                    type='text'
                    name='name'
                    value={data?.name}
                    onChange={changefunc}
                  />
                </div>
                <div className={styles.inputdiv}>
                  <label>Email</label>
                  <input
                    type='email'
                    name='email'
                    value={data?.email}
                    onChange={changefunc}
                  />
                </div>
                <div className={styles.inputdiv}>
                  <label>Phone Number</label>
                  <input
                    type='number'
                    name='phone'
                    value={data?.phone}
                    onChange={changefunc}
                  />
                </div>
                <div className={styles.inputdiv}>
                  <label>Department</label>
                  <select
                    name='department'
                    value={data?.department}
                    onChange={changefunc}
                    required
                  >
                    <option value=''>Select Department</option>
                    <option value='CS'>Computer Science</option>
                    <option value='IT'>Information Security</option>
                    <option value='SE'>Software Engineering</option>
                  </select>
                </div>
                <div className={styles.inputdiv}>
                  <label>Password</label>
                  <input
                    type='password'
                    name='password'
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
                {type === "add" ? "Create" : "update"} Supervisor
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default ReturnModal;
