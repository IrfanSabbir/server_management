import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,

} from 'reactstrap';
import {Container, Typography, Button} from '@material-ui/core'
import DehazeIcon from '@material-ui/icons/Dehaze';
import IconButton from '@material-ui/core/IconButton';
import {NavLink, useHistory} from 'react-router-dom'

import './Navigation.css'
import Logo from '../../assets/inituxlogo.png'

const Example = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
   const history = useHistory()
  return (
    <div className="Toolbar">
        <Container className="Container">
      <Navbar  expand="md" >
         <NavLink to="/"  >
              <img src={Logo} alt="Logo"/>
        </NavLink>     
        
        <NavbarToggler onClick={toggle}>
            <DehazeIcon  style={{color:'white'}}/>
        </NavbarToggler>
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
              {/* <NavLink to="/components">Components</NavLink> */}
           
          </Nav>
          <Button variant="outlined"  style={{textTransform:"none", border:"2px solid white"}}>

            <NavLink to ="/login" className="RightLink" style={{textDecoration:"none"}}>Log in</NavLink><br/>
          </Button>&nbsp;&nbsp;<br/><br/>
          <Button variant="contained"  style={{textTransform:"none", backgroundColor:"#038fb7", border:"2px solid #038fb7" }}>
            <NavLink to ="/signup" className="RightLink" style={{textDecoration:"none"}}>Sign up</NavLink><br/>
          </Button>
       
        </Collapse>
      </Navbar>
      </Container>
    </div>
  );
}

export default Example;