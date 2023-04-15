import Sidebar from "../components/navbar/Sidebar";
import IndexBody from "../components/indexPage/IndexBody";
import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";
import Navbar from "../components/navbar/Navbar";
import { useState} from "react";


function App() {
  const [mode, setMode] = useState("dark");

  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });
  return (
    
    <ThemeProvider theme={darkTheme}>
      <Box bgcolor={"background.default"} color={"text.primary"}>
        <Navbar />
        <Stack direction="row" spacing={2} justifyContent="space-between">
        <Sidebar setMode={setMode} mode={mode}/>
          <IndexBody />
        </Stack>
      </Box>
    </ThemeProvider>
  );
}

export default App;
