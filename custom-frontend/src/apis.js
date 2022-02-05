const port = 8000;
const localhost = `localhost:${port}`;
export const students = `http://${localhost}/api/v1/pmo/students`;
export const supervisorsUrl = `http://${localhost}/api/v1/pmo/supervisors`;
export const eventUrl = `http://${localhost}/api/v1/pmo/events`;
export const projectUrl = `http://${localhost}/api/v1/pmo/projects`;
export const supervisorloginapi = `http://${localhost}/api/v1/auth/supervisor/login`
export const studentloginapi = `http://${localhost}/api/v1/auth/student/login`
export const pmologinapi = `http://${localhost}/api/v1/auth/pmo/login`
export const pmouploadtemplate = `http://${localhost}/api/v1/pmo/upload`
export const pmouploadtemplatetwo = `http://${localhost}/api/v1/pmo/templates/upload` 
export const supervisorcreatemeetingapi = `http://${localhost}/api/v1/supervisor/create-meeting`
export const supervisorgetmeetingapi = (id) => `http://${localhost}/api/v1/supervisor/getmeetings/${id}`
export const supervisorupdatemeetingapi = (id) => `http://${localhost}/api/v1/supervisor/updatemeeting/${id}`
export const assignmarks = (id) => `http://${localhost}/api/v1/pmo/${id}/marks`
export const assignmarkssupervisor = `http://${localhost}/api/v1/supervisor/marks`
export const getstdmarks = (id) => `http://${localhost}/api/v1/student/marks/${id}`
export const getstdmeetings = `http://${localhost}/api/v1/student/meetings`
export const stdupdateproject = (rollno) => `http://${localhost}/api/v1/student/add-details/${rollno}`
export const stdgetproject = (rollno) => `http://${localhost}/api/v1/student/projects/${rollno}`
export const supervisorgetproject = (id) => `http://${localhost}/api/v1/supervisor/projects/${id}`
export const supervisoraddmeetingnotes = `http://${localhost}/api/v1/supervisor/addmeetingnotes`
export const findtemplates = `http://${localhost}/api/v1/pmo/gettemplates`
export const stdupdatetemp = (rollno,flag) => `http://${localhost}/api/v1/student/updateproject/${rollno}/${flag}`
export const updatemeetingdocs = (id) => `http://${localhost}/api/v1/supervisor/updatemeetingdocs/${id}`
export const addmeetingdocs = (id,rollno) => `http://${localhost}/api/v1/student/addmeetingdocs/${id}/${rollno}`
export const preliminaryForm = `http://${localhost}/api/v1/pmo/create-preliminary`
export const defencecertificate= `http://${localhost}/api/v1/supervisor/assigndefencecertificate`
export async function downloadImage(imageSrc) {
    const options = {
        method: 'GET',
        mode: 'no-cors',
      };
      try{
        const image = await fetch(imageSrc,options)
        console.log(image)
        const imageBlog = await image.blob()
        const IMG_URL = URL.createObjectURL(imageBlog)
        console.log(IMG_URL)
        // window.location.assign(IMG_URL)
        const link = document.createElement('a')
        link.href = IMG_URL
        link.download = IMG_URL
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }catch(err){
          console.log(err)
      }
   
}