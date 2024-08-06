import React, { useEffect} from 'react'
import '../styles/style.css'
import LogoBanque from '../assets/argentBankLogo_200x54_1.webp'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";

export default function NavBar() {

  const dispatch = useDispatch();
  const status = useSelector((state) => state.infoUser);

  useEffect(() => {
    const handleClick = (e) => {
      sessionStorage.clear();
      dispatch({
        type: 'infoUser/changeStatus',
        payload: false,
      });
    };
  
    const mainNavItem = document.querySelector('.item2');
    if (mainNavItem) {
      mainNavItem.addEventListener('click', handleClick);
    }
  
    return () => {
      if (mainNavItem) {
        mainNavItem.removeEventListener('click', handleClick);
      }
    };
  }, [dispatch, status]);

  return (
    <nav className="main-nav">
      <Link to={"/"} className="main-nav-logo"> 
        <img
          className="main-nav-logo-image"
          src={LogoBanque}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
          <Link to={"/User"} className="main-nav-item item1">
            <i className={`${status.connected ? 'fa fa-user-circle' : ''}`}/>
            {status.connected ? status.userName : ""}
          </Link>
          <Link to={"/SignIn"} className="main-nav-item item2">
            <i className={`fa ${status.connected ? 'fa-sign-out' : 'fa-user-circle'}`}/>
            {status.content}
          </Link>
      </div>
    </nav>
  )
}
