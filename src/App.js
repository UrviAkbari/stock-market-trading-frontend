import React, {Suspense, useEffect} from "react";

//react-router-dom
import {BrowserRouter, Route, Routes} from "react-router-dom";

//redux
import {useDispatch, useSelector} from "react-redux";

//types
import {SET_USER, UNSET_USER} from "./store/user/types";

import {IdleTimeoutManager} from "idle-timer-manager";

//css
import "./assets/css/bootstrap.min.css";
import "./assets/css/icons.min.css";
import "./assets/css/app.min.css";

//js
import "./assets/libs/jquery/jquery.min.js";
import "./assets/libs/bootstrap/js/bootstrap.bundle.min.js";
import "./assets/libs/metismenu/metisMenu.min.js";
import Toggle from "./assets/js/main.js";

//pages
import Admin from "./Pages/Admin";
import Profile from "./Pages/Profile";
import Page404 from "./Pages/404";
import Login from "./Pages/Login";
import Registration from "./Pages/Registration";

//component
import TransactionHistory from "./Component/Table/TransactionHistory";
import Dashboard from "./Pages/Dashboard";

function App() {
  const dispatch = useDispatch();
  const {isAuth} = useSelector((state) => state.user);
  const token = localStorage.getItem("TOKEN");

  const key = localStorage.getItem("KEY");

  useEffect(() => {
    if (!token && !key) return;
    dispatch({type: SET_USER, payload: token});
  }, [token, key]);

  useEffect(() => {
    const manager = new IdleTimeoutManager({
      timeout: 1800, //30 min (in sec)
      onExpired: (time) => {
        dispatch({type: UNSET_USER});
        return (window.location.href = "/");
      },
    });

    return () => {
      manager.clear();
    }; //eslint-disable-next-line
  }, []);

  useEffect(() => {
    Toggle();
  }, []);

  return (
    <div className="App">
      <Suspense fallback={""}>
        <BrowserRouter>
          <Routes>
            <Route path="/registration" element={<Registration />} />
            <Route path="/" element={!isAuth ? <Login /> : <Admin />} />

            <Route path="/user" element={isAuth ? <Admin /> : <Login />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="transaction" element={<TransactionHistory />} />
              <Route path="profile" element={<Profile />} />
            </Route>

            <Route path="/*" element={<Page404 />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
