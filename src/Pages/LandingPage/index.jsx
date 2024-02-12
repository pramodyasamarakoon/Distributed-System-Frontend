import React, { useState } from "react";
import NavBar from "../../Components/NavBar";
import { ThemeProvider } from "styled-components";
import theme from "../../theme";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  InputAdornment,
  Popover,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import RestoreIcon from "@mui/icons-material/Restore";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ShareIcon from "@mui/icons-material/Share";
import axios from "axios";
import SignIn from "../../Assets/Svg/SignUp.png";
import Logo from "../../Components/Logo";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const LandingPage = () => {
  const [formData, setFormData] = useState({
    componentState: "SignIn",
    signInEmail: "",
    signInPassword: "",
    showPassword: false,
  });
  // menu
  const [activeMenuItem, setActiveMenuItem] = useState("Home");
  const menuItems = [
    { label: "Home", icon: <HomeIcon /> },
    { label: "Favorite", icon: <FavoriteIcon /> },
    { label: "Recycle Bin", icon: <DeleteIcon /> },
  ];
  const handleMenuItemClick = (label) => {
    setActiveMenuItem(label);
    console.log(`Clicked ${label} Menu`);
    // Add your logic or actions for menu item click here
  };

  // Sample data for different menu items
  const menuData = {
    Home: [
      { name: "File 1", date: "2023-10-31", size: "100 KB" },
      { name: "File 2", date: "2023-11-01", size: "150 KB" },
      { name: "File 3", date: "2023-10-31", size: "100 KB" },
      { name: "File 4", date: "2023-11-01", size: "150 KB" },
      { name: "File 5", date: "2023-10-31", size: "100 KB" },
      { name: "File 6", date: "2023-11-01", size: "150 KB" },
      { name: "File 7", date: "2023-10-31", size: "100 KB" },
      { name: "File 8", date: "2023-11-01", size: "150 KB" },
      { name: "File 9", date: "2023-10-31", size: "100 KB" },
      { name: "File 10", date: "2023-11-01", size: "150 KB" },
      { name: "File 11", date: "2023-10-31", size: "100 KB" },
      { name: "File 12", date: "2023-11-01", size: "150 KB" },
      { name: "File 13", date: "2023-10-31", size: "100 KB" },
      { name: "File 14", date: "2023-11-01", size: "150 KB" },
    ],
    Favorite: [
      { name: "Favorite File 1", date: "2023-10-30", size: "200 KB" },
      { name: "Favorite File 2", date: "2023-10-30", size: "200 KB" },
      { name: "Favorite File 3", date: "2023-10-30", size: "200 KB" },
      { name: "Favorite File 4", date: "2023-10-30", size: "200 KB" },
      { name: "Favorite File 5", date: "2023-10-30", size: "200 KB" },
      { name: "Favorite File 6", date: "2023-10-30", size: "200 KB" },
      { name: "Favorite File 7", date: "2023-10-30", size: "200 KB" },
      { name: "Favorite File 8", date: "2023-10-30", size: "200 KB" },
      { name: "Favorite File 9", date: "2023-10-30", size: "200 KB" },
      { name: "Favorite File 10", date: "2023-10-30", size: "200 KB" },
      { name: "Favorite File 11", date: "2023-10-30", size: "200 KB" },
      { name: "Favorite File 12", date: "2023-10-30", size: "200 KB" },
      { name: "Favorite File 13", date: "2023-10-30", size: "200 KB" },
      { name: "Favorite File 14", date: "2023-10-30", size: "200 KB" },
      { name: "Favorite File 15", date: "2023-10-30", size: "200 KB" },
    ],
    "Recycle Bin": [
      { name: "Deleted File 1", date: "2023-10-29", size: "50 KB" },
      { name: "Deleted File 2", date: "2023-10-29", size: "50 KB" },
      { name: "Deleted File 3", date: "2023-10-29", size: "50 KB" },
      { name: "Deleted File 4", date: "2023-10-29", size: "50 KB" },
      { name: "Deleted File 5", date: "2023-10-29", size: "50 KB" },
      { name: "Deleted File 6", date: "2023-10-29", size: "50 KB" },
      { name: "Deleted File 7", date: "2023-10-29", size: "50 KB" },
      { name: "Deleted File 8", date: "2023-10-29", size: "50 KB" },
      { name: "Deleted File 9", date: "2023-10-29", size: "50 KB" },
      { name: "Deleted File 10", date: "2023-10-29", size: "50 KB" },
      { name: "Deleted File 11", date: "2023-10-29", size: "50 KB" },
    ],
  };

  const activeMenuData = menuData[activeMenuItem] || [];

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleThreeDotsClick = (event, row) => {
    console.log("Clicked Three Dots for", row.name);
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  // Function to handle click on Open icon button
  const handleOpenClick = (row) => {
    console.log("Clicked Open for", row.name);
  };

  // Function to handle click on Share icon button
  const handleShareClick = (row) => {
    console.log("Clicked Share for", row.name);
  };

  // Function to handle click on Favorite icon button
  const handleFavoriteClick = (row) => {
    console.log("Clicked Favorite for", row.name);
  };

  // Function to handle click on Delete icon button
  const handleDeleteClick = (row) => {
    console.log("Clicked Delete for", row.name);
  };

  const handleRestoreClick = (row) => {
    console.log("Clicked Restore for", row.name);
  };

  const handleDeletePermanentlyClick = (row) => {
    console.log("Clicked Permanently Delete for", row.name);
  };

  // Add New Dialog Box
  const [openDbox, setOpenDbox] = useState(false);
  const handleOpenDbox = () => {
    console.log("Clicked Add New Button");
    setOpenDbox(true);
  };

  const handleCloseDbox = () => {
    setFormData({
      ...formData,
      selectedFile: null,
    });
    setOpenDbox(false);
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    // Upload the file and update formData
    setFormData({
      ...formData,
      selectedFile: file,
    });
    console.log("File uploaded:", file.name);
    // setOpenDbox(false);
  };

  const handleFileUpload = async () => {
    try {
      const response = await axios.post(
        "https://g6r85zr2hi.execute-api.us-east-1.amazonaws.com/prod/file-upload",
        formData
      );

      // Handle success
      setFormData({
        ...formData,
        selectedFile: null,
      });
      console.log("File Uploaded Successfully");
    } catch (error) {
      // Handle error
      console.error("File Upload Error:", error);
    }
  };

  // Handle the Changes in the Sign In form
  const handleChangeSignIn = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    console.log(name, value);
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
    console.log("Sign In Clicked!");
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
            <img
              src={SignIn}
              alt="Sign In SVG"
              style={{ width: "400px", height: "400px" }}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default LandingPage;
