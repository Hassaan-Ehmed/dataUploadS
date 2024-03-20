import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CommentIcon from '@mui/icons-material/Comment';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },

  '& .MuiPaper-root': {
            width:"20%",
            height:"50vh"
  },


}));


const DateLists = ({rangeOfDates}:any)=>{

    return (
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {rangeOfDates.map((value:any,idX:number) => (
          <ListItem
            key={idX}
            disableGutters
            sx={{textAlign:"center"}}
          >
            <ListItemText primary={
            // {/* <span style={{fontWeight:"bold"}}>From</span> &nbsp; */}
            <span style={{fontStyle:"italic"}}>{value}</span>
        
         
            }
            
            />
          </ListItem>
        ))}
      </List>
    )
}
export default function MUIDialog({
    handleClose, handleClickOpen, open, setOpen,
    rangeOfDates
}:any) {
 

  return (
    <React.Fragment>
      
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 ,display:"flex",justifyContent:"center",alignItems:"center"}} id="customized-dialog-title">
        Dates Log <CalendarMonthIcon  sx={{marginLeft:"10px"}}/>
        
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
         
        <DateLists rangeOfDates={rangeOfDates}/>
        </DialogContent>
        
      </BootstrapDialog>
    </React.Fragment>
  );
}