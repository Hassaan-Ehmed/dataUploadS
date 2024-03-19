import React from 'react';
import logo from './logo.svg';
import './App.css';
import ProductsPanel from './pages/ProductsPanel';
import MUIAppBar from './components/MUI_AppBar';
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import { ProductionQuantityLimitsTwoTone } from '@mui/icons-material';
import ProductsTable from './pages/ProductsTable';
function App() {
  return (

  //  {/* <center><h1>Hello, Hassaan</h1></center> */}
   <>

   <Router>

   <MUIAppBar/>

<Routes>

   <Route path='/'  element={ <ProductsPanel/> } />
   <Route path='/table'  element={ <ProductsTable/> } />

</Routes>
   
   </Router>
    
   
   </>
   

  );
}

export default App;
