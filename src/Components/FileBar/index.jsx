import React from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import RestoreOutlinedIcon from "@mui/icons-material/RestoreOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { IconButton, Tooltip } from "@mui/material";

const FileBar = ({ id, name, date, size, starred, trash }) => {
  // Starred Files Function
  const addToStarredFiles = (id) => {
    console.log("Add to Starred", id);
    // logics
  };

  // Remove Files Function
  const removeFromStarredFiles = (id) => {
    console.log("Remove From Starred", id);
    // logics
  };

  // Delete Files Function
  const deleteFiles = (id) => {
    console.log("Delete", id);
    // logics
  };

  // Restore Files Function
  const restoreFiles = (id) => {
    console.log("Restore", id);
    // logics
  };

  // Dowload the File
  const downloadFile = (id) => {
    console.log("Download", id);
  };
  return (
    <div
      style={{
        padding: "10px",
        backgroundColor: "white",
        color: "black",
        borderRadius: "1rem",
        display: "flex",
        alignItems: "center",
        marginTop: "10px",
        marginRight: "5px",
      }}
    >
      {/* File Name */}
      <div style={{ flex: 1.5, marginRight: "5px", marginLeft: "15px" }}>
        <p className="text-[14px] font-Poppins-Regular">{name}</p>
      </div>

      {/* Date */}
      <div style={{ flex: 1, marginRight: "5px" }}>
        <p className="text-[14px] font-Poppins-Regular">{date} </p>
      </div>

      {/* Size */}
      <div style={{ flex: 1, marginRight: "5px" }}>
        <p className="text-[14px] font-Poppins-Regular">{size} </p>
      </div>

      {/* Star Button */}
      <IconButton
        sx={{
          p: "6px",
          marginRight: "5px",
        }}
      >
        {" "}
        {starred ? (
          <Tooltip
            title="Remove Starred"
            onClick={() => removeFromStarredFiles(id)}
          >
            <StarOutlinedIcon sx={{ fontSize: "20px" }} />
          </Tooltip>
        ) : (
          <Tooltip
            title=" Add to Starred"
            onClick={() => addToStarredFiles(id)}
          >
            <StarOutlineOutlinedIcon sx={{ fontSize: "20px" }} />
          </Tooltip>
        )}
      </IconButton>

      {/* Trash Button */}
      <IconButton
        sx={{
          p: "6px",
          marginRight: "5px",
        }}
      >
        {" "}
        {trash ? (
          <Tooltip title="Restore" onClick={() => restoreFiles(id)}>
            <RestoreOutlinedIcon sx={{ fontSize: "20px" }} />
          </Tooltip>
        ) : (
          <Tooltip title="Delete" onClick={() => deleteFiles(id)}>
            <DeleteOutlineOutlinedIcon sx={{ fontSize: "20px" }} />
          </Tooltip>
        )}
      </IconButton>

      {/* Download Button */}
      <IconButton
        sx={{
          p: "6px",
          marginRight: "5px",
        }}
      >
        <Tooltip title="Download" onClick={() => downloadFile(id)}>
          <FileDownloadOutlinedIcon sx={{ fontSize: "20px" }} />
        </Tooltip>
      </IconButton>
    </div>
  );
};

export default FileBar;
