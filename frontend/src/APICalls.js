import axios from "axios";

export const loginCall = async (userCredential, dispatch) => {
  console.log("login call")
  dispatch({ type: "LOGIN_START" });
  try {
    console.log(userCredential);
    const res = await axios.post("/auth/login", userCredential);
    console.log(res)
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } 
  catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  } 
};

