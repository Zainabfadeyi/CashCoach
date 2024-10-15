// import React, { useRef, useState, useEffect } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { Link } from "react-router-dom";
// import { FaFingerprint } from "react-icons/fa";
// import '../../../styles/reg.css';

// const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
// const USERLASTNAME_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
// const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
// const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// const Register = () => {
//     const userRef = useRef(null);
//   const firstNameRef = useRef(null);
//   const userNameRef = useRef(null);
//   const emailRef = useRef(null);
//   const errRef = useRef(null);

//   const [validName, setValidName] = useState(false);
//   const [userFocus, setUserFocus] = useState(false);
//   const [lastNameFocus, setLastNameFocus] = useState(false);
//   const [emailFocus, setEmailFocus] = useState(false);

//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [email, setEmail] = useState('');
//   const [validEmail, setValidEmail] = useState(false);

//   const [pwd, setPwd] = useState('');
//   const [validPwd, setValidPwd] = useState(false);
//   const [pwdFocus, setPwdFocus] = useState(false);

//   const [matchPwd, setMatchPwd] = useState('');
//   const [validMatch, setValidMatch] = useState(false);
//   const [matchFocus, setMatchFocus] = useState(false);

//   const [role, setRole] = useState('USER');

//   const [errMsg, setErrMsg] = useState('');
//   const [success, setSuccess] = useState(false);

//   useEffect(() => {
//     if (userRef.current) userRef.current.focus();
//   }, []);

//   useEffect(() => {
//     setValidName(USER_REGEX.test(firstName));
//   }, [firstName]);

//   useEffect(() => {
//     setValidName(USERLASTNAME_REGEX.test(lastName));
//   }, [lastName]);

//   useEffect(() => {
//     setValidEmail(EMAIL_REGEX.test(email));
//   }, [email]);

//   useEffect(() => {
//     setValidPwd(PWD_REGEX.test(pwd));
//     setValidMatch(pwd === matchPwd);
//   }, [pwd, matchPwd]);

//   useEffect(() => {
//     setErrMsg('');
//   }, [firstName, lastName, email, pwd, matchPwd]);

//   const [customMessage, setCustomMessage] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const v1 = USER_REGEX.test(firstName);
//     const v2 = PWD_REGEX.test(pwd);
//     if (!v1 || !v2) {
//       setErrMsg("Invalid Entry");
//       return;
//     }

//     try {
//       // const response = await axios.post(REGISTER_URL,
//       //   JSON.stringify({ firstName, lastName, email, password: pwd, role: "USER" }),
//       //   {
//       //     headers: { 'Content-Type': 'application/json' },
//       //     withCredentials: true
//       //   }
//       // );
//       setSuccess(true);

//       setFirstName('');
//       setLastName('');
//       setEmail('');
//       setPwd('');
//       setMatchPwd('');
//       setRole('USER');

//       setCustomMessage('Registration successful! Redirecting to login page...');
//       setTimeout(() => {
//         window.location.href = '/login';
//       }, 2000);
//     } catch (err) {
//       console.error(err);
//       // if (!err?.response) {
//       //   setErrMsg('No Server Response');
//       // } else if (err.response?.status === 409) {
//       //   setErrMsg('Username Taken');
//       // } else {
//       //   setErrMsg('Registration Failed');
//       // }
//       if (errRef.current) errRef.current.focus();
//     }
//   };
//   return (
//     <>
//       <div className="Reg">
//         {customMessage ? (
//           <section className="sectionReg">
//             <h1>{customMessage}</h1>
//           </section>
//         ) : (
//           <div className="RegContainer">
//             <div className="LogoWrapper">
//               <Link to={"/register"}>
//                 <div style={{display:"flex", alignItems:"center", textDecoration:"none"}}>
//                   <FaFingerprint />
//                   <div style={{color:"black", border:"none", textDecoration:"none"}}>Cash Coach</div>
//                 </div>
//               </Link>
              
//             </div>
//             <section className="sectionReg">
//               <p
//                 ref={errRef}
//                 className={errMsg ? "errmsg" : "offscreen"}
//                 aria-live="assertive"
//               >
//                 {errMsg}
//               </p>
//               <h3>Create an account</h3>
//               <div style={{display:"flex", fontSize:"15px", justifyContent:"center"}}>Chart Your Financial Journey</div>
//               <form  className="formReg">
                
