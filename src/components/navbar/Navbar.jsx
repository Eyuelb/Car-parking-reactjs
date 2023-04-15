import { Pets } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Box,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState} from 'react';
const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});
const Icons = styled(Box)(({ theme }) => ({
  display: "none",
  alignItems: "center",
  gap: "20px",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));
const UserBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));

const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <Typography variant="h6" sx={{ display: { xs: "none", sm: "block" } }}>
          CutuCar
        </Typography>
        <Pets sx={{ display: { xs: "block", sm: "none" } }} />
        <Icons>
          <Avatar
            sx={{ width: 30, height: 30 }}
            src="/images/avatar.jpg"
            onClick={(e) => setOpen(true)}
          />
        </Icons>
        <UserBox onClick={(e) => setOpen(true)}>
          <Avatar
            sx={{ width: 30, height: 30 }}
            src="/images/avatar.jpg"
          />
          <Typography variant="span">Usuario aqui</Typography>
        </UserBox>
      </StyledToolbar>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={open}
        onClose={(e) => setOpen(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
     
          <MenuItem component="a" href='/admin' >Painel admin</MenuItem>
          <MenuItem component="a" href='/vagas' >Vagas</MenuItem>
          <MenuItem component="a" href='/carros'>Carros</MenuItem>  
          <MenuItem component="a" href='/clientes'>Clientes</MenuItem>
          <MenuItem component="a" href='/tickets/ativos'>Tickets ativos</MenuItem>
          <MenuItem component="a" href='/tickets/todos'>Todos os tickets</MenuItem>
          <MenuItem component="a" href='/usuarios'>Cadastrar usuario</MenuItem>
          <MenuItem component="a" href='/'>Index</MenuItem>
          <MenuItem component="a" href="/sair">Logout</MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Navbar;
