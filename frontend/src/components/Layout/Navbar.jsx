import React, { useContext, useState } from 'react';
import { Context } from '../..';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { GiHamburgerMenu } from 'react-icons/gi';
import logo1 from "../../assests/logo.jpg";
import { BASE_URL } from '../../header';

function Navbar() {
    const [show, setShow] = useState(false);
    const { isAuthorized, setIsAuthorized, user } = useContext(Context);
    const navigateTo = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/user/logout`, { withCredentials: true });
            toast.success(response.data.message);
            setIsAuthorized(false);
            navigateTo("/login");
        } catch (error) {
            toast.error(error.response.data.message);
            setIsAuthorized(true);
        }
    }

    const [isMenuOpen, setIsMenuOpen] = React.useState(false)

    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen)
    }
    const currentPath = window.location.pathname;
    console.log(currentPath);

    return(
      <nav className={isAuthorized ? "navbarShow" : "navbarHide"}>
      <div className="container">
        <div className="logo">
          <img src={logo1} alt="logo" />
        </div>
        <ul className={!show ? "menu" : "show-menu menu"}>
          <li>
            <Link to={"/"} onClick={() => setShow(false)}>
              HOME
            </Link>
          </li>
          <li>
            <Link to={"/job/getall"} onClick={() => setShow(false)}>
              ALL JOBS
            </Link>
          </li>
          <li>
            <Link to={"/applications/me"} onClick={() => setShow(false)}>
              {user && user.role === "Employer"
                ? "APPLICANT'S APPLICATIONS"
                : "MY APPLICATIONS"}
            </Link>
          </li>
          {user && user.role === "Employer" ? (
            <>
              <li>
                <Link to={"/job/post"} onClick={() => setShow(false)}>
                  POST NEW JOB
                </Link>
              </li>
              <li>
                <Link to={"/job/me"} onClick={() => setShow(false)}>
                  VIEW YOUR JOBS
                </Link>
              </li>
            </>
          ) : (
            <></>
          )}

          <button onClick={handleLogout}>LOGOUT</button>
        </ul>
        <div className="hamburger">
         {show? <X onClick={() => setShow(!show)} /> : <GiHamburgerMenu onClick={() => setShow(!show)} />}
        </div>
      </div>
    </nav>
  );
};
  
export default Navbar;
