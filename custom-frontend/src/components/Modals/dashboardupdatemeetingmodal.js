import React from 'react';
import Modal from 'react-awesome-modal'
import styles from '../../pages/dashboard/dashboard_supervisor/projects.module.css';

export const Meetingupdatemodal = ({visibilty,val,submitfunc,setsettid,setvisibility,changefunc}) => {

    return(


    <Modal
    visible={visibilty}
    width="250"
    height="250"
    effect="fadeInUp"
    onClickAway={() => {
      setsettid("");
      setvisibility(false);
    }}
    >
 <div>'
 <h2 style={{ textAlign: "center" }}>Update Meeting</h2>
 <form
 onSubmit={submitfunc}
 autoComplete="off"
  id="student-form"
 >
     <div className={styles.inputdiv}>
     <input 
       type="date"
       value={val}
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
             Update meeting
            </button>
          </div>
 </form>
 </div>
    </Modal>

    )
   

}