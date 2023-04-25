import { Box, Stack, Skeleton } from "@mui/material";
import React, { useState } from "react";
import Page from "./TicketPage";
import Add from "./AddTicket";
const TicketBody = () => {
  const [loading, setLoading] = useState(true);
  const [chaveTicket, setChaveTicket] = useState(1);
  const [open, setOpenModal] = useState(false);

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
          <Page setLoading={setLoading} loading={loading} setChaveTicket={setChaveTicket} chaveCarro={chaveTicket} key={chaveTicket}/>
          <Add  open={open} setOpenModal={setOpenModal} />
        </>
      )}
    </Box>
  );
};

export default TicketBody;
