import {
  Logout,
  ConfirmationNumber,
  Home,
  ModeNight,
  Person,
  LocalActivity,
  LocalParking,
  DirectionsCar,
  Badge,
  AdminPanelSettings,
} from "@mui/icons-material";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Switch,
} from "@mui/material";
import React from "react";

const Sidebar = ({mode,setMode}) => {
  return (
    <Box flex={1} p={2} sx={{ display: { xs: "none", sm: "block" } }}>
      <Box position="fixed">
        <List>
          <ListItem disablePadding>
            <ListItemButton component="a" href="/">
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary="Index" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="/admin">
              <ListItemIcon>
                <AdminPanelSettings />
              </ListItemIcon>
              <ListItemText primary="Painel admin" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="/vagas">
              <ListItemIcon>
                <LocalParking />
              </ListItemIcon>
              <ListItemText primary="Vagas" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="/carros">
              <ListItemIcon>
                <DirectionsCar />
              </ListItemIcon>
              <ListItemText primary="Carros" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="/clientes">
              <ListItemIcon>
                <Person />
              </ListItemIcon>
              <ListItemText primary="Clientes" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="/tickets/ativos">
              <ListItemIcon>
                <ConfirmationNumber />
              </ListItemIcon>
              <ListItemText primary="Tickets ativos" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="/tickets/todos">
              <ListItemIcon>
                <LocalActivity />
              </ListItemIcon>
              <ListItemText primary="Todos os Tickets" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="/usuario">
              <ListItemIcon>
                <Badge />
              </ListItemIcon>
              <ListItemText primary="Cadastrar usuario" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemIcon>
                <ModeNight />
              </ListItemIcon>
              <Switch defaultChecked onChange={e=>setMode(mode === "light" ? "dark" : "light")}/>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="/sair">
              <ListItemIcon>
                <Logout />
              </ListItemIcon>
              <ListItemText primary="Sair" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default Sidebar;
