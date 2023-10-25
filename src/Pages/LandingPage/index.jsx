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
  Popover,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
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

const LandingPage = () => {
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
    setOpenDbox(false);
  };

  const handleFileUpload = (event) => {
    // Handle file upload logic here
    console.log("File uploaded:", event.target.files[0]);
    setOpenDbox(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <NavBar />

      <Grid container sx={{ paddingLeft: 5, paddingRight: 5, marginTop: 8 }}>
        {/* Add New Button Grid */}
        <Grid
          item
          xs={3}
          sx={{
            position: "fixed",
            top: 70,
            bottom: 0,
            left: 15,
            backgroundColor: "#ffffff",
            overflowY: "auto",
            zIndex: 1,
            padding: "20px",
          }}
        >
          {/* Add New Button */}
          <Button
            variant="contained"
            color="primary"
            style={{
              borderRadius: "20px",
              padding: "10px 20px",
              width: "140px",
            }}
            startIcon={<AddIcon />}
            onClick={handleOpenDbox}
          >
            Add New
          </Button>
          {/* Menu List */}
          <div style={{ marginTop: 50 }}>
            {menuItems.map((menuItem) => (
              <div
                key={menuItem.label}
                onClick={() => handleMenuItemClick(menuItem.label)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  padding: "10px",
                  position: "relative",
                }}
              >
                {/* Separate Line */}
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: "50%",
                    transform: "translateY(-50%)",
                    height: "20px", // Height of the line
                    width: "4px", // Width of the line
                    backgroundColor:
                      activeMenuItem === menuItem.label ? "#0087CC" : "#FFFFFF", // Color of the line
                  }}
                ></div>

                {/* Icon */}
                {React.cloneElement(menuItem.icon, {
                  style: { color: "#0087CC" },
                })}

                {/* Label */}
                <span style={{ marginLeft: "10px" }}>{menuItem.label}</span>
              </div>
            ))}
          </div>
          {/* File Upload Dialog */}
          <Dialog open={openDbox} onClose={handleCloseDbox}>
            <DialogTitle sx={{ textAlign: "center" }}>File Upload</DialogTitle>
            <DialogContent>
              <DialogContentText>
                To upload a file, click the "Browse" button below.
              </DialogContentText>
              <div style={{ textAlign: "center" }}>
                <input
                  type="file"
                  id="file-upload"
                  style={{ display: "none", textAlign: "center" }}
                  onChange={handleFileUpload}
                />
                <label htmlFor="file-upload">
                  <Button
                    variant="contained"
                    component="span"
                    color="primary"
                    style={{ marginTop: "30px" }}
                  >
                    Browse
                  </Button>
                </label>
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDbox} color="primary">
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
        {/* Menu Item Grid*/}
        <Grid item xs={2}></Grid>
        <Grid item xs={10}>
          <TableContainer style={{ width: "100%", paddingTop: "116px" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ width: "55%" }}>Name</TableCell>
                  <TableCell style={{ width: "15%" }}></TableCell>{" "}
                  {/* Empty column */}
                  <TableCell style={{ width: "15%" }}>Date</TableCell>
                  <TableCell style={{ width: "10%" }}>Size</TableCell>
                  <TableCell style={{ width: "5%" }}></TableCell>{" "}
                  {/* Empty column */}
                </TableRow>
              </TableHead>
              <TableBody>
                {activeMenuData.map((row) => (
                  <TableRow key={row.name} style={{ position: "relative" }}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>
                      {activeMenuItem === "Home" && (
                        <>
                          {/* IconButton 1: Three Dots */}
                          <Tooltip title="More Options" arrow>
                            <IconButton
                              onClick={(e) => handleThreeDotsClick(e, row)}
                            >
                              <MoreVertIcon />
                            </IconButton>
                          </Tooltip>
                          {/* IconButton 2: Favorite */}
                          <Tooltip title="Add to Favorites" arrow>
                            <IconButton
                              onClick={() => handleFavoriteClick(row)}
                            >
                              <FavoriteBorderOutlinedIcon />
                            </IconButton>
                          </Tooltip>
                          {/* IconButton 3: Delete */}
                          <Tooltip title="Delete" arrow>
                            <IconButton onClick={() => handleDeleteClick(row)}>
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </>
                      )}
                      {activeMenuItem === "Favorite" && (
                        <>
                          {/* IconButton 1: Three Dots */}
                          <Tooltip title="More Options" arrow>
                            <IconButton
                              onClick={(e) => handleThreeDotsClick(e, row)}
                            >
                              <MoreVertIcon />
                            </IconButton>
                          </Tooltip>
                          {/* IconButton 2: Favorite */}
                          <Tooltip title="Remove from the Favorites" arrow>
                            <IconButton
                              onClick={() => handleFavoriteClick(row)}
                            >
                              <FavoriteIcon />
                            </IconButton>
                          </Tooltip>
                          {/* IconButton 3: Delete */}
                          <Tooltip title="Delete" arrow>
                            <IconButton onClick={() => handleDeleteClick(row)}>
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </>
                      )}
                      {activeMenuItem === "Recycle Bin" && (
                        <>
                          {/* IconButton 1: Restore */}
                          <Tooltip title="Restore" arrow>
                            <IconButton onClick={() => handleRestoreClick(row)}>
                              <RestoreIcon />
                            </IconButton>
                          </Tooltip>
                          {/* IconButton 2: Delete */}
                          <Tooltip title="Delete Permanently" arrow>
                            <IconButton
                              onClick={() => handleDeletePermanentlyClick(row)}
                            >
                              <DeleteForeverIcon />
                            </IconButton>
                          </Tooltip>
                        </>
                      )}
                    </TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.size}</TableCell>
                    {/* Popover for more options */}
                    <Popover
                      open={Boolean(anchorEl)}
                      anchorEl={anchorEl}
                      onClose={handleClosePopover}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      PaperProps={{
                        style: {
                          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", // Customize the box shadow here
                        },
                      }}
                    >
                      <div
                        style={{
                          paddingLeft: "10px",
                          paddingTop: "20px",
                          paddingRight: "10px",
                          paddingBottom: "20px",
                          width: "200px",
                        }}
                      >
                        <Typography
                          variant="body1"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            cursor: "pointer",
                            paddingLeft: "10px",
                            paddingTop: "5px",
                            paddingRight: "10px",
                            paddingBottom: "15px",
                          }}
                          onClick={() => handleOpenClick(row)}
                        >
                          <OpenInNewIcon style={{ marginRight: "8px" }} />
                          Open
                        </Typography>
                        <Typography
                          variant="body1"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            cursor: "pointer",
                            paddingLeft: "10px",
                            // paddingTop: "15px",
                            paddingRight: "10px",
                            paddingBottom: "5px",
                          }}
                          onClick={() => handleShareClick(row)}
                        >
                          <ShareIcon style={{ marginRight: "8px" }} />
                          Share
                        </Typography>
                      </div>
                    </Popover>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default LandingPage;
