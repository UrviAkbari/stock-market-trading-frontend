/* eslint-disable jsx-a11y/anchor-is-valid */

import React from "react";

import logoLightSvg from "../../assets/images/logo-light.svg";

import Avatar from "../../assets/images/avatar-1.jpg";

// alert
import {warning} from "../../util/Alert";

// redux
import {useDispatch, useSelector} from "react-redux";

//react-router-dom
import {Link} from "react-router-dom";

// types
import {UNSET_USER} from "../../store/user/types";

//server path
import {baseURL} from "../../util/Config";

const Navbar = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);

  const handleLogout = () => {
    const data = warning();
    data.then((isLogout) => {
      if (isLogout) {
        dispatch({type: UNSET_USER});
        window.location.href = "/";
      }
    });
  };

  return (
    <>
      <header id="page-topbar">
        <div className="navbar-header">
          <div className="d-flex">
            <div className="navbar-brand-box">
              <Link to="/user/dashboard" className="logo logo-light">
                <span className="logo-sm">
                  <img
                    src={logoLightSvg}
                    alt=""
                    height="22"
                    draggable="false"
                  />
                </span>
                <span
                  className="logo-lg"
                  style={{
                    fontSize: "18px",
                    color: "#fff",
                    letterSpacing: "1px",
                    fontWeight: 600,
                  }}
                >
                  STOCK MARKET
                </span>
              </Link>
            </div>

            <button
              type="button"
              className="btn btn-sm px-3 font-size-16 header-item waves-effect"
              id="vertical-menu-btn"
            >
              <i className="fa fa-fw fa-bars"></i>
            </button>
          </div>

          <div className="d-flex">
            <div className="dropdown d-inline-block">
              <button
                type="button"
                className="btn header-item waves-effect"
                id="page-header-user-dropdown"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <img
                  className="rounded-circle header-profile-user"
                  src={user ? baseURL + user.image : Avatar}
                  alt="Header Avatar"
                />
                <span className="d-none d-xl-inline-block ms-1" key="t-henry">
                  {user?.name}
                </span>
                <i className="mdi mdi-chevron-down d-none d-xl-inline-block"></i>
              </button>
              <div className="dropdown-menu dropdown-menu-end">
                <Link to="/user/profile">
                  <a className="dropdown-item">
                    <i className="bx bx-user font-size-16 align-middle me-1"></i>
                    <span key="t-profile">Profile</span>
                  </a>
                </Link>

                {/* <a className="dropdown-item d-block" href={() => false}>
                  <i className="bx bx-wrench font-size-16 align-middle me-1"></i>
                  <span key="t-settings">Settings</span>
                </a> */}
                {/* <a className="dropdown-item" href={() => false}>
                  <i className="bx bx-lock-open font-size-16 align-middle me-1"></i>
                  <span key="t-lock-screen">Lock screen</span>
                </a> */}
                <div className="dropdown-divider"></div>
                <a
                  className="dropdown-item text-danger cursor-pointer"
                  onClick={handleLogout}
                >
                  <i className="bx bx-power-off font-size-16 align-middle me-1 text-danger"></i>
                  <span key="t-logout">Logout</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
