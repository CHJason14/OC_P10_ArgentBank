import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import '../styles/style.css';

export default function Form() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const OnSubmit = (e) => {
    e.preventDefault();
    const connect = {
      email: email,
      password: password,
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
      navigate('/User');
      dispatch({
        type: 'infoUser/changeStatus',
        payload: true,
      });
    })
    .catch((err) => {
      console.log(err);
      alert("Les identifiants sont incorrects !");
    });
  };

  return (
    <section className="sign-in-content">
      <form id='formlogin' onSubmit={OnSubmit}>
        <div className="input-wrapper">
          <label htmlFor="username">Username</label>
          <input 
            type="text" 
            id="username" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
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