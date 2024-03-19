import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link as MUILink } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import AddBoxIcon from '@mui/icons-material/AddBox';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import styled from "styled-components";
import MUIPreviewImagesBox from "./MUI_PreviewImageBox";
import { getDataFromLocalStorage, saveDataToLocalStorage } from "../utils/LocalStorage";
import { defaultImage, getOTP } from "../utils/helper";
// import { Link, useNavigate } from "react-router-dom";
// import { Bounce, toast, Zoom } from "react-toastify";
// import {
//   errorNotification,
//   notificationTypes,
//   successNotification,
//   warningNotification,
// } from "../../utils/Notifications";
// import { Decrypt, Encrypt } from "../../utils/Incryption";
// import { getDataToLocalStorage, saveDataToLocalStorage } from "../../utils/localstorage";
// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignUp() {
  // const navigate = useNavigate();

  // all Regex Patters
  const productNameRegex = /^[A-Za-z\s]+$/; 
  const productPriceRegex = /^\d+$/ ;
  
  // const [dataReady, setDataReady] = React.useState(false);



// Catch our sources
  // const [base64Buffers,setBase64Buffers] = React.useState();


  // For Packet
  /*
 {
    pname :"",
    pprice: 0,
    dateFrom: "",
    dateTo: "",
    imageSrc:""
  
  }
  */






  const [productInfoBox, setProductInfoBox] = React.useState<any>([]);


  // Current States
  const [state, setState] = React.useReducer(
    (state: any, newState: any) => ({ ...state, ...newState }),

    {
      // Input Fields
      productName: "",
      productPrice: "",
      dateFrom: "2000-04-1",
      dateTo: "2012-07-1",
      base64Buffers:{
        source1:"",
        source2:"",
        source3:""
      },
  

      // Input Fields Error
      fNameError: false,
      lNameError: false,
      uNameError: false,
      emailError: false,
      passwordError: false,
      cityError: false,

      // Checks
      fNameCheck: false,
      lNameCheck: false,
      uNameCheck: false,
      emailCheck: false,
      passwordCheck: false,
      cityCheck: false,
    }
  );

  React.useEffect(()=>{

    let products = getDataFromLocalStorage("products");
    
    if(products === null){
    
      saveDataToLocalStorage("products",[])
    
    }else{
      setProductInfoBox(products);
    }
    
    
    },[])

  // React.useEffect(()=>  console.log("Image Source",base64Buffers.source1) ,[base64String]);


  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });
  



  const handleImage = (event:any) =>{
    
    
    const file = event?.target?.files[0]
    
    if(file && file instanceof Blob){
      
      const reader = new FileReader();
      
      reader.onload = () =>{
        
        const result  = reader.result;

        if(typeof result === 'string'){
          

          if(state.base64Buffers.source1 === "" ){

            setState({base64Buffers:{
              ...state.base64Buffers,
              source1:result
            }});

          }else if (state.base64Buffers.source2 === ""){
            
            setState({base64Buffers:{
              ...state.base64Buffers,
              source2:result
            }});


          }
          else if (state.base64Buffers.source3 === ""){
    
            setState({base64Buffers:{
              ...state.base64Buffers,
              source3:result
            }});


          }

        }
      
      }

      reader.readAsDataURL(file);

    
    }
    
  }


 const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {



if(

  state?.productName &&
  state?.productPrice &&
  state?.dateFrom &&
  state?.dateTo 

  )
  {

   
const readyObj = {
  randomID:getOTP(6),  
  productName: state?.productName,
 productPrice: state?.productPrice, 
 dateFrom : state?.dateFrom,
 dateTo  : state?.dateTo,
 imageSources:{
  source1 : state?.base64Buffers.source1 || defaultImage,
  source2 : state?.base64Buffers.source2 || defaultImage ,
  source3 : state?.base64Buffers.source3 || defaultImage 
 } 

}

saveDataToLocalStorage("products",[...productInfoBox,readyObj])
    
  }

 }
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
        
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "green" }}>
            <AddBoxIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create Your Product
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
         
              <Grid item xs={12}>
                <TextField
                  value={state?.productName ?? ""}
                  required
                  fullWidth
                  id="productName"
                  error={state?.uNameError ? true : false}
                  label="Prodcut Name"
                  name="productName"
                  autoComplete="product name"
                   helperText={ state?.uNameError ? "username must be lowercase & numbers" :  ""}
                  onChange={(e) => {
                    setState({ productName: e?.target?.value });
                    setState({ uNameCheck: true });
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={state?.productPrice ?? ""}
                  required
                  fullWidth
                  id="productPrice"
                  error={state?.emailError ? true : false}
                  label="Prodcut Price"
                  name="productPrice"
                  autoComplete="product price"
                  helperText={ state?.emailError ? "incorrect email pattern" :  ""}
                  onChange={(e) => {
                    setState({ productPrice: e?.target?.value });
                    setState({ emailCheck: true });
                  }}
                />
              </Grid>
    
              <Grid item xs={12} sm={6} sx={{ position: "relative" }}>
                <label 
                
                style={{
                  backgroundColor:"white",
                  position:"absolute",
                  zIndex:2,
                  top:"7px",
                  left:"26px",
                  fontSize:"1.3vh",
                  color:"gray"

              }}
                
                
                >Date From</label>
                <input
                  type="date"
                  value={state?.dateFrom}
                  min="1960-01-01"
                  max={`${new Date().getFullYear()-4}-12-31`}
                  style={{
                    width: "100%",
                    height: "100%",
                    padding:"1.2vw 0",
                    cursor: "pointer",
                    borderRadius: "5px",
                    position:"relative",
                    border: state?.dateError
                      ? "1px solid red"
                      : "1px solid #bcbaba",
                  }}
                  onChange={(e) => {
                    setState({ dateFrom: e?.target?.value });
                    setState({ dateCheck: true });
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6} sx={{ position: "relative" }}>
                <label 
                
                style={{
                  backgroundColor:"white",
                  position:"absolute",
                  zIndex:2,
                  top:"7px",
                  left:"26px",
                  fontSize:"1.3vh",
                  color:"gray"

              }}
                
                
                >Date To</label>
                <input
                  type="date"
                  value={state?.dateTo}
                  min="1960-01-01"
                  max={`${new Date().getFullYear()-4}-12-31`}
                  style={{
                    width: "100%",
                    height: "100%",
                    cursor: "pointer",
                    borderRadius: "5px",
                    position:"relative",
                    border: state?.dateError
                      ? "1px solid red"
                      : "1px solid #bcbaba",
                  }}
                  onChange={(e) => {
                    setState({ dateTo: e?.target?.value });
                    setState({ dateCheck: true });
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                

              <Button
              component="label"
                 fullWidth
               role={undefined}
                tabIndex={-1}
              startIcon={<FileUploadIcon/>}
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: "green",
                ": hover": {
                  backgroundColor: "green",
                },
              }}
            >
              Upload Image
              <VisuallyHiddenInput type="file" multiple onChange={handleImage}/>
            </Button>
               </Grid> 


              <Grid item xs={12} sm={12}>
                
<MUIPreviewImagesBox imageSource={state.base64Buffers}/>
          
               </Grid> 

            </Grid>

            <Button
              type="submit"
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: "red",
                ": hover": {
                  backgroundColor: "red",
                },
              }}
            >
              Save
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
              
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}