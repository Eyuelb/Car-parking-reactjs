import Sidebar from "../components/navbar/Sidebar";
import VagasBody from "../components/vagasPage/VagasBody";
import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";
import Navbar from "../components/navbar/Navbar";
import { useEffect, useState } from "react";
import { loadToken } from "../utils/Auth";

function App() {
  const [mode, setMode] = useState("dark");

  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });

  useEffect(() => {
    if (loadToken() === null){
      window.location.href = '/login';
    }
  })
  return (
    
    <ThemeProvider theme={darkTheme}>
      <Box bgcolor={"background.default"} color={"text.primary"}>
        <Navbar />
        <Stack direction="row" spacing={2} justifyContent="space-between">
        <Sidebar setMode={setMode} mode={mode}/>
          <VagasBody />
        </Stack>
      </Box>
    </ThemeProvider>
  );
}

export default App;
