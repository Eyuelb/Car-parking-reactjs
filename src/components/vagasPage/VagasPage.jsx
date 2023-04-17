import React, { useState, useEffect } from 'react';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Box,
  Typography,
} from "@mui/material";
import { getVagas } from '../../services/vagas/VagasService';
import Add from '../ticketPage/AddTicket';

const Page = ({ chaveVagas, setChaveVagas, setLoading, loading }) => {

  const [vagas, setVagas] = useState([]);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [idPass, setIdPass] = useState(''); 
  
  useEffect(() => {
    const fetchVagas = async () => {
      const response = await getVagas();
      setVagas(response);

    }
    fetchVagas();

  }, [])

//função temporaria que vai ser alterada para abertura de modal
  const click = () =>{
    setOpenAddModal(true);
  }

  //cria a página
  return (
    <Box sx={{ ml: "5px" }} position="center">
      <Typography align="center" variant="h3" component="div">
        Listagem de Vagas
      </Typography>
      <Grid container spacing={1}>
        {vagas.map((row) => (
          <Grid item xs={6} md={4}>
            <Card sx={{ margin: 1 }}>
              <CardHeader style={{ textAlign: 'center' }}
                title={row.id}
              />
              <CardContent 
              onClick={() => {setOpenModal(true); setIdPass(row.id)}}
              style={{ textAlign: 'center' }}>
              
              {row.estado ? <DirectionsCarIcon sx={{ fontSize: 90 }} color="success"/> : <DirectionsCarIcon sx={{ fontSize: 90 }} color="error"/>}
              </CardContent>

              <CardActions disableSpacing>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Add open={openModal} setOpenModal={setOpenModal} id={idPass} />
    </Box>
  );

};

export default Page;
