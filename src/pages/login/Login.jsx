import React, { useState } from "react";
import loginImage from "../../assets/images/login-img.png";
import bgImage from "../../assets/images/login-bg-image.png";
import camera from "../../assets/images/camera.png";
import { InputsBox } from "../../components/inputs";
import { commonAllApi } from "../../server/Api";
import { toast } from "react-toastify";
import { isOk } from "../../utils/reusablefunctions";
import { NavLink, useNavigate } from "react-router-dom";

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isWelcome, setIsWelcome] = useState(false);
  const navigate = useNavigate();
  const [isShowProfileDetails, setIsShowProfileDetails] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleApiResponse = (response) => {
    if (isOk(response?.status)) {
      if (!isSignUp) {
        toast.success( "Login successfully");
        localStorage.setItem("token_EmployWise", response?.data?.token);
        navigate("/category?page=1"); 

      } else {
        setIsSignUp(false);
        toast.success( "Registered successfully" );
      }
    
    } else {
      toast.error(response?.response?.data?.message || "Something went wrong!");
    }
  };

  const resetForm = () => {
    setFormData({
      userName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData2 = {
      email: formData.userName,
      password: formData.password,
      ...(isSignUp && {
        fullName: formData.userName,
        firstName: formData.userName.split(" ")[0],
        lastName: formData.userName.split(" ")[1] || "",
        phone: formData.phone,
      }),
    };

    const url = isSignUp ? "/registration" : "login";

    try {
      const response = await commonAllApi(url, formData2, "post");
      handleApiResponse(response);
    
    } finally {
      setLoading(false);
      resetForm();
    }
  };

  return (
    <section className="login-main-section">
      <img src={bgImage} className="bg-img-wave" alt="" />
      <div className="container text-center">
        {!isWelcome ? (
          <div className="login-main-container">
            <div className="left-part">
              <img
                src={loginImage}
                className="login_left_image"
                alt="loginImage"
              />
            </div>
            <div className="right-part">
              <div className="vertical-divider"></div>
              <div className="form-wrapper">
                <div className="sub-form-wrapper">
                  <h1>{isSignUp ? "Create New Account" : "Login"}</h1>
                  <p className="welcome-para">
                    Welcome to EmployWise 
                  </p>
                  <form
                    className={
                      !isSignUp
                        ? "login-form-wrapper"
                        : "login-form-wrapper update-margin-top"
                    }
                    onSubmit={handleSubmit}
                  >
                    <div className="form-group">
                      <label htmlFor="userName">User Name</label>
                      <input
                        type="text"
                        name="userName"
                        id="userName"
                        required
                        placeholder=""
                        value={formData.userName}
                        onChange={handleChange}
                      />
                    </div>
                    {isSignUp && (
                      <>
                        <div className="form-group">
                          <label htmlFor="email">Email</label>
                          <input
                            type="email"
                            name="email"
                            id="email"
                            required
                            placeholder=""
                            value={formData.email}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="phone">Phone No</label>
                          <input
                            type="number"
                            name="phone"
                            id="phone"
                            required
                            placeholder=""
                            value={formData.phone}
                            onChange={handleChange}
                          />
                        </div>
                      </>
                    )}
                    <InputsBox
                      classes="password-class"
                      label="Password"
                      value={formData.password}
                      onChange={(value) =>
                        setFormData({ ...formData, password: value })
                      }
                    />
                    {isSignUp && (
                      <InputsBox
                        classes=""
                        label="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={(value) =>
                          setFormData({ ...formData, confirmPassword: value })
                        }
                      />
                    )}
                    {!isSignUp && (
                      <p className="fs-14-12 fw-normal forgot-pass-text">
                        Forgot Password
                      </p>
                    )}
                    <div
                      className={isSignUp ? "btn-wrapper" : "btn-wrapper-up"}
                    >
                      <button
                        type="submit"
                        className="primary-btn"
                        disabled={loading}
                      >
                        {loading
                          ? "Loading..."
                          : isSignUp
                          ? "Create Account"
                          : "Login"}
                      </button>
                    </div>
                  </form>
                  <p
                    className={
                      !isSignUp
                        ? "create-new-acc-text"
                        : "create-new-acc-text update-margin-top2"
                    }
                    onClick={() => setIsSignUp(!isSignUp)}
                  >
                    {isSignUp
                      ? "Already have an account? Login"
                      : "Create New Account"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="welcome-container">
            {isShowProfileDetails ? (
              <div className="welcome-form-wrapper ">
                <NavLink to="/category" className="skip-btn">Skip </NavLink>
                <input type="file" name="profile" id="profile" />
                <label htmlFor="profile" className="profile-label">
                  <img src={camera} alt="" className="icon-camera" />
                </label>
                <label htmlFor="profile" className="create-new-acc-text">
                  Upload Profile Pitchers
                </label>
                <div className="form-group">
                  <label htmlFor="userName">Your Name</label>
                  <input
                    type="text"
                    name="userName"
                    id="userName"
                    required
                    placeholder=""
                    value={formData.userName}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone No</label>
                  <input
                    type="number"
                    name="phone"
                    id="phone"
                    required
                    placeholder=""
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    placeholder=""
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <InputsBox
                  classes="form-group"
                  label="Confirm Password"
                  value={""}
                  onChange={(value) => {}}
                />
                 <NavLink to="/category">
                <button
                  className="primary-btn mx-auto"
                  // onClick={() => {}}
                >
                  Save
                </button>
                </NavLink>
              </div>
            ) : (
              <div className="welcome-form-wrapper">
                <img src={loginImage} alt="" className="logo_img" />
                <h1>
                  Welcome <br />
                  <span> to the Free Shops App Admin Panel</span>
                </h1>
                <p>
                  Manage and monitor all aspects of your app seamlessly from one
                  place. Use the tools below to get started.
                </p>
                <button
                  className="primary-btn mx-auto"
                  onClick={() => setIsShowProfileDetails(true)}
                >
                  Get start 
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
