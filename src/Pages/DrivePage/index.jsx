import React, { useEffect, useRef, useState } from "react";
import Logo from "../../Components/Logo";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Button, IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import FileBar from "../../Components/FileBar";
import Loader from "../../Components/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NotFound from "../../Assets/Svg/NotFound.svg";

const DrivePage = () => {
  const [formData, setFormData] = useState({
    currentStatus: "MyDrive",
    files: [
      // {
      //   id: 1,
      //   name: "Distributed Systems",
      //   date: "5th January",
      //   size: "7 MB",
      //   starred: false,
      //   trash: false,
      // },
      // {
      //   id: 2,
      //   name: "Information Technology",
      //   date: "12th February",
      //   size: "12 MB",
      //   starred: true,
      //   trash: false,
      // },
      // {
      //   id: 3,
      //   name: "Management Studies",
      //   date: "28th March",
      //   size: "11 MB",
      //   starred: false,
      //   trash: true,
      // },
      // {
      //   id: 4,
      //   name: "MOT",
      //   date: "3rd December",
      //   size: "3 MB",
      //   starred: true,
      //   trash: true,
      // },
      // {
      //   id: 5,
      //   name: "Distributed Systems",
      //   date: "5th January",
      //   size: "7 MB",
      //   starred: false,
      //   trash: false,
      // },
      // {
      //   id: 6,
      //   name: "Information Technology",
      //   date: "12th February",
      //   size: "12 MB",
      //   starred: true,
      //   trash: false,
      // },
      // {
      //   id: 7,
      //   name: "Management Studies",
      //   date: "28th March",
      //   size: "11 MB",
      //   starred: false,
      //   trash: true,
      // },
      // {
      //   id: 8,
      //   name: "MOT",
      //   date: "3rd December",
      //   size: "3 MB",
      //   starred: true,
      //   trash: true,
      // },
    ],
    loader: false,
    uploadedFile: null,
    fileSubmitLoading: false,
    userEmail: "",
  });
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
    setFormData({ ...formData, uploadedFile: file });
  };

  //   Handle File submit button
  const handleSubmitButton = () => {
    setFormData({ ...formData, fileSubmitLoading: true });
    try {
      if (formData.uploadedFile) {
        try {
          const response = axios.post(
            "https://ip6y9gmfsa.execute-api.us-east-1.amazonaws.com/prod",
            formData.uploadedFile
          );
          console.log("Sent file to the database : ", response);
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
          setFormData({ ...formData, fileSubmitLoading: false });
          loadAllFiles();
        } catch (error) {
          console.log(" File Uploading Error: ", error);
          setFormData({ ...formData, fileSubmitLoading: false });
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
        setFormData({ ...formData, fileSubmitLoading: false });
      }
    } catch (error) {
      console.log("Error Uploading File", error.message);
      setFormData({ ...formData, fileSubmitLoading: false });
    }
  };

  const loadAllFiles = async () => {
    setFormData({ ...formData, loader: true });
    try {
      const response = await axios.get(
        "https://eujoxqpsed.execute-api.us-east-1.amazonaws.com/prod/file/getAll"
      );
      console.log("File Data:", response.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log("File not found.");
        setFormData({ ...formData, files: [] });
        // setSearchResults([]);
      } else {
        console.log("Get All Files Error:", error.message);
      }
    }
    setFormData({ ...formData, loader: false });
  };

  useEffect(() => {
    // Check if access token is available in localStorage
    const accessToken = localStorage.getItem("Access_Token");
    const email = localStorage.getItem("E mail");
    setFormData({ ...formData, userEmail: email });

    // If access token is not available, navigate to "/" page
    if (!accessToken) {
      navigate("/");
    } else {
      console.log("Access Token", accessToken);
      console.log("E mail", email);
      loadAllFiles();
    }
  }, []);

  // Log Out function
  const logOut = () => {
    // Remove the token from localStorage
    localStorage.removeItem("Access_Token");
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
      setSearchResults(formData.files);
    } else {
      // Otherwise, filter files based on search term
      const filteredFiles = formData.files.filter((file) => {
        return file.name.toLowerCase().includes(searchTerm.toLowerCase());
      });
      setSearchResults(filteredFiles);
    }
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
            onClick={() =>
              setFormData({ ...formData, currentStatus: "MyDrive" })
            }
          >
            <p className="text-[14px] text-[#E6F2FF] flex font-Poppins-Regular">
              <CloudUploadOutlinedIcon
                style={{
                  verticalAlign: "middle",
                  marginRight: "20px",
                  fontSize: "20px",
                }}
              />
              My Drive
            </p>
          </div>
          {/* Starred */}
          <div
            className="mt-6 cursor-pointer"
            onClick={() =>
              setFormData({ ...formData, currentStatus: "Starred" })
            }
          >
            <p className="text-[14px] text-[#E6F2FF] flex font-Poppins-Regular">
              <StarOutlinedIcon
                style={{
                  verticalAlign: "middle",
                  marginRight: "20px",
                  fontSize: "20px",
                }}
              />
              Starred
            </p>
          </div>
          {/* Trash */}
          <div
            className="mt-6 cursor-pointer"
            onClick={() => setFormData({ ...formData, currentStatus: "Trash" })}
          >
            <p className="text-[14px] text-[#E6F2FF] flex font-Poppins-Regular">
              <DeleteOutlineOutlinedIcon
                style={{
                  verticalAlign: "middle",
                  marginRight: "20px",
                  fontSize: "20px",
                }}
              />
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
                      ? formData.uploadedFile.name
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
                        backgroundColor: "#1E1F6F",
                        color: "#FFFFFF",
                        marginLeft: "10px",
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
                    {formData.userEmail}
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
              {formData.currentStatus === "MyDrive"
                ? "Files"
                : formData.currentStatus === "Starred"
                ? "Starred Files"
                : formData.currentStatus === "Trash"
                ? "Trash Files"
                : "Files"}
            </p>
          </div>

          {/* Files */}
          <div className="mt-6 max-h-[445px] overflow-y-auto">
            {formData.loader ? (
              <Loader />
            ) : searchResults === null || searchResults.length === 0 ? (
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
                {searchResults &&
                  searchResults.map((file) => (
                    <FileBar
                      key={file.id}
                      id={file.id}
                      name={file.name}
                      date={file.date}
                      size={file.size}
                      starred={file.starred}
                      trash={file.trash}
                    />
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
