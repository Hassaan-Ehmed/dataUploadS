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
  const [id,setId] = React.useState<any>(0);
  


  // Current States
  const [state, setState] = React.useReducer(
    (state: any, newState: any) => ({ ...state, ...newState }),

    {
      // Input Fields
      productName: "",
      productPrice: "",
      dateFrom: `${new Date().getFullYear()}-0${new Date().getMonth()+1}-${new Date().getDate()}`
,      //`${new Date().getFullYear()-1}-01-01`,
      
      dateTo: `${new Date().getFullYear()}-0${new Date().getMonth()+1}-${new Date().getDate()}`,
      base64Buffers:{
        source1:"",
        source2:"",
        source3:""
      },
  

      // Input Fields Error
      productNameError: false,
      productPriceError :false,
      dateFromError: false,
      dateToError: false,
      imageError:false,

      // Checks
      productNameCheck: false,
      productPriceCheck: false,

    }
  );

  React.useEffect(()=>{

try{

    if(state?.productName && state.productNameCheck ){

      if(state.productName.match(productNameRegex)){
        setState({productNameError:false});
      }else{
        setState({productNameError:true});
        
      }
    }


    if(state?.productPriceCheck){

      if(state.productPrice === ''){

        setState({productPriceError:true});
        
      }else{
        setState({productPriceError:false});

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

     if((state.base64Buffers.source1 !== '') || (state.base64Buffers.source2 !== '') || (state.base64Buffers.source3 !== '')){


      // alert("OBject Det")
      setState({imageError:false});
     }
    
    let products = getDataFromLocalStorage("products");
    
    if(products === null){
    
      saveDataToLocalStorage("products",[])
    
    }else{
      setProductInfoBox(products);
    }
    
    
}catch(error){
  console.log("Error in Form's useEffect()",error);
}
    
    },[state.productName,state.productPrice,state.dateFrom,state.dateTo,state.base64Buffers.source1,state.base64Buffers.source2,state.base64Buffers.source3])

    
  // React.useEffect(()=> { handleID() },[]);


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
 
try{
  
    if (event && event.target && event.target.files && event.target.files[0]) {

    const file = event?.target?.files[0]
    
    if(file && file instanceof Blob){
      
      const reader = new FileReader();
      
      reader.onload = () =>{
        
        const result  = reader.result;

        if(typeof result === 'string'){
          
          if(imageNumber === "image1" ){

            
            setState({base64Buffers:{
              ...state.base64Buffers,
              source1:""
            }});
            setState({base64Buffers:{
              ...state.base64Buffers,
              source1:result
            }});

          }
          if(imageNumber === "image2" ){

            setState({base64Buffers:{
              ...state.base64Buffers,
              source2:""
            }});
            setState({base64Buffers:{
              ...state.base64Buffers,
              source2:result
            }});

          }
          if(imageNumber === "image3" ){

            setState({base64Buffers:{
              ...state.base64Buffers,
              source3:""
            }});
         
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

}catch(error){
  console.log("Error in Form's handleImage()",error);
}
 
}


 const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {

event.preventDefault()

try{


if(state?.productName && state.productName.match(productNameRegex)){
setState({productNameError:false})
}else{

  setState({productNameError:true});
}

if(state?.productPrice !== ""){
setState({productPriceError:false})
}else{

  setState({productPriceError:true})
} 


if(
(  state.base64Buffers.source1 === "" 
   && state.base64Buffers.source2 === "" 
   && state.base64Buffers.source3 === "" 
)


   ){

  setState({imageError:true});
  

}else{

  setState({imageError:false});

if(

  state?.productName
  && state?.productPrice
  && state?.dateFrom
  && state?.dateTo 
  && (state.productNameError == false)
  && (state.productPriceError  == false)
  && (state.imageError== false)   
  && (state.dateFromError == false)
  && (state?.dateToError== false)  

  )
  {

const readyObj = {
  randomID:id,  
  productName: state?.productName,
 productPrice: state?.productPrice, 
 dateFrom : state?.dateFrom,
 dateTo  : state?.dateTo,
 imageSources:{
  source1 : state?.base64Buffers.source1 ,
  source2 : state?.base64Buffers.source2 ,
  source3 : state?.base64Buffers.source3 
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

  productPriceCheck:false
});

  }else{
    return 
  }

 }

}catch(error){
  console.log("Error in handleSubmit()",error)
}

}

 const handleID=()=>{

      const ID = getOTP(6);

      setId(ID);
      return ID;

 }
 
 const cancelImage=(imageNumber:string)=>{

try{


if(imageNumber === 'image1'){
  setState({base64Buffers:{
    ...state?.base64Buffers,
    source1:""
  }})
}else if (imageNumber === "image2"){

  setState({base64Buffers:{
    ...state?.base64Buffers,
    source2:""
  }})
}
else if (imageNumber === "image3"){

  setState({base64Buffers:{
    ...state?.base64Buffers,
    source3:""
  }})
}

}catch(error){
  console.log("Error in cancelImage()",error);
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
                autoFocus
                  value={state?.productName ?? ""}
                  required
                  fullWidth
                  id="productName"
                  error={state?.productNameError ? true : false}
                  label="Prodcut Name"
                  name="productName"
                  autoComplete="product name"
                   helperText={ (state?.productNameError && state.productName === "") ?  "Product name must be filled" : (state.productNameError && state.productName !== "") ? "Name must only be letters" : ""}
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
                  helperText={ state?.productPriceError ? "Price must be Enter" :  ""}
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
                InputProps={{
                  readOnly:true
                }}
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
                  // max={state?.dateTo}
                  value={state?.dateFrom}
                  min={`${new Date().getFullYear()}-0${new Date().getMonth()+1}-${new Date().getDate()}`}
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
                  min={ state?.dateFrom }
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
                
<MUIPreviewImagesBox imageSource={state?.base64Buffers}  handleImage={handleImage} cancelImage={cancelImage} imageError={state.imageError}/>
          
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