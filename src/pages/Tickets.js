import Sidebar from "../components/navbar/Sidebar";
import TicketBody from "../components/ticketPage/TicketBody";
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
          <TicketBody />
        </Stack>
      </Box>
    </ThemeProvider>
  );
}

export default App;
