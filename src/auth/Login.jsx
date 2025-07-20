import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";

const Login = () => {
  const [error, setError] = useState('');
  const [loginCredentil, setLoginCrendial] = useState({
    emailId: "rishabh@gamil.com",
    password: "Rishabh@123",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleInputField = (e) => {
    setLoginCrendial({
      ...loginCredentil,
      emailId: e.target.value,
      password: e.target.value,
    });
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(
         BASE_URL + "/login",
        {
          emailId: loginCredentil.emailId,
          password: loginCredentil.password,
        },
        {
          withCredentials: true,
        },
      );
      if(res){
        dispatch(addUser(res.data));
        navigate('/')
      }
    } catch (err) {
      setError(err?.response?.data);
      console.log( err);
    }
  };

  return (
    <>
      <div className="card bg-base-300 w-96 shadow-sm flex justify-self-center my-4">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl">Login</h2>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">EmailId</legend>
            <input
              type="text"
              className="input"
              value={loginCredentil.emailId}
              onChange={(e) => handleInputField(e)}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Password</legend>
            <input
              type="password"
              className="input"
              value={loginCredentil.password}
              onChange={(e) => handleInputField(e)}
            />
          </fieldset>
          <p className="my-4 text-red-500">{error}</p>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
