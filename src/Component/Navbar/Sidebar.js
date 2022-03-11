/* eslint-disable jsx-a11y/anchor-is-valid */

import React from "react";

// types
import {UNSET_USER} from "../../store/user/types";

// redux
import {useDispatch} from "react-redux";

//react-router-dom
import {NavLink as Link} from "react-router-dom";

// alert
import {warning} from "../../util/Alert";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  navLink: {
    "&.active": {
      color: "#fff !important",
      fontWeight: 500,
      fontSize: 16,
    },
    "&.active i": {
      color: "#fff !important",
      fontWeight: 500,
    },
  },
}));

const Sidebar = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

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
    <div className="vertical-menu">
      <div data-simplebar className="h-100">
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li className="menu-title" key="t-menu">
              Menu
            </li>

            <li>
              <Link
                to="/user/dashboard"
                className={`waves-effect ${classes.navLink}`}
              >
                <i className="bx bx-home-circle"></i>
                <span key="t-dashboards">Dashboards</span>
              </Link>
            </li>

            <li>
              <Link
                to="/user/transaction"
                className={` waves-effect ${classes.navLink}`}
              >
                <i className="bx  bx-notepad  align-middle"></i>
                <span key="t-dashboards">Transaction History</span>
              </Link>
            </li>

            <li>
              <Link
                to="/user/profile"
                className={`waves-effect ${classes.navLink}`}
              >
                <i className="bx bx-user  align-middle"></i>
                <span key="t-dashboards">Profile</span>
              </Link>
            </li>

            <li>
              <a className="waves-effect" onClick={handleLogout}>
                <i className="bx bx-power-off  align-middle me-1 "></i>
                <span key="t-logout">Logout</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
