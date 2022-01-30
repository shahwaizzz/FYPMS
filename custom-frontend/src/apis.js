const port = 8000;
const localhost = `localhost:${port}`;
export const students = `http://${localhost}/api/v1/pmo/students`;
export const supervisorsUrl = `http://${localhost}/api/v1/pmo/supervisors`;
export const eventUrl = `http://${localhost}/api/v1/pmo/events`;
export const projectUrl = `http://${localhost}/api/v1/pmo/projects`;
export const supervisorloginapi = `http://${localhost}/api/v1/auth/supervisor/login`
export const studentloginapi = `http://${localhost}/api/v1/auth/student/login`
export const pmologinapi = `http://${localhost}/api/v1/auth/pmo/login`
export const pmouploadtemplate = `http://${localhost}/api/v1/pmo/templates/upload`
export const supervisorcreatemeetingapi = `http://${localhost}/api/v1/supervisor/create-meeting`
export const supervisorgetmeetingapi = (id) => `http://${localhost}/api/v1/supervisor/getmeetings/${id}`
export const supervisorupdatemeetingapi = (id) => `http://${localhost}/api/v1/supervisor/updatemeeting/${id}`
export const assignmarks = (id) => `http://${localhost}/api/v1/pmo/${id}/marks`
export const assignmarkssupervisor = `http://${localhost}/api/v1/supervisor/marks`
export const getstdmarks = `http://${localhost}/api/v1/student/marks`

