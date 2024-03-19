import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getDataFromLocalStorage } from '../utils/LocalStorage';
import { Avatar, AvatarGroup } from '@mui/material';
import { defaultImage } from '../utils/helper';

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];


export default function MUITable() {


const [products,setProducts] = React.useState([]);

  React.useEffect(()=>{

    let products  =  getDataFromLocalStorage("products");

    if(products){

      setProducts(products);
    }


  },[]);




  const createProductImages=(sourcePacket:any)=>{

if(sourcePacket.source1[0] === "d"){

  if(sourcePacket.source2[0] === "d"){

    if(sourcePacket.source3[0] === "d"){

      return <AvatarGroup max={3}>

      <Avatar alt="" src={sourcePacket.source1}/>
      <Avatar alt="" src={sourcePacket.source2}/>
      <Avatar alt="" src={sourcePacket.source3}/>
    </AvatarGroup>

    }
    
    
else{

  
return <AvatarGroup max={3}>

    <Avatar alt="" src={sourcePacket.source1}/>
    <Avatar alt="" src={sourcePacket.source2}/>
  </AvatarGroup>
              
    }

  }else{
    return  <AvatarGroup max={3}>
 
    <Avatar alt="" src={sourcePacket.source1} />

   </AvatarGroup>

  }

}else{
 return  <AvatarGroup max={3}>
 
          <Avatar alt="" src={defaultImage} />

         </AvatarGroup>
                  
}

  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 550 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Product Id</TableCell>
            <TableCell align="right">Product Images</TableCell>
            <TableCell align="right">Product Name</TableCell>
            <TableCell align="right">Product Price</TableCell>
            <TableCell align="right">Date From</TableCell>
            <TableCell align="right">Date To</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((row:any,idX:number) => (
            <TableRow
              key={idX}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.randomID}
              </TableCell>  
              <TableCell align="right">
                {createProductImages(row.imageSources)}
                </TableCell>
              <TableCell align="right">{row.productName}</TableCell>
              <TableCell align="right">{row.productPrice}</TableCell>
              <TableCell align="right">{row.dateFrom}</TableCell>
              <TableCell align="right">{row.dateTo}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}