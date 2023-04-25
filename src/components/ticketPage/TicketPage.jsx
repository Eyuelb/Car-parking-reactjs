import React, { useState, useEffect } from 'react';
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Box,
  Typography,
} from "@mui/material";
import { getTickets} from '../../services/tickets/TicketsService';

const Page = ({ chaveTicket, setChaveTicket, setLoading, loading }) => {

  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchD = async () => {
      const response = await getTickets();
      setTickets(response);
    }
    fetchD();
  }, [])
  //cria a página
  return (
    <Box sx={{ ml: "5px" }} position="center">
      <Typography align="center" variant="h3" component="div">
        Tickets
      </Typography>
      <Grid container spacing={1}>
        {tickets.map((row) => (
          <Grid item xs={6} md={4}>
            <Card sx={{ margin: 1 }}>
              <CardHeader
                title={'Ticket número #' + row.ticket_id}
              />
              <CardContent>
                <Typography key={row.nome_placa} sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Placa: {row.nome_placa}
                </Typography>
                <Typography key={row.preco_tipo} sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Preço/h: {row.preco_tipo}
                </Typography>
                <Typography key={row.cliente_id} sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Nome do Cliente: {row.nome_cliente}
                </Typography>
                <Typography key={row.vaga_id} sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Vaga: {row.id_vaga}
                </Typography>
                <Typography key={row.hora_entrada} sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Hora de entrada: {row.hora_entrada}
                </Typography>

                <Typography key={row.hora_saida} sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Hora de saida: {row.hora_saida}
                </Typography>
                <Typography key={row.custo} sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Custo: {row.custo}
                </Typography>

              </CardContent>

              <CardActions disableSpacing>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );

};

export default Page;
