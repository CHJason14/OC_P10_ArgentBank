import React from 'react'
import '../styles/style.css'
import Account from '../components/Account'
import { useDispatch, useSelector } from "react-redux";

export default function User() {

  const storageToken = sessionStorage.getItem("tokens");
  const dispatch = useDispatch();
  const status = useSelector((state) => state.infoUser);

  fetch('http://localhost:3001/api/v1/user/profile', {
    headers: {
      "Authorization": 'Bearer ' + storageToken,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "http://localhost:3001/",
    },
    mode: "cors",
    method: "POST",
  })
  .then((res) => res.json())
  .then((infoClient) => {
    dispatch({
      type: 'infoUser/changeName',
      payload: {firstName: infoClient.body.firstName, lastName: infoClient.body.lastName},
    });
    console.log(status);
      })
  .catch((err) => console.log(err));

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>Welcome back<br />{status.firstName + " " + status.lastName + " "}!</h1>
        <button className="edit-button">Edit Name</button>
      </div>
      <h2 className="sr-only">Accounts</h2>
      <Account accountNumber="Argent Bank Checking (x8349)" amount="$2,082.79" description="Available Balance" />
      <Account accountNumber="Argent Bank Savings (x6712)" amount="$10,928.42" description="Available Balance" />
      <Account accountNumber="Argent Bank Credit Card (x8349)" amount="$184.30" description="Available Balance" />
      
    </main>
  )
}
