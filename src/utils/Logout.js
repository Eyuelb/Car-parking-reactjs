import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";
import { useEffect } from "react";
import axios from 'axios';

function App() {
  useEffect(() => {
    localStorage.removeItem("token");

}, []) 

  const darkTheme = createTheme({
    palette: {
    },
  });
  return (
    
    <ThemeProvider theme={darkTheme}>
      
    </ThemeProvider>
  );
}

export default App;
