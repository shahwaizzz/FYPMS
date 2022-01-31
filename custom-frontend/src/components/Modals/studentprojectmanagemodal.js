import React from "react";
import Modal from "react-awesome-modal";
import styles from "../../pages/dashboard/dashboard_supervisor/projects.module.css";

export const StudentProjectManagemodel = ({
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
}) => {
  return (
    <>
      <Modal
        visible={visibilty}
        width="600"
        height="250"
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

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "10px",
                margin:'10px auto'
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
