import React from "react";
import Modal from "react-awesome-modal";
import styles from "../../pages/dashboard/dashboard_supervisor/projects.module.css";

const ReturnModal = ({
  visibilty,
  setvisibility,
  setformtype,
  submitfunc,
  changefunc,
  data,
  supdata,
  stddata,
  type,
  setid,
  supid,
  supervisor,
}) => {
  return (
    <>
      <Modal
        visible={visibilty}
        width="800"
        height="700"
        effect="fadeInUp"
        onClickAway={() => {
          setformtype(false);
          setid("");
          setvisibility(false);
        }}
      >
        <h2 style={{ textAlign: "center" }}>{type} Project</h2>
        <div>
          <form onSubmit={submitfunc} autoComplete="off" id="student-form">
            <input
              type="text"
              name="_id"
              value={data?._id}
              // onChange={handleChange}
              hidden
            />

            <div className={styles.inputdiv}>
              <label>Project Title</label>
              <input
                type="text"
                name="title"
                value={data?.title}
                onChange={changefunc}
              />
            </div>
            <div className={styles.inputdiv}>
              <label>Status</label>
              <select name="status" value={data?.status} onChange={changefunc}>
                <option value="Pending">Pending</option>
                <option value="Rejected">Rejected</option>
                <option value="Approved">Approved</option>
                <option value="Working">Working</option>
                <option value="Completed">Complete</option>
              </select>
            </div>
            <div className={styles.inputdiv}>
              <label>Description</label>
              <input
                type="text"
                name="description"
                value={data?.description}
                onChange={changefunc}
              />
            </div>
            <div className={styles.inputdiv}>
              <label>Objective</label>
              <input
                type="text"
                name="objectives"
                value={data?.objectives}
                onChange={changefunc}
              />
            </div>
            <div className={styles.inputdiv}>
              <label>Batch</label>
              <input
                type="number"
                name="batch"
                value={data?.batch}
                onChange={changefunc}
              />
            </div>

            {supervisor ? (
              <div className={styles.inputdiv}>
                <label>Supervisor</label>
                <input
                  type="text"
                  name="supervisor"
                  value={supid}
                  disabled
                  // onChange={changefunc}
                />
              </div>
            ) : (
              <div className={styles.inputdiv}>
                <label>Supervisor</label>
                <input
                  type="text"
                  name="supervisor"
                  value={data?.supervisor}
                  list="supervisor-list"
                  onChange={changefunc}
                />
                <datalist id="supervisor-list">
                  {supdata && supdata?.map((e) => <option>{e.name}</option>)}
                </datalist>
              </div>
            )}
            {/* 
                  {supervisor ? (
{type === "add" ? (
  
) : (
  
) : (

)}
                  )} */}

            {/* </div> */}
            <div className={styles.inputdiv}>
              <label>Group Leader</label>
              <input
                type="text"
                name="member_1"
                value={data?.member_1}
                onChange={changefunc}
                list="student-list"
                placeholder="None"
                required
              />
            </div>
            <div className={styles.inputdiv}>
              <label>Group Member</label>
              <input
                type="text"
                name="member_2"
                value={data?.member_2}
                onChange={changefunc}
                list="student-list"
                placeholder="None"
              />
            </div>
            <div className={styles.inputdiv}>
              <label>Group Member</label>
              <input
                type="text"
                name="member_3"
                value={data?.member_3}
                onChange={changefunc}
                list="student-list"
                placeholder="None"
              />
            </div>
            <datalist id="student-list">
              {stddata && stddata?.map((e) => <option>{e.rollNumber}</option>)}
            </datalist>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "10px",
              }}
            >
              <button type="submit">
                {type === "add" ? "Create" : "update"} project
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default ReturnModal;
