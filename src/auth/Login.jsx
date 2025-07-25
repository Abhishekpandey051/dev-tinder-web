import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";

const Login = () => {
  const [error, setError] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [loginCredentil, setLoginCrendial] = useState({
    firstName:"",
    lastName:"",
    emailId: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleInputField = (e) => {
      const {name, value} = e.target
    setLoginCrendial({
      ...loginCredentil,
      [name]:value
    });
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(
         BASE_URL + "/login", loginCredentil,
        {
          withCredentials: true,
        },
      );
      if(res){
        dispatch(addUser(res.data));
        navigate('/')
        setIsLogin({})
      }
    } catch (err) {
      setError(err?.response?.data);
      console.log( err);
    }
  };

  const handleSignUp = async() => {
    try{
      const res = await axios.post(BASE_URL + "/signup", loginCredentil, {withCredentials:true})
      if(res){
      dispatch(addUser(res?.data?.data))
      setIsLogin({})
    }
    }
    catch(err){
      setError(err?.response?.data)
      console.log(err)
    }
  }

  return (
    <>
      <div className="card bg-base-300 w-96 shadow-sm flex justify-self-center my-4">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl">{isLogin ? 'Login' : 'Sign up'}</h2>
         { !isLogin && 
         <div>
         <fieldset className="fieldset">
            <legend className="fieldset-legend">First name</legend>
            <input
              type="text"
              className="input"
              name="firstName"
              value={loginCredentil.firstName}
              onChange={(e) => handleInputField(e)}
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Last name</legend>
            <input
              type="text"
              className="input"
              name="lastName"
              value={loginCredentil.lastName}
              onChange={(e) => handleInputField(e)}
            />
          </fieldset>
          </div>
          }

          <fieldset className="fieldset">
            <legend className="fieldset-legend">EmailId</legend>
            <input
              type="text"
              className="input"
              name="emailId"
              value={loginCredentil.emailId}
              onChange={(e) => handleInputField(e)}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Password</legend>
            <input
              type="password"
              className="input"
              name="password"
              value={loginCredentil.password}
              onChange={(e) => handleInputField(e)}
            />
          </fieldset>
          <p className="my-4 text-red-500">{error}</p>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={isLogin ? handleLogin : handleSignUp}>
              {isLogin ? 'Login' : 'SignUp'}
            </button>
          </div>
          <p 
          className="m-auto cursor-pointer py-2"
          onClick={()=>setIsLogin(!isLogin)}
          >
            {
              isLogin ? "New User? Signup Here"
              : "Existing User? Login Here"
            }
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
