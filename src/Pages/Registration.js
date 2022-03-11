/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-useless-escape */

import React, {useState} from "react";

//routing
import {Link} from "react-router-dom";

//redux
import {connect} from "react-redux";

//action
import {register} from "../store/user/action";

//form validation
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from "yup";

//Image
import logo from "../assets/images/logo.svg";
import ProfileImage from "../assets/images/profile-img.png";

const Registration = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const onSubmit = (values) => {
    props.register(values);
  };

  //form valiadtion rules
  const validation = Yup.object().shape({
    name: Yup.string().required("Name is Required!"),
    userName: Yup.string()
      .required("User Name is Required!")
      .matches(
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.*[comgvinrgnet]{2,3})+$/,
        "You have entered an invalid user name!"
      ),
    password: Yup.string()
      .min(8, "Password should be have minimum 8 characters!")
      .max(15, "Password should be have maximum 15 characters!")
      .required("Password is Reuired")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,15}$/,
        "Paasword Should be contain at least one Uppercase Character, 1 number or spcial charater in @#$*"
      ),
  });

  const formOptions = {resolver: yupResolver(validation)};

  const {register, handleSubmit, formState} = useForm(formOptions);
  const {errors} = formState;

  return (
    <>
      <div className="account-pages my-5 pt-sm-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6 col-xl-5">
              <div className="card overflow-hidden">
                <div className="bg-primary bg-soft">
                  <div className="row">
                    <div className="col-7">
                      <div className="text-primary p-4">
                        <h5 className="text-primary">Welcome Back !</h5>
                        <p>Registration in StockMarket.</p>
                      </div>
                    </div>
                    <div className="col-5 align-self-end">
                      <img
                        src={ProfileImage}
                        alt=""
                        className="img-fluid"
                        draggable={false}
                      />
                    </div>
                  </div>
                </div>
                <div className="card-body pt-0">
                  <div className="auth-logo">
                    <a className="auth-logo-light">
                      <div className="avatar-md profile-user-wid mb-4">
                        <span className="avatar-title rounded-circle bg-light">
                          <img
                            src="assets/images/logo-light.svg"
                            alt=""
                            className="rounded-circle"
                            height="34"
                            draggable={false}
                          />
                        </span>
                      </div>
                    </a>

                    <a className="auth-logo-dark">
                      <div className="avatar-md profile-user-wid ">
                        <span className="avatar-title rounded-circle bg-light">
                          <img
                            src={logo}
                            alt=""
                            className="rounded-circle"
                            height="34"
                          />
                        </span>
                      </div>
                    </a>
                  </div>

                  <div className="p-2">
                    <form
                      className="form-horizontal"
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <div className="mb-3">
                        <label for="username" className="form-label">
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          placeholder="Enter name"
                          value={name}
                          {...register("name")}
                          className={`form-control  ${
                            errors.name ? "is-invalid" : ""
                          }`}
                          onChange={(e) => {
                            setName(e.target.value);
                          }}
                        />
                        <div className="invalid-feedback">
                          {errors.name?.message}
                        </div>
                      </div>
                      <div className="mb-3">
                        <label for="username" className="form-label">
                          Username
                        </label>
                        <input
                          type="text"
                          id="username"
                          name="username"
                          placeholder="Enter username"
                          value={email}
                          {...register("userName")}
                          className={`form-control  ${
                            errors.userName ? "is-invalid" : ""
                          }`}
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                        />
                        <div className="invalid-feedback">
                          {errors.userName?.message}
                        </div>
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Password</label>
                        <div className="input-group auth-pass-inputgroup">
                          <input
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            {...register("password")}
                            className={`form-control  ${
                              errors.password ? "is-invalid" : ""
                            }`}
                            value={password}
                            onChange={(e) => {
                              setPassword(e.target.value);
                            }}
                          />

                          <div className="invalid-feedback">
                            {errors.password?.message}
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 d-grid">
                        <button
                          className="btn btn-primary waves-effect waves-light"
                          type="submit"
                          onClick={handleSubmit}
                        >
                          Log In
                        </button>
                      </div>

                      <div className="mt-4 text-center">
                        <Link to="/" className="text-muted">
                          <i className="mdi mdi-lock me-1"></i> Back to login
                        </Link>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default connect(null, {register})(Registration);
