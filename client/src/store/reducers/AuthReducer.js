import jwt_decode from "jwt-decode";
export const SET_TOKON_PMO = "SET_TOKEN_PMO";
export const SET_TOKON_SUPERVISOR = "SET_TOKEN_SUPERVISOR";
export const SET_TOKON_STUDENT = "SET_TOKEN_STUDENT";
export const LOGOUT = "LOGOUT";

const initState = {
  token: "",
  user: {},
  pmo: false,
  student: false,
  supervisor: false,
};
const verifyToken = (token) => {
  const decodedToken = jwt_decode(token);
  const expireIn = new Date(decodedToken.exp * 1000);
  if (new Date() > expireIn) {
    localStorage.removeItem("myToken");
    return null;
  } else {
    return decodedToken;
  }
};
const token = localStorage.getItem("myToken");
if (token) {
  const decoded = verifyToken(token);
  if (decoded) {
    initState.token = token;
    const { userId, name } = decoded;
    initState.user = { userId: userId, name: name };
  }
}
const AuthReducer = (state = initState, action) => {
  const decoded = verifyToken(action.paylood);
  console.log(decoded);
  const name = decoded.name;
  const userId = decoded.userId;
  switch (action.type) {
    case SET_TOKON_PMO:
      //console.log(user);

      return {
        ...state,
        token: action.paylood,
        user: { userId, name },
        pmo: true,
        student: false,
        supervisor: false,
      };
    case SET_TOKON_SUPERVISOR:
      //console.log(user);
      return {
        ...state,
        token: action.paylood,
        user: { userId, name },
        pmo: false,
        student: false,
        supervisor: true,
      };
    case SET_TOKON_STUDENT:
      //console.log(user);
      return {
        ...state,
        token: action.paylood,
        user: { userId, name },
        pmo: false,
        student: true,
        supervisor: false,
      };
    case LOGOUT:
      return {
        ...state,
        token: "",
        user: {},
        pmo: false,
        student: true,
        supervisor: false,
      };
    default:
      return state;
  }
};
export default AuthReducer;
