import React, {
    useRef,
    useState,
    useEffect,
    useContext,
    FormEvent,
  } from "react";
  import "../../../styles/reg.css";
  import axios from '../../../api/axios';
  import {Link} from "react-router-dom"
  import { FaFingerprint } from "react-icons/fa";
  import { useDispatch, useSelector } from "../../../api/hook";
  import { clearUser, getUser, setUser } from "../../../api/slices/userSlices";
  import { login } from '../../../api/slices/authSlices';
  
  const LOGIN_URL = "/auth/login/";
  
  const Login = () => {
    const userRef = useRef(null);
    const errRef = useRef(null);
  
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    useEffect(() => {
      if (userRef.current) userRef.current.focus();
    }, []);
  
    const [showForgotPassword, setShowForgotPassword] = useState(false);
  
  useEffect(() => {
  }, [isAuthenticated]);
  
    useEffect(() => {
      setErrMsg("");
    }, [email, pwd]);
    const [customMessage, setCustomMessage] = useState(null);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(email, pwd);
      try {
          const response = await axios.post(
              LOGIN_URL,
              { email, password: pwd },
              {
                  headers: { 'Content-Type': 'application/json' },
                  withCredentials: true
              }
          );
          console.log(response);
        
         
            setEmail("");
            setPwd("");
            setSuccess(true);
            setCustomMessage('Login successful!, You are logged in. Redirecting...');
        setTimeout(() => {
          window.location.href = '/dashboard';}, 2000)
           
            const userDetailsResponse = await axios.get('/user/details', {
              headers: { Authorization: `Bearer ${response?.data?.access}` },
            });
            // console.log(userDetailsResponse);
            // const accessToken = response?.data?.access;
            // console.log(accessToken);
            const userDetails = userDetailsResponse?.data;
            console.log(userDetails);
            // dispatch(login({...userDetails,accessToken}));
            // dispatch(setUser(userDetails));
            dispatch(login({
              user: userDetails, // User details from the API response
              access: response.data.access, // Access token from the API response
              refresh: response.data.refresh // Refresh token from the API response
            }));
      } catch (err ) {
          if (!err?.response) {
              setErrMsg('No Server Response');
          } else if (err.response?.status === 400) {
              setErrMsg('Missing Username or Password');
          } else if (err.response?.status === 401) {
              setErrMsg('Unauthorized');
          } else {
              setErrMsg('Login Failed');
          }
          if (errRef.current) errRef.current.focus();
      }
      
    };
  
    return (
      < >
      
        <div className="Login">
          {customMessage ? (
            <section className="sectionReg">
              <h1>{customMessage}</h1>
            </section>
          ) : (
            <div className="RegContainer">
              <div className="LogoWrapper"> 
                  <Link to={"/register"}>
                      <div style={{display:"flex", alignItems:"center"}}> 
                          <FaFingerprint/>
                          <div style={{color:"black"}}>Cash Coach</div>
                      </div> 
                  </Link>
                </div>
            <section className="sectionReg">
  
              <p
                ref={errRef}
                className={errMsg ? "errmsg" : "offscreen"}
                aria-live="assertive"
              >
                {errMsg}
              </p>
              <h1>Sign In</h1>
              <form onSubmit={handleSubmit}
              className="formReg">
                <label htmlFor="username" className="RegLabel">Email:</label>
                <input 
                className="inputReg"
                  type="text"
                  id="email"
                  ref={userRef}
                  autoComplete="off"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                />
  
                <label htmlFor="password" className="RegLabel">Password:</label>
                <input
                className="inputReg"
                  type="password"
                  id="password"
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                  required
                />
                <div style={{display:"flex", justifyContent:"right"}}>
                    <a
                        href="/forgotPassword"
                        onClick={() => setShowForgotPassword(true)}
                      >
                        Forgot Password?
                      </a>
                </div>
  
                <button type="submit" className="buttonReg" >Sign In</button>
              </form>
              <p className="suggest">
                Need an Account?
                <span className="line">
                    <Link to="/register">Sign up</Link>
                  </span>
                 
              </p>
              
            </section>
            </div>
          )}
  
          <div className="ImgContainer">
              <img src="/savings.svg"  className="RegImageLogin" />
          </div>
        </div>
      </>
    );
  };
  
  export default Login;
  