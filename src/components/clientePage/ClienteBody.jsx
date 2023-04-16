import { Box, Stack, Skeleton } from "@mui/material";
import React, { useState } from "react";
import Page from "./ClientePage";
import Add from "./AddCliente";
const ClienteBody = () => {
  const [loading, setLoading] = useState(true);
  const [chaveCliente, setChaveCliente] = useState(1);

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
          <Page setLoading={setLoading} loading={loading} setChaveCliente={setChaveCliente} chaveCliente={chaveCliente} key={chaveCliente}/>
          <Add setLoading={setLoading} loading={loading} setChaveCliente={setChaveCliente} chaveCliente={chaveCliente} key={chaveCliente}/>
        </>
      )}
    </Box>
  );
};

export default ClienteBody;
