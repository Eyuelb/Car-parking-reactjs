import { Box, Stack, Skeleton } from "@mui/material";
import React, { useState } from "react";
import Page from "./CarroPage";
import Add from "./AddCarro";
const CarroBody = () => {
  const [loading, setLoading] = useState(true);
  const [chaveCarro, setChaveCarro] = useState(1);

  setTimeout(() => {
    setLoading(false);
  }, [1000]);

  return (
    <Box flex={6} p={{ xs: 0, md: 3 }} minHeight="900px">
      {loading ? (
        <Stack spacing={1}>
          <Skeleton variant="text" height={100} />
          <Skeleton variant="text" height={20} />
          <Skeleton variant="text" height={20} />
          <Skeleton variant="rectangular" height={300} />
        </Stack>
      ) : (
        <>
          <Page />
          <Add setLoading={setLoading} loading={loading} setChaveCarro={setChaveCarro} chaveCarro={chaveCarro} key={chaveCarro}/>
        </>
      )}
    </Box>
  );
};

export default CarroBody;