//                 <label htmlFor="lastname" className="RegLabel">
//                   Username:
//                   {
//                     lastNameFocus && (
//                       <>
//                           <FontAwesomeIcon
//                           icon={faCheck}
//                           className={lastName && validName ? "valid" : "hide"}
//                         />
//                         <FontAwesomeIcon
//                           icon={faTimes}
//                           className={!lastName && !validName ? "invalid" : "hide"}
//                         />
//                       </>
//                     )
//                   }
                  
//                 </label>
//                 <input
//                   className="inputReg"
//                   type="text"
//                   id="lastname"
//                   ref={lastNameRef}
//                   autoComplete="off"
//                   onChange={(e) => setLastName(e.target.value)}
//                   value={lastName}
//                   onFocus={() => setLastNameFocus(true)}
//                   onBlur={() => setLastNameFocus(false)}
//                   required
//                 />

//                 <label htmlFor="email" className="RegLabel">
//                   Email:
//                   {
//                     emailFocus &&(
//                       <>
//                       <FontAwesomeIcon
//                         icon={faCheck}
//                         className={validEmail ? "valid" : "hide"}
//                       />
//                       <FontAwesomeIcon
//                         icon={faTimes}
//                         className={!validEmail ? "invalid" : "hide"}
//                       />
//                     </>
//                     )

//                   }
//                 </label>
//                 <input
//                   className="inputReg"
//                   type="email"
//                   id="email"
//                   ref={emailRef}
//                   autoComplete="off"
//                   onChange={(e) => setEmail(e.target.value)}
//                   value={email}
//                   required
//                   aria-invalid={!validEmail ? "true" : "false"}
//                   aria-describedby="emailnote"
//                   onFocus={() => setEmailFocus(true)}
//                   onBlur={() => setEmailFocus(false)}
//                 />
//                 <p
//                   id="emailnote"
//                   className={!validEmail ? "instructions" : "offscreen"}
//                 >
//                   <FontAwesomeIcon />
//                   Please enter a valid email address.
//                 </p>
//                 <label htmlFor="password" className="RegLabel">
//                     Password:
//                     <FontAwesomeIcon className={validPwd ? "valid" : "hide"} />
//                     <FontAwesomeIcon  className={validPwd || !pwd ? "hide" : "invalid"} />
//                 </label>
//                 <input
//                 className="inputReg"
//                     type="password"
//                     id="password"
//                     onChange={(e) => setPwd(e.target.value)}
//                     value={pwd}
//                     required
//                     aria-invalid={validPwd ? "false" : "true"}
//                     aria-describedby="pwdnote"
//                     onFocus={() => setPwdFocus(true)}
//                     onBlur={() => setPwdFocus(false)}
//                 />
//                 <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
//                     <FontAwesomeIcon  />
//                     8 to 24 characters.<br />
//                     Must include uppercase and lowercase letters, a number and a special character.<br />
//                     Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
//                 </p>

//                 <label htmlFor="confirm_pwd" className="RegLabel">
//                     Confirm Password:
//                     <FontAwesomeIcon  className={validMatch && matchPwd ? "valid" : "hide"} />
//                     <FontAwesomeIcon className={validMatch || !matchPwd ? "hide" : "invalid"} />
//                 </label>
//                 <input
//                 className="inputReg"
//                     type="password"
//                     id="confirm_pwd"
//                     onChange={(e) => setMatchPwd(e.target.value)}
//                     value={matchPwd}
//                     required
//                     aria-invalid={validMatch ? "false" : "true"}
//                     aria-describedby="confirmnote"
//                     onFocus={() => setMatchFocus(true)}
//                     onBlur={() => setMatchFocus(false)}
//                 />
//                 <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
//                     <FontAwesomeIcon  />
//                     Must match the first password input field.
//                 </p>


//                 <button
//                   disabled={ !validEmail || !validPwd || !validMatch}
//                   className="buttonReg"
//                   type="submit"
//                 >
//                   Sign Up
//                 </button>
//               </form>
//               <p className="suggest">
//                 Already registered?
//                 <span className="line">
//                   <Link to="/login">Sign in</Link>
//                 </span>
//               </p>
//             </section>
//           </div>
//         )}
//         <div className="ImgContainer">
//           <img src="/finance.svg" className="RegImage" />
//         </div>
//       </div>
//     </>
//   );
// };

// export default Register;


