import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';
import { defaultImage } from '../utils/helper';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';



const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  marginLeft:"10px",
  height: 100,
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: 100,
  },
  // '&:hover, &.Mui-focusVisible': {
  //   zIndex: 1,
  //   '& .MuiImageBackdrop-root': {
  //     opacity: 0.15,
  //   },
  //   '& .MuiImageMarked-root': {
  //     opacity: 0,
  //   },
  //   '& .MuiTypography-root': {
  //     border: '4px solid currentColor',
  //   },
  // },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  // width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));

export default function MUIPreviewImagesBox({imageSource,handleImage,cancelImage,imageError}:any) {


  const images = [
    {
      name:"image1",
      url: imageSource.source1 || defaultImage,
      title: 'Breakfast',
      width: '30%',
    },
    {
      name:"image2",
      url: imageSource.source2 || defaultImage,
      title: 'Burgers',
      width: '30%',
    },
    {
      name:"image3",
      url:  imageSource.source3 ||defaultImage,
      title: 'Camera',
      width: '30%',
    },
  ];


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



  return (
    
    <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 365, width: '100%', border: `2px dotted ${imageError ? "red" : "black"}` ,position:"relative"}}>

       {images?.map((image:any)=>(

      <Button
      // component="label"
         fullWidth
       role={undefined}
        tabIndex={-1}
      // startIcon={}
      // style={{
       
      // }}
      // variant="contained"
      sx={{
        cursor:"default",
        width: image.width,
        marginLeft:"10px",
        // position:"relative",
        mt: 3,
        mb: 2,
        
      }}
      
    >
      <span style={{color:"white"}}>Upload Image Button</span>
{image.url !== defaultImage && (
<>
<CancelIcon sx={{color:"white",fontSize:"1.7vw",position:"absolute",zIndex:1,top:-1,left:-1,cursor:"pointer"}} onClick={e => cancelImage(image.name)}/>

<label >
  <VisuallyHiddenInput type="file" accept='image/*' onChange={(e)=>handleImage(e,image.name)}/>
  <EditIcon sx={{color:"white",fontSize:"1.7vw",position:"absolute",zIndex:1,top:-1,right:-1,cursor:"pointer"}} />
  </label>
</>
  )}
      

             <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
             <ImageBackdrop className="MuiImageBackdrop-root" />
             <Image>
       <Typography
                component="span"
                variant="subtitle1"
                color="inherit"
                sx={{
                  position: 'relative',
                  p: 4,
                  pt: 2,
                  pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                }}
              >
           {image.url === defaultImage && 
              <label>
            <VisuallyHiddenInput type="file" accept='.png, .jpeg, .jpg, .svg' onChange={(e)=>handleImage(e,image.name)}/>

            <AddCircleIcon sx={{fontSize:"2.5vw",cursor:'pointer'}} />
            </label>}
                <ImageMarked className="MuiImageMarked-root" />
              </Typography>
            </Image>
    </Button>
    ))}

{imageError && <center style={{position:"absolute",top:-16,left:110}}><p><b style={{color:"red",fontWeight:"bold"}}>atleast 1 image select</b></p></center>}
    </Box>


  );
}