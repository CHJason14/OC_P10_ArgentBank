import React, {useEffect} from 'react'
import '../styles/style.css'
import Account from '../components/Account'
import { useSelector, useDispatch } from 'react-redux';
import Button from '../components/Button';
import CollectInfoUser from '../components/CollectInfoUser';
import { Navigate } from 'react-router-dom';

export default function User() {

  const dispatch = useDispatch();
  const status = useSelector((state) => state.infoUser);
  const displayForm = useSelector((state) => state.editUserNameForm);

  const handleEditNameClick = () => {
    dispatch({
      type: 'editUserNameForm/changeForm',
      payload: {open : true},
    });
  };

  useEffect(() => {
    console.log('displayForm.open:', displayForm.open);
    console.log('Username:', status.userName);
  }, [displayForm, status]);

  const handleSaveClick = () => {
    const userName = document.querySelector('#userName').value;
    dispatch({
      type: 'infoUser/changeName',
      payload: { userName: userName },
    });

    const storageToken = sessionStorage.getItem("tokens");
    const usernameToSend = {
      userName : userName
    }

    fetch('http://localhost:3001/api/v1/user/profile', {
      headers: {
        "Authorization": 'Bearer ' + storageToken,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:3001/",
      },
      mode: "cors",
      method: "PUT",
      body: JSON.stringify(usernameToSend),
    })
    .catch((err) => console.log(err));

    dispatch({
      type: 'editUserNameForm/changeForm',
      payload: {open : false},
    });
  };

  const handleCancelClick = () => {
    dispatch({
      type: 'editUserNameForm/changeForm',
      payload: {open : false},
    });
  };

  CollectInfoUser();

  const storageToken = sessionStorage.getItem("tokens");

  if (storageToken) {
  return (
    <main className="main bg-dark">
      <div className="header">
        {displayForm.open && ( 
          <h1>Edit user info</h1>
         )}
        {!displayForm.open && (
          <h1>Welcome back<br />{status.firstName + " " + status.lastName + " "}!</h1>
        )}
        <div className='form-content'>
          {displayForm.open && (
              <form className="edit-form">
                <div className='form-component'>
                  <label htmlFor="userName">User Name:</label>
                  <input type="text" id="userName" defaultValue={status.userName} />
                </div>
                <div className='form-component'>
                  <label htmlFor="firstName">First Name:</label>
                  <input type="text" id="firstName" defaultValue={status.firstName} disabled="disabled"/>
                </div>
                <div className='form-component'>
                  <label htmlFor="lastName">Last Name:</label>
                  <input type="text" id="lastName" defaultValue={status.lastName} disabled="disabled"/>
                </div>
                <div className="btn-container">
                  <Button classname='edit-button' content='Save' id='Save' action={handleSaveClick} />
                  <Button classname='edit-button' content='Cancel' id='Cancel' action={handleCancelClick} />
                </div>
              </form>
            )}
          </div>
          {!displayForm.open && (
            <Button classname='edit-button' content='Edit Name' id='EditName' action={handleEditNameClick} />
          )}
      </div>
      <h2 className="sr-only">Accounts</h2>
      <Account accountNumber="Argent Bank Checking (x8349)" amount="$2,082.79" description="Available Balance" />
      <Account accountNumber="Argent Bank Savings (x6712)" amount="$10,928.42" description="Available Balance" />
      <Account accountNumber="Argent Bank Credit Card (x8349)" amount="$184.30" description="Available Balance" />
      
    </main>
    )
  } else {
    return (
      <Navigate to="/SignIn" />
    )
  }
}
