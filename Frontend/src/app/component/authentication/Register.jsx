import React, { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { FaFingerprint } from "react-icons/fa";
import styles from '../../../styles/reg.module.css';
import axios from '../../../api/axios';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Register = () => {

  const [loading, setLoading] = useState(false);

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);

  const userNameRef=useRef(null);

  const [userNameFocus, setUserNameFocus] = useState(false);
  const [lastNameFocus, setLastNameFocus] = useState(false);

 
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
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
  }, [username, email, pwd, matchPwd, first_name,last_name]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const v1 = USER_REGEX.test(username);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post('/auth/register/', {
        first_name,
        last_name,
        username,
        email,
        
        password1: pwd,
        password2: matchPwd,
      });
      console.log(response);

      setSuccess(true);
      setFirstName('')
      setLastName('')
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
    finally {
      setLoading(false); // Reset loading to false after submission is complete
    }
  };


  return (
       <div className={styles.cover}>
        {customMessage ? (
          <section >
            <h2 className={styles.success}>{customMessage}</h2>
          </section>
        ) : (
<div className={styles.Reg}>
         <div className={styles.LogoWrapper}>
          <Link to={"/"}>
            <div>
              <FaFingerprint />
              <span>Cash Coach</span>
            </div>
          </Link>
        </div>
        <div className={styles.RegContainer}>
        <section className={styles.sectionReg}>
                        <p
                            className={errMsg ? styles.errmsg : styles.offscreen}
                            aria-live="assertive"
                        >
                            {errMsg}
                        </p>
            <div className={styles.name}>Create An Account</div>
            <form className={styles.formReg} onSubmit={handleSubmit}>

          <div style={{width:"100%"}}> 
          <label className={styles.regLabel}>
          First Name:
          {userFocus && (
              <>
              <FontAwesomeIcon
                  icon={faCheck}
                  className={first_name && validName ? styles.valid : styles.hide}
              />
              <FontAwesomeIcon
                  icon={faTimes}
                  className={!first_name && !validName ? styles.invalid : styles.hide}
              />
              </>
          )}
          </label>
          <input
          className={styles.inputReg}
          type="text"
          name='first_name'
          id="first_name"
          ref={firstNameRef}
          autoComplete="off"
          onChange={(e) => setFirstName(e.target.value)}
          value={first_name}
          onFocus={() => setUserFocus(true)}
          onBlur={() => setUserFocus(false)}
          required
          />
          </div>
          <div style={{width:"100%"}}>
          <label htmlFor="lastname" className={styles.regLabel}>
          Last Name:
          {lastNameFocus && (
              <>
              <FontAwesomeIcon
                  icon={faCheck}
                  className={last_name && validName ? styles.valid : styles.hide}
              />
              <FontAwesomeIcon
                  icon={faTimes}
                  className={!last_name && !validName ? styles.invalid : styles.hide}
              />
              </>
          )}
          </label>
          <input
          className={styles.inputReg}
          type="text"
          id="last_name"
          name='last_name'
          ref={lastNameRef}
          autoComplete="off"
          onChange={(e) => setLastName(e.target.value)}
          value={last_name}
          onFocus={() => setLastNameFocus(true)}
          onBlur={() => setLastNameFocus(false)}
          required
          />
          </div>

          <div style={{width:"100%"}}>
          <label  className={styles.regLabel}>Username:  
          {userNameFocus && (
              <>
              <FontAwesomeIcon
                  icon={faCheck}
                  className={username && validName ? styles.valid : styles.hide}
              />
              <FontAwesomeIcon
                  icon={faTimes}
                  className={!username && !validName ? styles.invalid : styles.hide}
              />
              </>
          )}
          </label>
        <input
            className={styles.inputReg}
            type="text"
            id="username"
            autoComplete="off"
            name="username"
            required
            ref={userNameRef}
            value={username}
            onFocus={() => setUserNameFocus(true)}
            onBlur={() => setUserNameFocus(false)}
            onChange={(e) => setUsername(e.target.value)}
           
        />
    </div>
    <div style={{width:"100%"}}>
          <label htmlFor="email" className={styles.regLabel}>
          Email:
          {emailFocus && (
              <>
              <FontAwesomeIcon
                  icon={faCheck}
                  className={validEmail ? styles.valid : styles.hide}
              />
              <FontAwesomeIcon
                  icon={faTimes}
                  className={!validEmail ? styles.invalid : styles.hide}
              />
              </>
          )}
          </label>
          <input
          className={styles.inputReg}
          type="email"
          id="email"
          ref={emailRef}
          autoComplete="off"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          name='email'
          required
          aria-invalid={!validEmail ? "true" : "false"}
          aria-describedby="emailnote"
          onFocus={() => setEmailFocus(true)}
          onBlur={() => setEmailFocus(false)}
          />
          <p
          id="emailnote"
          className={!validEmail ? styles.instructions : styles.offscreen}
          >
          <FontAwesomeIcon icon={faInfoCircle} />
          Please enter a valid email address.
          </p>

          </div>
          <div style={{width:"100%"}}>
          <label htmlFor="password" className={styles.regLabel}>
          Password:
          <FontAwesomeIcon icon={faCheck} className={validPwd ? styles.valid : styles.hide} />
          <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? styles.hide : styles.invalid} />
          </label>
          <input
          className={styles.inputReg}
          type="password"
          id="password1"
          name='password1'
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
          required
          aria-invalid={validPwd ? "false" : "true"}
          aria-describedby="pwdnote"
          onFocus={() => setPwdFocus(true)}
          onBlur={() => setPwdFocus(false)}
          />
          <p id="pwdnote" className={pwdFocus && !validPwd ? styles.instructions : styles.offscreen}>
          <FontAwesomeIcon icon={faInfoCircle} />
          8 to 24 characters.<br />
          Must include uppercase and lowercase letters, a number and a special character.<br />
          Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
          </p>
          </div>
          <div style={{width:"100%"}}>
          <label htmlFor="confirm_pwd" className={styles.regLabel}>
          Confirm Password:
          <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? styles.valid : styles.hide} />
          <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? styles.hide : styles.invalid} />
          </label>
          <input
          className={styles.inputReg}
          type="password"
          id="password2"
          name="password2"
          onChange={(e) => setMatchPwd(e.target.value)}
          value={matchPwd}
          required
          aria-invalid={validMatch ? "false" : "true"}
          aria-describedby="confirmnote"
          onFocus={() => setMatchFocus(true)}
          onBlur={() => setMatchFocus(false)}
          />
          <p id="confirmnote" className={matchFocus && !validMatch ? styles.instructions : styles.offscreen}>
          <FontAwesomeIcon icon={faInfoCircle} />
          Must match the first password input field.
          </p>
          </div>
          <button type="submit" className={styles.buttonReg} disabled={loading}>
            {loading ? 'Registering...' : 'Sign Up'}
          </button>

                <div>
                Already registered?
                <span>
                    <Link to="/login">Sign in</Link>
                </span>
            </div>
            </form>
        </section>
        </div>
      </div>
        )}
       
      </div>
  
  );
};

export default Register;