import React, { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { FaFingerprint } from "react-icons/fa";
import '../../../styles/reg.css';
import axios from '../../../api/axios';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Register = () => {
  const userRef = useRef(null);
  const emailRef = useRef(null);
  const errRef = useRef(null);

  const [username, setUsername] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [role, setRole] = useState('USER');

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  const [customMessage, setCustomMessage] = useState('');

  useEffect(() => {
    if (userRef.current) userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg('');
  }, [username, email, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const v1 = USER_REGEX.test(username);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }

    try {
      const response = await axios.post('/auth/register/', {
        username,
        email,
        password1: pwd,
        password2: matchPwd,
      });
      console.log(response);

      setSuccess(true);

      setUsername('');
      setEmail('');
      setPwd('');
      setMatchPwd('');

      setCustomMessage('Registration successful! Redirecting to login page...');
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    } catch (err) {
      console.error(err);
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 409) {
        setErrMsg('Username Taken');
      } else {
        setErrMsg('Registration Failed');
      }
      if (errRef.current) errRef.current.focus();
    }
  };


  return (
    <>
      <div className="Reg">
        {customMessage ? (
          <section className="sectionReg">
            <h1>{customMessage}</h1>
          </section>
        ) : (
          <div className="RegContainer">
            <div className="LogoWrapper">
              <Link to={"/register"}>
                <div style={{display:"flex", alignItems:"center", textDecoration:"none"}}>
                  <FaFingerprint />
                  <div style={{color:"black", border:"none", textDecoration:"none"}}>Cash Coach</div>
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
              <h3>Create an account</h3>
              <div style={{display:"flex", fontSize:"15px", justifyContent:"center"}}>Chart Your Financial Journey</div>
              <form onSubmit={handleSubmit} className="formReg">
                <label htmlFor="username" className="RegLabel">
                  Username:
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={validName ? "valid" : "hide"}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={validName || !username ? "hide" : "invalid"}
                  />
                </label>
                <input
                  className="inputReg"
                  type="text"
                  id="username"
                  ref={userRef}
                  autoComplete="off"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  onFocus={() => setUserFocus(true)}
                  onBlur={() => setUserFocus(false)}
                  required
                />

                <label htmlFor="email" className="RegLabel">
                  Email:
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={validEmail ? "valid" : "hide"}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={validEmail || !email ? "hide" : "invalid"}
                  />
                </label>
                <input
                  className="inputReg"
                  type="email"
                  id="email"
                  ref={emailRef}
                  autoComplete="off"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                  aria-invalid={!validEmail ? "true" : "false"}
                  aria-describedby="emailnote"
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => setEmailFocus(false)}
                />
                <p
                  id="emailnote"
                  className={emailFocus && !validEmail ? "instructions" : "offscreen"}
                >
                  <FontAwesomeIcon />
                  Please enter a valid email address.
                </p>

                <label htmlFor="password" className="RegLabel">
                  Password:
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={validPwd ? "valid" : "hide"}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={validPwd || !pwd ? "hide" : "invalid"}
                  />
                </label>
                <input
                  className="inputReg"
                  type="password"
                  id="password"
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                  required
                  aria-invalid={validPwd ? "false" : "true"}
                  aria-describedby="pwdnote"
                  onFocus={() => setPwdFocus(true)}
                  onBlur={() => setPwdFocus(false)}
                />
                <p
                  id="pwdnote"
                  className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
                >
                  <FontAwesomeIcon />
                  8 to 24 characters.<br />
                  Must include uppercase and lowercase letters, a number and a special character.<br />
                  Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                </p>

                <label htmlFor="confirm_pwd" className="RegLabel">
                  Confirm Password:
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={validMatch && matchPwd ? "valid" : "hide"}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={validMatch || !matchPwd ? "hide" : "invalid"}
                  />
                </label>
                <input
                  className="inputReg"
                  type="password"
                  id="confirm_pwd"
                  onChange={(e) => setMatchPwd(e.target.value)}
                  value={matchPwd}
                  required
                  aria-invalid={validMatch ? "false" : "true"}
                  aria-describedby="confirmnote"
                  onFocus={() => setMatchFocus(true)}
                  onBlur={() => setMatchFocus(false)}
                />
                <p
                  id="confirmnote"
                  className={matchFocus && !validMatch ? "instructions" : "offscreen"}
                >
                  <FontAwesomeIcon />
                  Must match the first password input field.
                </p>

                <button
                  disabled={!validName || !validEmail || !validPwd || !validMatch}
                  className="buttonReg"
                  type="submit"
                >
                  Sign Up
                </button>
              </form>
              <p className="suggest">
                Already registered?
                <span className="line">
                  <Link to="/login">Sign in</Link>
                </span>
              </p>
            </section>
          </div>
        )}
        <div className="ImgContainer">
          <img src="/finance.svg" className="RegImage" />
        </div>
      </div>
    </>
  );
};

export default Register;
