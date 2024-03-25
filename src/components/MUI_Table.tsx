import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getDataFromLocalStorage } from "../utils/LocalStorage";
import { Avatar, AvatarGroup } from "@mui/material";
import { defaultImage } from "../utils/helper";
import MUIDialog from "./MUI_Dialog";
import { motion } from "framer-motion";
import "../App.css";
function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function MUITable() {
  const [open, setOpen] = React.useState(false);
  const [products, setProducts] = React.useState<any>([]);
  const [rangeOfDates, setRangeOfDates] = React.useState<any>([]);
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    try{
      
    let products = getDataFromLocalStorage("products");

    if (products) {
      setProducts(products);
    }

  }catch(error){
    console.log("Error in Table's useEffect()",error);
  }

  }, []);

  const littleImage = (clickedImage: any) => {};

  
  const createProductImages = (sourcePacket: any) => {

    try{

    if (sourcePacket.source1[0] === "d" && sourcePacket.source2[0] === "d" && sourcePacket.source3[0] === "d" ) {
      return (
        <AvatarGroup max={3}>
         
          <Avatar
            sx={{ cursor: "pointer" }}
            alt=""
            src={sourcePacket.source1}
            onClick={() => littleImage(sourcePacket.source1)}
          />

          <Avatar
            sx={{ cursor: "pointer" }}
            alt=""
            src={sourcePacket.source2}
            onClick={() => littleImage(sourcePacket.source2)}
            />

          <Avatar
            sx={{ cursor: "pointer" }}
            alt=""
            src={sourcePacket.source3}
            onClick={() => littleImage(sourcePacket.source3)}
            />
      
        </AvatarGroup>
      );
    }  

    else if (sourcePacket.source1[0] === "d" && sourcePacket.source2[0] === "d") {
      return (
        <AvatarGroup max={3}>
         
          <Avatar
            sx={{ cursor: "pointer" }}
            alt=""
            src={sourcePacket.source1}
            onClick={() => littleImage(sourcePacket.source1)}
          />
          <Avatar
            sx={{ cursor: "pointer" }}
            alt=""
            src={sourcePacket.source2}
            onClick={() => littleImage(sourcePacket.source2)}
          />
        </AvatarGroup>
      );
    } 
   
   else if (sourcePacket.source2[0] === "d" && sourcePacket.source3[0] === "d") {
      return (
        <AvatarGroup max={3}>
         
          <Avatar
            sx={{ cursor: "pointer" }}
            alt=""
            src={sourcePacket.source2}
            onClick={() => littleImage(sourcePacket.source2)}
          />
          <Avatar
            sx={{ cursor: "pointer" }}
            alt=""
            src={sourcePacket.source3}
            onClick={() => littleImage(sourcePacket.source3)}
          />
        </AvatarGroup>
      );
    } 
    
    else  if (sourcePacket.source1[0] === "d" && sourcePacket.source3[0] === "d") {
      return (
        <AvatarGroup max={3}>
         
          <Avatar
            sx={{ cursor: "pointer" }}
            alt=""
            src={sourcePacket.source1}
            onClick={() => littleImage(sourcePacket.source1)}
          />

          <Avatar
            sx={{ cursor: "pointer" }}
            alt=""
            src={sourcePacket.source3}
            onClick={() => littleImage(sourcePacket.source3)}
          />
      
        </AvatarGroup>
      );
    }  

    else  if (sourcePacket.source1[0] === "d") {

      return (
        <AvatarGroup max={3}>
          
          <motion.img
              style={{
                // width:"3.7vw",
                // height:"3.7vw"
                objectFit:"cover"
              }}
            className="profile-box"
            src={sourcePacket.source1}
            initial={{ scale: 1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, transition: { duration: 0.4 },     }}
            exit={{ scale: 1, opacity: 0, transition: { duration: 0.2 } }}
            data-isOpen={isOpen}
            layout
            onClick={() => {
              setIsOpen(!isOpen);
              littleImage(sourcePacket.source1);
            }}
          ></motion.img>
          {/* <Avatar /> */}
           {/* <Avatar
            sx={{ cursor: "pointer" }}
            alt=""
            src={sourcePacket.source1}
            onClick={() => littleImage(sourcePacket.source1)}
          /> */}
        </AvatarGroup>
      );
     
    }

   else if (sourcePacket.source2[0] === "d") {
      return (
        <AvatarGroup max={3}>
          <Avatar
            sx={{ cursor: "pointer" }}
            alt=""
            src={sourcePacket.source2}
            onClick={() => littleImage(sourcePacket.source2)}
          />
        </AvatarGroup>
      );
      
    } 

   else if (sourcePacket.source3[0] === "d") {
      return (
        <AvatarGroup max={3}>
         
          <Avatar
            sx={{ cursor: "pointer" }}
            alt=""
            src={sourcePacket.source3}
            onClick={() => littleImage(sourcePacket.source3)}
          />
        </AvatarGroup>
      );
    } 


  }catch(error){
    console.log("Error in Table's createProductImages()",error);
  }

  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


 
  const displayDates = (startDateString: any, endDateString: any) => {

    try{

   
    // Parse the strings into Date objects
    const startDate = new Date(startDateString);
    const endDate = new Date(endDateString);

    if (startDate > endDate) {
      // Handle case where start date is after end date
      throw new Error("Start date cannot be after end date.");
    }

    const dates = [];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      dates.push(currentDate.toISOString().slice(0, 10));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    setRangeOfDates(dates);

    handleClickOpen();

  }catch(error){
    console.log("Error in Table's displayDates()",error);
  }

  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 550 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Product Id</TableCell>
            <TableCell align="right">Product Images</TableCell>
            <TableCell align="right">Product Name</TableCell>
            <TableCell align="right">Product Price</TableCell>
            <TableCell align="right">Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map(
            (row: any, idX: number) =>
                   (
                <TableRow
                  key={idX}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.randomID}
                  </TableCell>
                  <TableCell align="right">
                    {createProductImages(row.imageSources)}
                  </TableCell>
                  <TableCell align="right">{row.productName}</TableCell>
                  <TableCell align="right">{row.productPrice}</TableCell>
                  <TableCell align="right">
                    {" "}
                    <span
                      onClick={() => displayDates(row.dateFrom, row.dateTo)}
                      style={{ cursor: "pointer" }}
                    >
                      {row.dateFrom} - {row.dateTo}
                    </span>{" "}
                  </TableCell>
                </TableRow>
              )
          )}
        </TableBody>
        <MUIDialog
          handleClose={handleClose}
          handleClickOpen={handleClickOpen}
          open={open}
          setOpen={setOpen}
          rangeOfDates={rangeOfDates}
        />
      </Table>
    </TableContainer>
  );
}
