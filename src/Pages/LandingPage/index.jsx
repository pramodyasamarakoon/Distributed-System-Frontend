import React, { useState } from "react";
import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import axios from "axios";
import SignUp from "../../Assets/Svg/SignUp.png";
import SignIn from "../../Assets/Svg/SignIn.png";
import Confirmation from "../../Assets/Svg/Confirmation Mail.png";
import Logo from "../../Components/Logo";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import PasswordPolicies from "../../Components/PasswordPolicies";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [formData, setFormData] = useState({
    componentState: "SignIn",
    signInEmail: "",
    signInPassword: "",
    showPassword: false,
    signUpEmail: "",
    signUpPassword: "",
    signUpConfirmPassword: "",
    passwordPolicies: [
      {
        characterCount: false,
        upperCase: false,
        numbers: false,
        specialCharacters: false,
      },
    ],
    passwordValidity: false,
    emailValidity: true,
    confirmPassValidity: false,
    confirmationCode: "",
    accessToken: "",
  });

  const navigate = useNavigate();

  // Handle the Changes in the Sign In form
  const handleChangeSignIn = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    console.log(name, value);
  };

  // Check password validity in sign Up
  const checkPasswordValidity = (password) => {
    const characterCountRegex = /.{8,20}/;
    const upperCaseRegex = /[A-Z]/;
    const numbersRegex = /\d/;
    const specialCharactersRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;

    const characterCountValid = characterCountRegex.test(password);
    const upperCaseValid = upperCaseRegex.test(password);
    const numbersValid = numbersRegex.test(password);
    const specialCharactersValid = specialCharactersRegex.test(password);

    return {
      characterCount: characterCountValid,
      upperCase: upperCaseValid,
      numbers: numbersValid,
      specialCharacters: specialCharactersValid,
    };
  };

  // Handle the Changes in the Sign Up form
  const handleChangeSignUp = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    console.log(name, value);

    // Check the validity of the password
    if (name === "signUpPassword") {
      const passwordPolicies = checkPasswordValidity(value);
      const passwordValidity = Object.values(passwordPolicies).every(
        (policy) => policy
      );
      setFormData((prevData) => ({
        ...prevData,
        passwordPolicies: [passwordPolicies],
        passwordValidity: passwordValidity,
      }));
      console.log("Validity of the password :", passwordValidity);
    }

    // Check the validity of the e mail
    if (name === "signUpEmail") {
      if (!/^\S+@\S+\.\S+$/.test(value)) {
        setFormData((prevData) => ({
          ...prevData,
          emailValidity: false,
        }));
      } else {
        setFormData((prevData) => ({
          ...prevData,
          emailValidity: true,
        }));
      }
      console.log("Validity of the E mail :", formData.emailValidity);
    }
  };

  // Show password button handle
  const handleClickShowPassword = () => {
    setFormData({ ...formData, showPassword: !formData.showPassword });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // Sign In Function
  const signIn = () => {
    if (formData.signInEmail === "" || formData.signInPassword === "") {
      toast.error("Please fill the Required Fields", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      try {
        // Access the token
        const accessToken = "AccessToken_01";
        // Store the token in localStorage
        localStorage.setItem("Access_Token", accessToken);

        // Navigate to another page after signing in
        navigate("/Home");
      } catch (error) {
        console.log("Login Error", error.message);
        toast.error(error.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };

  // Sign Up Function
  const signUp = async () => {
    console.log("Form Data", formData);
    try {
      if (
        formData.signUpEmail === "" ||
        formData.signUpPassword === "" ||
        formData.signUpConfirmPassword === ""
      ) {
        toast.error("Please fill all fields", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        // Check the Confirm Password Validity
        if (formData.signUpPassword !== formData.signUpConfirmPassword) {
          toast.error("Passwords are not matching", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          // Check if all conditions are true
          if (formData.passwordValidity && formData.emailValidity) {
            // All conditions are true, proceed with sending data to the database
            // sendDataToDatabase();
            try {
              const response = await axios.post(
                "https://smga06d5t7.execute-api.us-east-1.amazonaws.com/prod/auth/sign-up",
                {
                  UserId: formData.signUpEmail,
                  Password: formData.signUpPassword,
                }
              );
              console.log("User Registered Successfully", response);

              // Update componentState
              setFormData((prevData) => ({
                ...prevData,
                componentState: "ConfirmationCode",
              }));

              // Show success toast container
              toast.success(" Data sent to the database successfully", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            } catch (error) {
              console.log(
                "Error Sign Up",
                error.response ? error.response.data : error.message
              );
              toast.error(error.message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            }
          } else {
            // Conditions are not met, show error toast container based on the false condition
            if (!formData.emailValidity) {
              toast.error("Email address is not valid", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            }
            if (!formData.passwordValidity) {
              toast.error("Password does not meet the required criteria", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            }
          }
        }
      }
    } catch (error) {
      console.error("Error during sign up:", error.message);

      // Show error toast container
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    console.log("Component State", formData.componentState);
  };

  // Check the confirmation Code
  const submitConfirmationCode = async () => {
    console.log("FormData", formData);
    // get the status of the confirmation code
    try {
      const response = await axios.get(
        "https://smga06d5t7.execute-api.us-east-1.amazonaws.com/prod/auth/verify"
        // {
        //   Email: formData.signUpEmail,
        //   Password: formData.signUpPassword,
        //   Code: formData.confirmationCode,
        // }
        // {
        //   Email: formData.signUpEmail,
        //   Password: formData.signUpPassword,
        //   Code: formData.confirmationCode.toString,
        // }
      );
      console.log(formData.signUpPassword);
      console.log("Successfully Verified", response);
      toast.success("Verified", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setFormData((prevData) => ({
        ...prevData,
        componentState: "SignIn",
      }));
    } catch (error) {
      console.log("Code Verification Error :", error.message);
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <div class="h-screen flex justify-center items-center border-r-400">
      {/* Outer White background div */}
      <div class="h-[90vh] w-[90%] bg-white my-auto rounded-3xl">
        {/* Content Grid */}
        <Grid
          container
          style={{
            width: "98%",
            height: "96%",
            margin: "auto",
            marginTop: "0.8%",
          }}
        >
          {/* Form Grid */}
          <Grid
            item
            xs={6}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {formData.componentState === "SignIn" ? (
              // Sign In
              <div className="flex flex-col justify-center items-center">
                {/* Drive Logo */}
                <div>
                  <Logo />
                </div>
                <div>
                  <p className="mt-4 text-3xl font-Poppins-Regular">
                    Welcome Again
                  </p>
                </div>
                {/* E mail Field */}
                <div className="w-[320px]">
                  <TextField
                    fullWidth
                    size="small"
                    label="E Mail"
                    name="signInEmail"
                    value={formData.signInEmail}
                    onChange={handleChangeSignIn}
                    style={{
                      width: "100%",
                      marginTop: "16px",
                      fontSize: "1.875rem",
                    }}
                  />
                </div>
                {/* Password Field */}
                <div className="w-[320px]">
                  <TextField
                    fullWidth
                    size="small"
                    type={formData.showPassword ? "text" : "password"}
                    label="Password"
                    name="signInPassword"
                    value={formData.signInPassword}
                    onChange={handleChangeSignIn}
                    style={{
                      width: "100%",
                      marginTop: "14px",
                      fontSize: "1.875rem",
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {formData.showPassword ? (
                              <VisibilityOff style={{ fontSize: "medium" }} />
                            ) : (
                              <Visibility style={{ fontSize: "medium" }} />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
                {/* Forgot Password */}
                <div>
                  <p className="my-4 text-[12px] font-Poppins-Regular">
                    Forgot Password ?
                  </p>
                </div>
                {/* Sign In button */}
                <div className="w-[320px]">
                  <Button
                    size="small"
                    variant="contained"
                    style={{
                      width: "100%",
                      backgroundColor: "#1E1F6F",
                      color: "#FFFFFF",
                    }}
                    onClick={signIn}
                  >
                    Sign In
                  </Button>
                </div>
                {/* Sign Up Button */}
                <div>
                  <p
                    className="mt-4 text-[12px] font-Poppins-Regular cursor-pointer"
                    onClick={() =>
                      setFormData({ ...formData, componentState: "SignUp" })
                    }
                  >
                    Don’t have an account yet? Sign Up
                  </p>
                </div>
              </div>
            ) : formData.componentState === "SignUp" ? (
              <div className="flex flex-col justify-center items-center">
                {/* Drive Logo */}
                <div>
                  <Logo />
                </div>
                <div>
                  <p className="mt-4 text-3xl font-Poppins-Regular">Welcome</p>
                </div>
                {/* E mail Field */}
                <div className="w-[320px]">
                  <TextField
                    fullWidth
                    size="small"
                    label="Your E Mail"
                    name="signUpEmail"
                    error={!formData.emailValidity}
                    value={formData.signUpEmail}
                    onChange={handleChangeSignUp}
                    style={{
                      width: "100%",
                      marginTop: "16px",
                      fontSize: "1.875rem",
                    }}
                  />
                </div>
                {/* Password Field */}
                <div className="w-[320px]">
                  <TextField
                    fullWidth
                    size="small"
                    type="password"
                    label="Your Password"
                    name="signUpPassword"
                    value={formData.signUpPassword}
                    onChange={handleChangeSignUp}
                    style={{
                      width: "100%",
                      marginTop: "14px",
                      fontSize: "1.875rem",
                    }}
                  />
                </div>
                {/*Confirm Password Field */}
                <div className="w-[320px]">
                  <TextField
                    fullWidth
                    size="small"
                    type="password"
                    label="Confirm Password"
                    name="signUpConfirmPassword"
                    value={formData.signUpConfirmPassword}
                    onChange={handleChangeSignUp}
                    style={{
                      width: "100%",
                      marginTop: "14px",
                      fontSize: "1.875rem",
                    }}
                  />
                </div>
                {/* Password Policies */}
                <div className="w-[320px] my-4">
                  <p className="my-2 text-[12px] font-Poppins-Regular ">
                    Your Password must contain
                  </p>
                  <Grid container>
                    <Grid item xs={6}>
                      <PasswordPolicies
                        Policy="Between 8 and 20 characters"
                        state={formData.passwordPolicies[0].characterCount}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <PasswordPolicies
                        Policy="1 or more upper case letter"
                        state={formData.passwordPolicies[0].upperCase}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <PasswordPolicies
                        Policy="1 or more numbers"
                        state={formData.passwordPolicies[0].numbers}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <PasswordPolicies
                        Policy="1 or more special characters"
                        state={formData.passwordPolicies[0].specialCharacters}
                      />
                    </Grid>
                  </Grid>
                </div>

                {/* Sign Up button */}
                <div className="w-[320px]">
                  <Button
                    size="small"
                    variant="contained"
                    style={{
                      width: "100%",
                      backgroundColor: "#1E1F6F",
                      color: "#FFFFFF",
                    }}
                    onClick={signUp}
                  >
                    Sign Up
                  </Button>
                </div>
                {/* Sign Up Button */}
                <div>
                  <p
                    className="mt-4 text-[12px] font-Poppins-Regular cursor-pointer"
                    onClick={() =>
                      setFormData({ ...formData, componentState: "SignIn" })
                    }
                  >
                    Already have an account? Sign In
                  </p>
                </div>
              </div>
            ) : formData.componentState === "ConfirmationCode" ? (
              <div className="flex flex-col justify-center items-center">
                {/* Drive Logo */}
                <div>
                  <Logo />
                </div>
                <div>
                  <p className="mt-4 text-3xl font-Poppins-Regular">
                    Confirmation
                  </p>
                </div>
                {/* Code Text */}
                <div>
                  <p className="my-4 text-[12px] font-Poppins-Regular">
                    Enter the 6 digit code send to you at {formData.signUpEmail}
                  </p>
                </div>
                {/* Code Field */}
                <div className="w-[320px] mb-6">
                  <TextField
                    fullWidth
                    size="small"
                    label="Code"
                    name="confirmationCode"
                    value={formData.confirmationCode}
                    onChange={handleChangeSignIn}
                    style={{
                      width: "100%",
                      marginTop: "16px",
                      fontSize: "1.875rem",
                    }}
                  />
                </div>
                {/* Submit button */}
                <div className="w-[320px]">
                  <Button
                    size="small"
                    variant="contained"
                    style={{
                      width: "100%",
                      backgroundColor: "#1E1F6F",
                      color: "#FFFFFF",
                    }}
                    onClick={submitConfirmationCode}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            ) : null}
          </Grid>

          {/* SVG Grid */}
          <Grid
            item
            xs={6}
            style={{
              backgroundColor: "#E6F2FF",
              borderRadius: "1.5rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* Use the imported SVG */}
            {formData.componentState === "SignUp" ? (
              <img
                src={SignUp}
                alt="Sign Up SVG"
                style={{ width: "400px", height: "400px" }}
              />
            ) : formData.componentState === "SignIn" ? (
              <img
                src={SignIn}
                alt="Sign In SVG"
                style={{ width: "400px", height: "400px" }}
              />
            ) : formData.componentState === "ConfirmationCode" ? (
              <img
                src={Confirmation}
                alt="Sign In SVG"
                style={{ width: "400px", height: "400px" }}
              />
            ) : null}
          </Grid>
        </Grid>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LandingPage;
