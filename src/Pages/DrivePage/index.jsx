import React, { useEffect, useRef, useState } from "react";
import Logo from "../../Components/Logo";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, IconButton, InputBase, Paper, Tooltip } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import FileBar from "../../Components/FileBar";
import Loader from "../../Components/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NotFound from "../../Assets/Svg/NotFound.svg";
import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";
import RestoreOutlinedIcon from "@mui/icons-material/RestoreOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import StarIcon from "@mui/icons-material/Star";

const DrivePage = () => {
  const [formData, setFormData] = useState({
    loader: false,
    uploadedFile: null,
    fileSubmitLoading: false,
    userEmail: "",
  });
  const [files, setFiles] = useState([]);
  const [submitButtonLoader, setSubmitButtonLoader] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [currentState, setCurrentState] = useState("MyDrive");
  const navigate = useNavigate();

  //   Handle the add files dialog box
  const [showModal, setShowModal] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const modalRef = useRef(null);
  const accountRef = useRef(null);
  const handleAddFilesClick = () => {
    setShowModal(true);
  };
  const handleCloseModal = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setShowModal(false);
      setFormData({ ...formData, uploadedFile: null });
    }
  };
  const handleCancelClick = () => {
    setShowModal(false);
    setFormData({ ...formData, uploadedFile: null });
  };

  //   Open account dialog box
  const handleAccountClick = () => {
    setShowAccount(true);
  };
  //   Handle the account dialog box
  const handleCloseAccount = (event) => {
    if (accountRef.current && !accountRef.current.contains(event.target)) {
      setShowAccount(false);
    }
  };

  //   Handle change the upload file
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      const fileName = file.name.replace(/\s+/g, "_"); // Replace spaces with underscores
      setUploadedFileName(fileName);
      console.log("File Name", fileName);
      const reader = new FileReader();
      reader.onload = () => {
        const binaryData = reader.result.split(",")[1]; // binary data of the file
        console.log("Binary data of the uploaded file:", binaryData);
        setFormData({ ...formData, uploadedFile: binaryData });
      };
      reader.readAsBinaryString(file);
      setFormData({ ...formData, uploadedFile: file });
    } else {
      // Show error message
      toast.error("Please select a PDF file.", {
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

  // Handle File submit button
  const handleSubmitButton = async () => {
    setSubmitButtonLoader(true);
    try {
      if (formData.uploadedFile) {
        const newFormData = new FormData();
        newFormData.append("file", formData.uploadedFile);
        console.log(
          "Binary data of the uploaded file:",
          newFormData.get("file")
        );
        console.log("New form Data", formData.uploadedFile);

        try {
          // Python Upload
          const response = await axios.post(
            `https://kfa6a8ib1k.execute-api.us-east-1.amazonaws.com/v1/upload2?file_name=${uploadedFileName}`,
            formData.uploadedFile,
            {
              headers: {
                "Content-Type": "application/pdf",
                "Access-Control-Allow-Origin": "*",
              },
            }
          );
          console.log(
            "Upload the file and Start to send it to the database : ",
            response
          );

          // Find the Object Url
          const urlWithQuotes = response.data.body;
          const startIndex = urlWithQuotes.indexOf('"') + 1; // Find the index of the first double quote
          const endIndex = urlWithQuotes.lastIndexOf('"'); // Find the index of the last double quote
          const url = urlWithQuotes.substring(startIndex, endIndex); // Extract the URL between the double quotes

          // Send file to the database
          const databaseResponse = await axios.post(
            "https://eujoxqpsed.execute-api.us-east-1.amazonaws.com/prod/file/save",
            {
              FileName: uploadedFileName,
              FileExtension: ".pdf",
              UserId: localStorage.getItem("E mail"),
              ObjectURL: url,
            }
          );

          console.log(
            "Successfully Upload it to the database",
            databaseResponse.data
          );
          setShowModal(false);
          setFormData({ ...formData, uploadedFile: null });
          toast.success("Successfully Uploaded", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          loadAllFiles();
        } catch (error) {
          console.log("File Uploading Error: ", error.message);
        }
      } else {
        toast.error("Please Upload a File before Submit", {
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
    } catch (error) {
      console.log("Error Uploading File", error.message);
    } finally {
      setSubmitButtonLoader(false);
    }
  };

  const loadAllFiles = async () => {
    console.log("Current State:", currentState);
    setFormData({ ...formData, loader: true });
    const state = currentState;

    try {
      let response;
      let userId = localStorage.getItem("E mail");
      if (state === "Trash") {
        response = await axios.post(
          // Get All Trashed
          "https://eujoxqpsed.execute-api.us-east-1.amazonaws.com/prod/file/getAllTrash/x",
          { Id: userId }
        );
      } else if (state === "Starred") {
        // Get All Starred
        response = await axios.post(
          "https://eujoxqpsed.execute-api.us-east-1.amazonaws.com/prod/file/getStaredFiles",
          { Id: userId }
        );
      } else {
        response = await axios.get(
          // Get All
          `https://eujoxqpsed.execute-api.us-east-1.amazonaws.com/prod/file/get-by-user/${userId}`
        );
      }

      console.log("File Data:", response.data);

      // Convert epoch timestamps to local date time
      const filesWithLocalDateTime = response.data.map((file) => ({
        ...file,
        CreatedDate: new Date(file.CreatedDate * 1000).toLocaleString(), // Convert epoch to milliseconds
      }));

      // Assuming formData is an object containing files
      setFiles(filesWithLocalDateTime);
      // setSearchResults(filesWithLocalDateTime);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log("File not found.");
        // If files array should be empty when not found
        setFiles([]);
        // If you also want to clear search results
        setSearchResults([]);
      } else {
        console.log("Get All Files Error:", error.message);
      }
    }
    // setSearchResults(files);
    setFormData({ ...formData, loader: false });
  };

  // Log Out function
  const logOut = () => {
    // Remove the token from localStorage
    localStorage.removeItem("Access_Token");
    localStorage.removeItem("E mail");
    navigate("/");
  };

  // Search Function
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
    // Call your search function here
    searchFiles(e.target.value);
  };
  const searchFiles = (searchTerm) => {
    if (searchTerm.trim() === "") {
      // If search term is empty, show all files
      setSearchResults(files);
    } else {
      // Otherwise, filter files based on search term
      const filteredFiles = files.filter((file) => {
        return file.FileName.toLowerCase().includes(searchTerm.toLowerCase());
      });
      setSearchResults(filteredFiles);
    }
  };

  useEffect(() => {
    // Check if access token is available in localStorage
    const accessToken = localStorage.getItem("Access_Token");
    const email = localStorage.getItem("E mail");

    // If access token is not available, navigate to "/" page
    if (!accessToken) {
      navigate("/");
    } else {
      console.log("Access Token", accessToken);
      loadAllFiles();
    }
  }, [currentState]);

  // Star or Unstar Files
  const StarById = async (id) => {
    setFormData({ ...formData, loader: true });
    try {
      // Find the file by id
      const file = files.find((file) => file.FileName === id);
      if (!file) {
        setFormData({ ...formData, loader: false });
        toast.error(`${file.NameOfTheFile} not found.`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return;
      }

      // Check the status of the Stared variable
      if (file.Stared) {
        // Call an endpoint for files that are already starred
        const response = await axios.put(
          "https://eujoxqpsed.execute-api.us-east-1.amazonaws.com/prod/file/un-stared",
          { Id: id }
        );
        console.log("UnStarred File:", response.data);
      } else {
        // Call an endpoint for files that are not starred
        const response = await axios.post(
          "https://eujoxqpsed.execute-api.us-east-1.amazonaws.com/prod/file/mark-stared",
          { Id: id }
        );
        console.log("Starred File:", response.data);
      }
      loadAllFiles();
    } catch (error) {
      setFormData({ ...formData, loader: false });
      console.error("Error starring file:", error.message);
      // Handle the error here
    }
  };

  // Delete or Restore Files
  const DeleteById = async (id) => {
    setFormData({ ...formData, loader: true });
    try {
      // Find the file by id
      const file = files.find((file) => file.FileName === id);
      if (!file) {
        setFormData({ ...formData, loader: false });
        toast.error(`${file.NameOfTheFile} not found.`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return;
      }

      // Check the status of the Stared variable
      if (file.Trash) {
        // Call an endpoint for files that are already Deleted
        const response = await axios.put(
          "https://eujoxqpsed.execute-api.us-east-1.amazonaws.com/prod/file/un-trash",
          { Id: id }
        );
        console.log("Restored File:", response.data);
      } else {
        // Call an endpoint for files that are not Deleted
        const response = await axios.post(
          "https://eujoxqpsed.execute-api.us-east-1.amazonaws.com/prod/file/addToTrash",
          { Id: id }
        );
        console.log("Deleted File:", response.data);
      }
      loadAllFiles();
    } catch (error) {
      setFormData({ ...formData, loader: false });
      console.error("Error Deleting file:", error.message);
      // Handle the error here
    }
  };

  // Download File
  const downloadFile = (url) => {
    // Create a temporary anchor element
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank"; // Open in a new tab
    link.rel = "noopener noreferrer"; // Security best practice

    // Trigger a click event to start downloading the file
    link.click();
  };

  return (
    <div
      className="relative min-h-screen h-auto"
      style={{ backgroundColor: "#1E1F6F" }}
    >
      {/* Side Bar */}
      <div
        className="fixed top-0 left-0 w-[17%] h-screen flex flex-col items-center"
        style={{ backgroundColor: "transparent" }}
      >
        {/* Logo */}
        <div className="mt-[25px]">
          <Logo text="text-[#E6F2FF]" />
        </div>

        {/* Menu Items */}
        <div className="my-4 w-[50%] ">
          {/* My Drive */}
          <div
            className="mt-6 cursor-pointer"
            onClick={() => {
              setCurrentState("MyDrive");
            }}
          >
            <p className="text-[14px] text-[#E6F2FF] flex font-Poppins-Regular">
              {currentState === "MyDrive" ? (
                <CloudUploadIcon
                  style={{
                    verticalAlign: "middle",
                    marginRight: "20px",
                    fontSize: "20px",
                  }}
                />
              ) : (
                <CloudUploadOutlinedIcon
                  style={{
                    verticalAlign: "middle",
                    marginRight: "20px",
                    fontSize: "20px",
                  }}
                />
              )}
              My Drive
            </p>
          </div>
          {/* Starred */}
          <div
            className="mt-6 cursor-pointer"
            onClick={() => {
              setCurrentState("Starred");
            }}
          >
            <p className="text-[14px] text-[#E6F2FF] flex font-Poppins-Regular">
              {currentState === "Starred" ? (
                <StarIcon
                  style={{
                    verticalAlign: "middle",
                    marginRight: "20px",
                    fontSize: "20px",
                  }}
                />
              ) : (
                <StarOutlineOutlinedIcon
                  style={{
                    verticalAlign: "middle",
                    marginRight: "20px",
                    fontSize: "20px",
                  }}
                />
              )}
              Starred
            </p>
          </div>
          {/* Trash */}
          <div
            className="mt-6 cursor-pointer"
            onClick={() => {
              setCurrentState("Trash");
            }}
          >
            <p className="text-[14px] text-[#E6F2FF] flex font-Poppins-Regular">
              {currentState === "Trash" ? (
                <DeleteIcon
                  style={{
                    verticalAlign: "middle",
                    marginRight: "20px",
                    fontSize: "20px",
                  }}
                />
              ) : (
                <DeleteOutlineOutlinedIcon
                  style={{
                    verticalAlign: "middle",
                    marginRight: "20px",
                    fontSize: "20px",
                  }}
                />
              )}
              Trash
            </p>
          </div>
        </div>
      </div>

      {/* Folder Container */}
      <div
        className="absolute top-0 right-0 rounded-tl-[50px] w-[83%] min-h-screen bg-blue-200 p-[25px]"
        style={{ backgroundColor: "#E6F2FF" }}
      >
        {/* Upper Div */}
        <div className="flex justify-between">
          {/* Search Bar */}
          <div>
            <Paper
              component="form"
              elevation={0}
              sx={{
                px: "2px",
                display: "flex",
                alignItems: "center",
                width: 400,
                height: 33,
                borderRadius: "10px",
                backgroundColor: "#D9E3EE",
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1, fontSize: "12px" }}
                placeholder="Search Files"
                type="text"
                value={searchInput}
                onChange={handleSearchInputChange}
              />
              <IconButton type="button" sx={{ p: "6px" }}>
                <SearchIcon sx={{ fontSize: "18px" }} />
              </IconButton>
            </Paper>
          </div>

          {/* Buttons */}
          <div>
            <Paper
              component="form"
              elevation={0}
              sx={{
                px: "2px",
                display: "flex",
                alignItems: "center",
                height: 33,
                borderRadius: "10px",
                backgroundColor: "transparent",
              }}
            >
              {/* Button to add files */}
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#1E1F6F",
                  color: "#FFFFFF",
                  width: "150px",
                }}
                size="small"
                onClick={handleAddFilesClick}
              >
                Add Files
              </Button>

              {/* Account Button */}
              <IconButton
                type="button"
                sx={{
                  p: "6px",
                  color: "#1E1F6F",
                  marginRight: "5px",
                  marginLeft: "5px",
                }}
                onClick={handleAccountClick}
              >
                <AccountCircleRoundedIcon sx={{ fontSize: "35px" }} />
              </IconButton>
            </Paper>

            {showModal && (
              <div
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  zIndex: 999,
                }}
                onClick={handleCloseModal}
              >
                {/* Add Files modal */}
                <div
                  className="rounded-[10px]"
                  ref={modalRef}
                  style={{
                    position: "absolute",
                    top: 70,
                    right: 85,
                    // transform: "translate(-50%, -50%)",
                    width: "300px",
                    // height: "200px",
                    backgroundColor: "#FFFFFF",
                    zIndex: 1000,
                    padding: "20px",
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  {/* Topic */}
                  <p className="text-[16px] font-Poppins-SemiBold flex justify-center ">
                    Upload File
                  </p>

                  {/* Upload Button */}
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    component="label"
                    style={{
                      marginTop: "60px",
                      backgroundColor: "#1E1F6F",
                      color: "#FFFFFF",
                    }}
                  >
                    Upload
                    <input type="file" hidden onChange={handleFileChange} />
                  </Button>

                  {/* File Name */}
                  <p className="text-[14px] font-Poppins-Regular flex justify-center my-[15px] ">
                    {formData.uploadedFile
                      ? uploadedFileName
                      : " No file selected"}
                  </p>

                  {/* Submit and Cancel Buttons */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={handleCancelClick}
                      style={{ marginRight: "5px" }}
                    >
                      Cancel
                    </Button>

                    {/* {formData.fileSubmitLoading ? (
                      <LoadingButton loading variant="outlined">
                        Submit
                      </LoadingButton>
                    ) : ( */}
                    <Button
                      size="small"
                      variant="contained"
                      style={{
                        backgroundColor: submitButtonLoader
                          ? "#BFBFBF"
                          : "#1E1F6F",
                        color: submitButtonLoader ? "#252526" : "#FFFFFF",
                      }}
                      onClick={handleSubmitButton}
                    >
                      Submit
                    </Button>
                    {/* )} */}
                  </div>
                </div>
              </div>
            )}

            {showAccount && (
              <div
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  zIndex: 999,
                }}
                onClick={handleCloseAccount}
              >
                {/* Add Files modal */}
                <div
                  className="rounded-[10px]"
                  ref={accountRef}
                  style={{
                    position: "absolute",
                    top: 70,
                    right: 40,
                    width: "400px",
                    backgroundColor: "#FFFFFF",
                    zIndex: 1000,
                    padding: "20px",
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  {/* Topic */}
                  <p className="text-[14px] font-Poppins-Regular flex justify-center overflow-hidden">
                    {localStorage.getItem("E mail")}
                    {/* {formData.userEmail} */}
                  </p>

                  {/* Log Out Button */}
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    component="label"
                    style={{
                      marginTop: "10px",
                      backgroundColor: "#1E1F6F",
                      color: "#FFFFFF",
                    }}
                    onClick={logOut}
                  >
                    Log Out
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Inner Div */}
        <div>
          {/* Topic */}
          <div className="mt-9">
            <p className="text-[16px] font-Poppins-Regular">
              {currentState === "MyDrive"
                ? "Files"
                : currentState === "Starred"
                ? "Starred Files"
                : currentState === "Trash"
                ? "Trash Files"
                : "Files"}
            </p>
          </div>

          {/* Files */}
          <div className="mt-6 max-h-[445px] overflow-y-auto">
            {formData.loader ? (
              <Loader />
            ) : files === null || files.length === 0 ? (
              <>
                <div className="h-full flex flex-col items-center justify-center">
                  <p>No Files Found</p>
                  <img
                    src={NotFound}
                    alt="No FIles SVG"
                    style={{ width: "300px", height: "300px" }}
                  />
                </div>
              </>
            ) : (
              <>
                {files &&
                  files.map((file) => (
                    <div
                      key={file.FileName}
                      id={file.FileName}
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
                      <div
                        style={{
                          flex: 1.5,
                          marginRight: "5px",
                          marginLeft: "15px",
                        }}
                      >
                        <p className="text-[14px] font-Poppins-Regular">
                          {file.NameOfTheFile}
                        </p>
                      </div>

                      {/* Date */}
                      <div style={{ flex: 1, marginRight: "5px" }}>
                        <p className="text-[14px] font-Poppins-Regular">
                          {file.CreatedDate}{" "}
                        </p>
                      </div>

                      {/* Star Button */}
                      {file.Trash ? null : (
                        <IconButton
                          sx={{
                            p: "6px",
                            marginRight: "5px",
                          }}
                        >
                          {" "}
                          {file.Stared ? (
                            <Tooltip
                              title="Remove Starred"
                              onClick={() => StarById(file.FileName)}
                            >
                              <StarIcon sx={{ fontSize: "20px" }} />
                            </Tooltip>
                          ) : (
                            <Tooltip
                              title=" Add to Starred"
                              onClick={() => StarById(file.FileName)}
                            >
                              <StarOutlineOutlinedIcon
                                sx={{ fontSize: "20px" }}
                              />
                            </Tooltip>
                          )}
                        </IconButton>
                      )}

                      {/* Trash Button */}
                      <IconButton
                        sx={{
                          p: "6px",
                          marginRight: "5px",
                        }}
                      >
                        {" "}
                        {file.Trash ? (
                          <Tooltip
                            title="Restore"
                            onClick={() => DeleteById(file.FileName)}
                          >
                            <RestoreOutlinedIcon sx={{ fontSize: "20px" }} />
                          </Tooltip>
                        ) : (
                          <Tooltip
                            title="Delete"
                            onClick={() => DeleteById(file.FileName)}
                          >
                            <DeleteOutlineOutlinedIcon
                              sx={{ fontSize: "20px" }}
                            />
                          </Tooltip>
                        )}
                      </IconButton>

                      {/* Download Button */}
                      {file.Trash ? null : (
                        <IconButton
                          sx={{
                            p: "6px",
                            marginRight: "5px",
                          }}
                        >
                          <Tooltip
                            title="Download"
                            onClick={() => downloadFile(file.ObjectURL)}
                          >
                            <FileDownloadOutlinedIcon
                              sx={{ fontSize: "20px" }}
                            />
                          </Tooltip>
                        </IconButton>
                      )}
                    </div>
                  ))}
              </>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default DrivePage;
