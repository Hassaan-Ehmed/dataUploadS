import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link as MUILink, Tooltip, Zoom } from "@mui/material";
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
  const productNameRegex = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/; 
  const productPriceRegex = /^\d+(?:\s\d+)*$/ ;
  
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
  const [id,setId] = React.useState<any>(0)


  // Current States
  const [state, setState] = React.useReducer(
    (state: any, newState: any) => ({ ...state, ...newState }),

    {
      // Input Fields
      productName: "",
      productPrice: "",
      dateFrom: `${new Date().getFullYear()-1}-01-01`,
      dateTo: `${new Date().getFullYear()}-0${new Date().getMonth()+1}-${new Date().getDate()}`,
      base64Buffers:{
        source1:"",
        source2:"",
        source3:""
      },
  

      // Input Fields Error
      productNameError: false,
      productPriceError: false,
      dateFromError: false,
      dateToError: false,

      // Checks
      productNameCheck: false,
      productPriceCheck: false,
    }
  );

  React.useEffect(()=>{


    if(state?.productName && state.productNameCheck ){

      if(state.productName.match(productNameRegex)){
        setState({productNameError:false});
      }else{
        setState({productNameError:true});
        
      }
    }

    if(state?.productPrice && state.productPriceCheck){

      if(state.productPrice.match(productPriceRegex)){
        setState({productPriceError:false});
      }else{
        setState({productPriceError:true});
        
      }
    }


    if(state.dateFrom > state.dateTo ){
      setState({dateFromError:true});
    }else{
      
      setState({dateFromError:false});
    }

    if(state.dateTo < state.dateFrom ){
      setState({dateToError:true});
    }else{
      
      setState({dateToError:false});
    }
    



    let products = getDataFromLocalStorage("products");
    
    if(products === null){
    
      saveDataToLocalStorage("products",[])
    
    }else{
      setProductInfoBox(products);
    }
    
    
    },[state.productName,state.productPrice,state.dateFrom,state.dateTo])

    
  React.useEffect(()=> { handleID() },[]);


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
  

  const handleImage = (event:any,imageNumber:any) =>{
    
    
    const file = event?.target?.files[0]
    
    if(file && file instanceof Blob){
      
      const reader = new FileReader();
      
      reader.onload = () =>{
        
        const result  = reader.result;

        if(typeof result === 'string'){
          


          if(imageNumber === "image1"){
            alert("Image 1")
          }else if(imageNumber === "image2"){
            alert("Image 2")
          
          }else if(imageNumber === "image3"){
            alert("Image 3")
            
          }


          // if(state.base64Buffers.source1 === "" ){

          //   setState({base64Buffers:{
          //     ...state.base64Buffers,
          //     source1:result
          //   }});

          // }
        

        }
      
      }

      reader.readAsDataURL(file);

    
    }
    
  }


 const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {

event.preventDefault()

if(

  state?.productName &&
  state?.productPrice &&
  state?.dateFrom &&
  state?.dateTo 

  )
  {

   
const readyObj = {
  randomID:id,  
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

saveDataToLocalStorage("products",[...productInfoBox,readyObj]);
setState({
  productName: "",
  productPrice: "",
  dateFrom: `${new Date().getFullYear()-1}-01-01`,
  dateTo: `${new Date().getFullYear()}-0${new Date().getMonth()+1}-${new Date().getDate()}`,
  base64Buffers:{
    source1:"",
    source2:"",
    source3:""
  },
})

    
  }else{
    return 
  }

 }


 const handleID=()=>{

      const ID = getOTP(6);

      setId(ID);
      return ID;

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
                  error={state?.productNameError ? true : false}
                  label="Prodcut Name"
                  name="productName"
                  autoComplete="product name"
                   helperText={ state?.productNameError ? "Name must only be letters" :  ""}
                  onChange={(e) => {
                    setState({ productName: e?.target?.value });
                    setState({ productNameCheck: true });
                  }}
                />
              </Grid>
              <Grid item xs={9}>
                <TextField
                inputProps={{
                  pattern:"[0-9]*"
                }}
                  value={state?.productPrice || ""}
                  required
                  fullWidth
                  id="productPrice"
                  error={state?.productPriceError ? true : false}
                  label="Prodcut Price"
                  name="productPrice"
                  autoComplete="product price"
                  // helperText={ state?.productPriceError ? "Price must be in Numbers" :  ""}
                  onChange={(e) => {

                    const userInput = e?.target?.value;
                    const numbersOnly = userInput.replace(/[^0-9]/g, ''); 
                    let formattedPrice;

                    if(numbersOnly === ''){
                      
                       formattedPrice = 0
                    }else{
                      formattedPrice  = parseInt(numbersOnly).toLocaleString() || "";
                    }
                    
                  
                    setState({ productPrice:formattedPrice});
                    setState({ productPriceCheck: true });
                  }}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                disabled
                  value={id}
                  required
                  fullWidth
                  label="Id"
                  autoComplete="product price"
                  onChange={(e) => {
                    setState({ productPrice: e?.target?.value });
                    setState({ productPriceCheck: true });
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
               
              
                <Tooltip TransitionComponent={Zoom} title={ state?.dateFromError && "Starting Date must be less than end Date" } placement="left">
                <input
                  type="date"
                  value={state?.dateFrom}

                  style={{
                    width: "100%",
                    height: "100%",
                    padding:"1.2vw 0",
                    cursor: "pointer",
                    borderRadius: "5px",
                    position:"relative",
                    border: state?.dateFromError
                    ? "1px solid red"
                    : "1px solid #bcbaba",
                  }}
                  onChange={(e) => {
                    setState({ dateFrom: e?.target?.value });
                    
                  }}
                  />
                  </Tooltip>

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
                                <Tooltip TransitionComponent={Zoom} title={ state?.dateToError && "End Date must be greater than starting Date" } placement="right">
                                  
                                  
                  <input
                  type="date"
                  value={state?.dateTo}
                  style={{
                    width: "100%",
                    height: "100%",
                    cursor: "pointer",
                    borderRadius: "5px",
                    position:"relative",
                    border: state?.dateToError
                      ? "1px solid red"
                      : "1px solid #bcbaba",
                  }}
                  onChange={(e) => {
                    setState({ dateTo: e?.target?.value });
            
                  }}
                />
                </Tooltip>

              </Grid>
              {/* <Grid item xs={12} sm={12}>

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
               </Grid>  */}
              <Grid item xs={12} sm={12}>
                
<MUIPreviewImagesBox imageSource={state?.base64Buffers}  handleImage={handleImage}/>
          
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