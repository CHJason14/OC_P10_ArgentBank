import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch} from "react-redux";
import '../styles/style.css';

export default function Form() {
  const dispatch = useDispatch();
    const emailRef = useRef(null);
    const pwdRef = useRef(null);
    const formRef = useRef(null);
    const navigate = useNavigate();
  
    useEffect(() => {
      const form = formRef.current;
      if (form) {
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          const emailcontent = emailRef.current.value;
          const pwdcontent = pwdRef.current.value;
          const connect = {
            email: emailcontent,
            password: pwdcontent,
          };
          fetch('http://localhost:3001/api/v1/user/login', {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "http://localhost:3001/",
            },
            mode: "cors",
            method: "POST",
            body: JSON.stringify(connect),
          })
          .then((res) => res.json())
          .then((login) => {
            const token = login.body.token;
            sessionStorage.setItem("tokens", token);
            if (token) {
              navigate('/User');
              dispatch({
                type: 'infoUser/changeStatus',
                payload: true,
              });
            } else {
              alert("Adresse mail ou mot de passe incorrect");
            }
          })
          .catch((err) => console.log(err));
        });
      }
    }, [dispatch, navigate]);



  return (
    <section className="sign-in-content">
      <form id='formlogin' ref={formRef} >
        <div className="input-wrapper">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" ref={emailRef}/>
        </div>
        <div className="input-wrapper">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" ref={pwdRef} />
        </div>
        <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
        </div>
        <input type="submit" className="sign-in-button" value="Sign In"/>
      </form>
    </section>
  );
}