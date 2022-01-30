import React from "react";
import Modal from "react-awesome-modal";
import styles from "../../pages/dashboard/dashboard_supervisor/projects.module.css";

const ReturnModal = ({
  visibilty,
  setvisibility,
  seteventtype,
  submitfunc,
  changefunc,
  data,
  type,
  setsettid,
}) => {
  return (
    <>
      <Modal
        visible={visibilty}
        width="650"
        height="650"
        effect="fadeInUp"
        onClickAway={() => {
          seteventtype(false);
          setsettid("");
          setvisibility(false);
        }}
      >
        <h2 style={{ textAlign: "center" }}>{type} Event</h2>
        <div>
          <form onSubmit={submitfunc} autoComplete="off" id="student-form">
            <input type="text" name="_id" value={data?._id} hidden />

            <div className={styles.inputdiv}>
              <label>Event Name</label>
              <select name="name" value={data?.name} onChange={changefunc}>
                <option value="Defense">Defense</option>
                <option value="Mid Evaluation">Mid Evaluation</option>
                <option value="Final Evaluation">Final Evaluation</option>
              </select>
            </div>
            <div className={styles.inputdiv}>
              <label>Current Date</label>
              <input
                type="text"
                name="date"
                value={new Date()}
                disabled
              />
            </div>
            <div className={styles.inputdiv}>
              <label>Event Date</label>
              <input
                type="date"
                name="date"
                value={data?.date}
                onChange={changefunc}
              />
            </div>
            <div className={styles.inputdiv}>
              <label>Venue</label>
              <input
                type="text"
                name="venue"
                value={data?.venue}
                onChange={changefunc}
              />
            </div>
            <div className={styles.inputdiv}>
              <label>Year</label>
              <input
                type="number"
                name="year"
                value={data?.year}
                onChange={changefunc}
              />
            </div>
            <div className={styles.inputdiv}>
              <label>Semester</label>
              <select
                name="semester"
                value={data?.semester}
                onChange={changefunc}
              >
                <option value="Fall">Fall</option>
                <option value="Spring">Spring</option>
              </select>
            </div>
            <div className={styles.inputdiv}>
              <label className="event-details">Details</label>
              <textarea
                rows={4}
                cols={40}
                type="text"
                name="details"
                value={data?.details}
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
                {type === "add" ? "Create" : "update"} event
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default ReturnModal;

{
  /* <div className='popup-container'>
<div className='popup'>
  <h2>Edit Event</h2>
  <div className='form-modal'>
    <form
      className='data-form'
      onSubmit={handleEditSubmit}
      autoComplete='off'
      id='student-form'
    >
      <input type='text' name='_id' value={displayData._id} hidden />
      <div>
        <label>Event Name</label>
        <select
          name='name'
          value={displayData.name}
          onChange={handleChange}
        >
          <option value='Defense'>Defense</option>
          <option value='Mid Evaluation'>Mid Evaluation</option>
          <option value='Final Evaluation'>Final Evaluation</option>
        </select>
      </div>
      <div>
        <label>Current Date: {displayData.convertDate}</label>
      </div>
      <div>
        <label>Event Date</label>
        <input
          type='date'
          name='date'
          value={displayData.date}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Venue</label>
        <input
          type='text'
          name='venue'
          value={displayData.venue}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Year</label>
        <input
          type='number'
          name='year'
          value={displayData.year}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Semester</label>
        <select
          name='semester'
          value={displayData.semester}
          onChange={handleChange}
        >
          <option value='Fall'>Fall</option>
          <option value='Spring'>Spring</option>
        </select>
      </div>
      <div>
        <label className='event-details'>Details</label>
        <textarea
          type='text'
          name='details'
          value={displayData.details}
          onChange={handleChange}
        />
      </div>
      <div>
        <button type='submit'>Edit Event</button>
      </div>
    </form>
    <span>
      <AiFillCloseCircle
        size='1.7rem'
        onClick={() => toggleModel("update", false)}
      />
    </span>
    <button
      className='close-data'
      onClick={() => toggleModel("update", false)}
    >
      Close
    </button>
    <form />
  </div>
</div>
</div> */
}
