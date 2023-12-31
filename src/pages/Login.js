import { indigo } from '@mui/material/colors';
import Page from "../components/loginPage/LoginBody";
import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";
import { useState } from "react";

function App() {
  const [mode, setMode] = useState("dark");

  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });


  const primary = indigo[700];

  return (
    
    <ThemeProvider theme={darkTheme}>
      <Box bgcolor={primary} color={"text.primary"}>
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <Page />
        </Stack>
      </Box>
    </ThemeProvider>
  );
}

export default App;
