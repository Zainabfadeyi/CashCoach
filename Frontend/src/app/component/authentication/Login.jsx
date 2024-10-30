import React, {
    useRef,
    useState,
    useEffect,
  } from "react";
  import styles from "../../../styles/reg.module.css";
  import axios from '../../../api/axios';
  import {Link} from "react-router-dom"
  import { FaFingerprint } from "react-icons/fa";
  import { useDispatch, useSelector } from "../../../api/hook";
  import { clearUser, getUser, setUser } from "../../../api/slices/userSlices";
  import { login } from '../../../api/slices/authSlices';
  
  const LOGIN_URL = "auth/login/";
  
  const Login = () => {
    const [loading, setLoading] = useState(false);
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
      setLoading(true);
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
           
            const userDetailsResponse = await axios.get('user/details/', {
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
      }finally {
        setLoading(false); // Reset loading to false after submission is complete
      }
      
    };
  
  
  return (
    < >
    
    <div className={styles.cover}>
    <div className={styles.Login}>
      {/* If custom message is present, show it */}
      {customMessage ? (
        <section>
          <h2 className={styles.success}>{customMessage}</h2>
        </section>
      ) : (
        <div className={styles.LoginContainer}>
        <div className={styles.LogoWrapper}>
          <Link to="/">
            <div>
              <FaFingerprint />
              <span>Cash Coach</span>
            </div>
          </Link>
        </div>

        <section className={styles.sectionLogin}>
              <p
                ref={errRef}
                className={errMsg ? styles.errmsg : styles.offscreen}
                aria-live="assertive"
              >
                {errMsg}
              </p>
              <div className={styles.name}>Login</div>
              <div className={styles.formReg} >
              <label className={styles.regLabel}>Email:</label>
                <input 
                className={styles.inputReg}
                  type="text"
                  id="email"
                  ref={userRef}
                  autoComplete="off"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                />
  
                <label className={styles.regLabel}>Password: </label>
                <input
                  className={styles.inputReg}
                  type="password"
                  id="password"
                  name="password"
                  required
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                />
              {/* <div
                  style={{
                    display: "flex",
                    justifyContent: "right",
                    alignItems: "right",
                    width: "100%",
                  }}
                >
                  <Link to="/forgotPassword">Forgot Password?</Link>
                </div> */}
                <button type="submit" onClick={handleSubmit} className={styles.buttonReg}>
                {loading ? 'login...' : 'Sign In'}
                </button>
                <p>
                  Need an Account?
                  <span>
                    <Link to="/register">Sign up</Link>
                  </span>
                </p>
              </div>
            </section>
          </div>
        )}

        {/* <div className="ImgContainer">
            <img src="/savings.svg"  className="RegImageLogin" />
        </div> */}
      </div>
      </div>
    </>
  );
};

export default Login;
