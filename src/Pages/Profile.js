/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-useless-escape */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React, {useEffect, useState} from "react";

//Image
import ProfileImage from "../assets/images/profile-img.png";

//react-redux
import {connect, useSelector} from "react-redux";

import {
  getProfile,
  updateNameEmail,
  changePassword,
} from "../store/user/action";

//Axios
import axios from "axios";

//BaseURL
import {baseURL} from "../util/Config";

//form validation
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from "yup";

//toast
import {Toast} from "../util/Toast";

const Profile = (props) => {
  //Define States
  const [userName, setUserName] = useState("");
  const [name, setName] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [imageData, setImageData] = useState(null);
  const [imagePath, setImagePath] = useState(null);

  const {user} = useSelector((state) => state.user);

  useEffect(() => {
    props.getProfile();
  }, []);
  useEffect(() => {
    setName(user.name);
    setUserName(user.userName);
    setImagePath(baseURL + user?.image);
  }, [user]);

  // //form valiadtion rules
  // const validation = Yup.object().shape({
  //   name: Yup.string().required("Name is Required!").default(""),

  //   userName: Yup.string()
  //     .required("User Name is Required!")
  //     .default("")
  //     .matches(
  //       /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.*[comgvinrnet]{2,3})+$/,
  //       "You have entered an invalid user name!"
  //     ),
  // });

  // const formOptions = {resolver: yupResolver(validation), mode: "onChange"};

  // const {register, handleSubmit, formState} = useForm(
  //   formOptions ? formOptions : formOptionsPass
  // );
  // const {errors} = formState;

  const handleEditProfile = (values) => {
    props.updateNameEmail(values);
  };

  const passwordValidation = Yup.object().shape({
    oldPass: Yup.string().required("Password is Required!"),
    newPass: Yup.string().required("New Password is Required!"),
    confirmPass: Yup.string().when("password", {
      is: undefined,
      then: Yup.string().notRequired(),
      otherwise: Yup.string()
        .required()
        .oneOf([Yup.ref("password")], "passwords must match"),
    }),
  });

  const formOptionsPass = {resolver: yupResolver(passwordValidation)};

  const {register, handleSubmit, formState} = useForm(formOptionsPass);
  const {errors} = formState;

  const handleChangePassword = (values) => {
    props.changePassword(values);
  };
  const handleChangeImage = (e) => {
    if (e.target.files[0]) {
      setImageData(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImagePath(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleUpdateImage = () => {
    const formData = new FormData();

    formData.append("image", imageData);
    axios
      .patch("user/updateImage", formData)
      .then((res) => {
        if (res.data.status) {
          Toast("success", "Profile Image updated successfully!");
        } else {
          Toast("error", res.data.message);
        }
      })
      .catch((error) => Toast("error", error.message));
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
              <h4 className="mb-sm-0 font-size-18">Profile</h4>

              <div className="page-title-right">
                <ol className="breadcrumb m-0">
                  <li className="breadcrumb-item">
                    <a>Profile</a>
                  </li>
                  <li className="breadcrumb-item active">Dashboard</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
            <div className="card overflow-hidden">
              <div className="bg-primary bg-soft">
                <div className="row">
                  <div className="col-7">
                    <div className="text-primary p-3">
                      <h5 className="text-primary">Welcome Back !</h5>
                      <p>Stock Market Admin Profile</p>
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
                <div className="row">
                  <div className="col-sm-4">
                    <div className="avatar-md profile-user-wid mb-4">
                      <img
                        src={imagePath}
                        draggable="false"
                        className="rounded-circle"
                        width="80"
                        alt="img"
                      />
                    </div>

                    <label for="fileupload">
                      <i
                        className="fas fa-image profile-image"
                        aria-hidden="true"
                        style={{color: "#2a3042"}}
                      ></i>
                    </label>
                    <input
                      type="file"
                      id="fileupload"
                      hidden
                      onChange={handleChangeImage}
                    />

                    <p className="text-muted mb-0 text-truncate">{user.name}</p>
                  </div>

                  <div className="col-sm-8">
                    <div className="pt-4">
                      <div className="col-12">
                        <h5 className="font-size-15">Username</h5>
                        <p className="text-muted mb-0">{user?.userName}</p>
                      </div>

                      <div className="mt-4">
                        <button
                          className="btn mx-auto text-white "
                          type="button"
                          style={{backgroundColor: "#2a3042"}}
                          onClick={handleUpdateImage}
                        >
                          Update Image
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-8">
            <div className="card">
              <div className="card-body">
                <form
                  className="form-horizontal"
                  onSubmit={handleSubmit(handleEditProfile)}
                >
                  <div className="form-group" id="simple-date1">
                    <label
                      className="form-label"
                      style={{
                        fontWeight: 600,
                        fontSize: 15,
                      }}
                    >
                      Name
                    </label>
                    <div className="col-md-12">
                      <input
                        className={`form-control  ${
                          errors.name ? "is-invalid" : ""
                        }`}
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        {...register("name")}
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                      />
                      <div className="invalid-feedback">
                        {errors.name?.message}
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label
                      className="form-label mt-2"
                      style={{
                        fontWeight: 600,
                        fontSize: 15,
                      }}
                    >
                      Email
                    </label>
                    <div className="col-md-12">
                      <input
                        className={`form-control  ${
                          errors.userName ? "is-invalid" : ""
                        }`}
                        type="text"
                        name="userName"
                        id="userName"
                        value={userName}
                        {...register("userName")}
                        onChange={(e) => {
                          setUserName(e.target.value);
                        }}
                      />
                      <div className="invalid-feedback">
                        {errors.userName?.message}
                      </div>
                    </div>
                  </div>

                  <div className="row justify-content-center">
                    <div className="form-group p-3">
                      <div className="col-sm-12 d-flex ">
                        <button
                          className="btn text-white "
                          type="Submit"
                          style={{backgroundColor: "#2a3042"}}
                        >
                          Update Profile
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="card">
            <div className="card-body">
              <form
                className="form-horizontal"
                onSubmit={handleSubmit(handleChangePassword)}
              >
                <div className="form-group">
                  <label
                    className="form-label mt-2"
                    style={{
                      fontWeight: 600,
                      fontSize: 15,
                    }}
                  >
                    Old Password
                  </label>
                  <div className="col-md-12">
                    <input
                      className={`form-control  ${
                        errors.oldPass ? "is-invalid" : ""
                      }`}
                      type="password"
                      id="password"
                      name="oldPass"
                      {...register("oldPass")}
                      onChange={(e) => {
                        // setOldPassword(e.target.value);
                      }}
                    />
                    <div className="invalid-feedback">
                      {errors.oldPass?.message}
                    </div>
                  </div>
                </div>
                <div className="form-group mt-2">
                  <label
                    for="example-email"
                    className="col-md-12"
                    style={{
                      fontWeight: 600,
                      fontSize: 15,
                    }}
                  >
                    New Password
                  </label>
                  <div className="col-md-12">
                    <input
                      className={`form-control  ${
                        errors.newPass ? "is-invalid" : ""
                      }`}
                      type="password"
                      id="newPass"
                      name="newPass"
                      {...register("newPass")}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                    <div className="invalid-feedback">
                      {errors.newPass?.message}
                    </div>
                  </div>
                </div>

                <div className="form-group mt-2">
                  <label
                    for="example-email"
                    className="col-md-12"
                    style={{
                      fontWeight: 600,
                      fontSize: 15,
                    }}
                  >
                    Confirm Password
                  </label>
                  <div className="col-md-12">
                    <input
                      className={`form-control  ${
                        errors.confirmPass ? "is-invalid" : ""
                      }`}
                      type="password"
                      id="confirmPass"
                      {...register("confirmPass")}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                      }}
                    />
                    <div className="invalid-feedback">
                      {errors.confirmPass?.message}
                    </div>
                  </div>
                </div>

                <div className="row justify-content-center">
                  <div className="form-group p-3 ">
                    <div className="col-sm-12 d-flex ">
                      <button
                        className="btn mx-auto mx-md-0 text-white  "
                        style={{backgroundColor: "#2a3042"}}
                        type="submit"
                      >
                        Set Password
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default connect(null, {getProfile, updateNameEmail, changePassword})(
  Profile
);
