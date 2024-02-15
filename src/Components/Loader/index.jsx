import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, Skeleton } from "@mui/material";
import { Height } from "@mui/icons-material";

const Loader = ({
  size = "2rem",
  className = "flex items-center justify-center w-[100%]",
}) => {
  return (
    <div className={className} sx={{ zIndex: 102 }}>
      {/* <CircularProgress size={size} color="primary" /> */}
      <Box sx={{ width: "100%" }}>
        <Skeleton sx={{ height: "70px", marginBottom: "-10px" }} />
        <Skeleton
          animation="wave"
          sx={{ height: "70px", marginBottom: "-10px" }}
        />
        <Skeleton
          animation="wave"
          sx={{ height: "70px", marginBottom: "-10px" }}
        />
      </Box>
    </div>
  );
};

export default Loader;
