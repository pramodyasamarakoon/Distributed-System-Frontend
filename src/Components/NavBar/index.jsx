import React, { useState } from "react";
import { AppBar, Toolbar, Typography, InputBase, Grid } from "@mui/material";
import navBarBack from "../../Assets/Images/NavBar/Nav.jpg";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";

const NavBar = () => {
  const navBarStyle = {
    backgroundImage: `url(${navBarBack})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "70px",
    display: "flex",
    justifyContent: "center",
    backdropFilter: "blur(15px)",
    position: "fixed", // Fix the position to the top of the viewport
    width: "100%", // Make the Navbar span the full width of the viewport
    top: 0,
    zIndex: 99,
  };

  //   Initialize state for the input value
  const [searchTerm, setSearchTerm] = useState("");

  //   Update the search term in state
  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
    console.log(e.target.value);
  };

  return (
    <AppBar position="static" style={navBarStyle}>
      <Toolbar>
        <Grid container alignItems="center">
          <Grid
            item
            xs={2}
            // component={Link}
            to="/"
            style={{ textAlign: "left", paddingLeft: 15, cursor: "pointer" }}
          >
            <Typography variant="h6">Kumidrive</Typography>
          </Grid>
          {/* Search Bar */}
          <Grid
            item
            xs={8}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "rgba(255, 255, 255, 0.5)",
                borderRadius: 20,
                padding: "4px",
                paddingX: "8px",
              }}
            >
              <SearchIcon style={{ paddingLeft: "8px" }} />
              <InputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                style={{
                  marginLeft: "8px",
                  width: "360px",
                  color: "#FFFFFF",
                }}
                value={searchTerm} // Set the input value from state
                onChange={handleSearchInputChange}
              />
            </div>
          </Grid>
          {/* Profile Icon  */}
          <Grid
            item
            xs={2}
            style={{
              textAlign: "right",
              alignItems: "center",
            }}
          >
            <AccountCircleIcon style={{ fontSize: 35 }} />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
