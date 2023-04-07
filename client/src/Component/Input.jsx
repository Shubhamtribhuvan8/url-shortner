import React from "react";
import { useState } from "react";
import { Button, Input } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { CCard } from "@coreui/react";
import { CButton } from "@coreui/react";
import { CCardBody, CCardTitle, CCardText, CCardImage,CContainer,CNavbarBrand,CNavbar} from "@coreui/react";
import { ToastContainer, toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
export default function Inputs() {
  const [urls, seturls] = useState("");
  const [showurl, setshowurl] = useState("");
  const [disable, setDisable] = useState(false);
  const handleNameChange = (event) => {
    seturls(event.target.value);
  };

  function Empty() {
    setshowurl("");
    seturls("");
  }
  async function handleSubmit(event) {
    setDisable(true);

    event.preventDefault();
    const data = {
      url: urls,
    };
    try {
      console.log("inside");
      let beta = await axios.post("https://calm-puce-toad-gear.cyclic.app", data);
      toast.success("Url Shortened Successfully!");

      console.log(beta.data.shortUrl);
      setshowurl(beta.data.shortUrl);
      setDisable(false);
    } catch (error) {
      toast.error("Error");
      console.log(error);
      setDisable(false);
    }
  }
  
  return (
    <div>
      <ToastContainer />
      <CContainer style={{ width: "100vw"}}>
        <CNavbar colorScheme="light" className="bg-light" >
          <CContainer fluid>
            <CNavbarBrand href="/"> <h1>Short URL</h1></CNavbarBrand>
          </CContainer>
        </CNavbar>
      </CContainer>
      <br/>
      <br/>
      <CCard style={{ width: "40rem", display: "inline-flex" }}>
        <CCardImage
          style={{ objectFit: "cover", height: "170px" }}
          orientation="top"
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80"
        />
        <CCardBody>
          <CCardTitle>Paste the URL to be shortened</CCardTitle>
          <CCardText>
            <form onSubmit={handleSubmit}>
              <TextField
                style={{ width: "440px" }}
                required
                type="text"
                value={urls}
                onChange={handleNameChange}
                placeholder="Enter the Link Here!"
              />
              <br /> <br />
              <CButton
                disabled={disable}
                style={{ width: "120px" }}
                type="submit"
              >
                {disable ? <CircularProgress size="20px" /> : <>Shorten URL</>}
              </CButton>
            </form>
          </CCardText>
          <Box>
            {showurl ? <h1>{showurl}</h1> : <h1>Your shortened URL</h1>}
            <Button variant="contained" onClick={Empty}>
              Refresh
            </Button>
          </Box>
        </CCardBody>
      </CCard>
    </div>
  );
}
