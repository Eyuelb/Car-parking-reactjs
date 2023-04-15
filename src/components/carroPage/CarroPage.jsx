import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Box,
  Button,
  ButtonGroup,
  FormControl,
  Modal,
  Typography,
  TextField,
  Alert,
  CircularProgress,
} from "@mui/material";

const SytledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const Page = ({ chaveCarro, setChaveCarro, setLoading, loading }) => {

  function setModal(linha, estado) {
    setOpen(estado)
    setLinha(linha)
    setId(linha.id)
    setPlaca(linha.placa)
    setCliente_Id(linha.cliente_id)
  }

  const [linha, setLinha] = useState([]);
  const [open, setOpen] = useState(false);
  const [placa, setPlaca] = useState("");
  const [id, setId] = useState("");
  const [cliente_id, setCliente_Id] = useState("");
  const [loadingModal, setLoadingModal] = useState(false);


  //busca usuarios no node
  const [carros, setCarros] = useState([]);
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_SERVER}/car/list`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }).then(function (response) {
      setCarros(response.data)
    })

  }, [])

  const [alert, setAlert] = useState(false);
  const [alertContent, setAlertContent] = useState('');
  const [tipo, setTipo] = useState('');
  const submitUser = () => {

    if (id === '' || placa === '') {
      setTipo('warning')
      setAlertContent('Preencha todos os campos')
      setAlert(true)
    } else {
      setTipo("info")
      setAlertContent("Enviando")
      setAlert(true);
      setLoadingModal(true)

      axios.put( `${process.env.REACT_APP_API_SERVER}/car/update`, {
        "id": id,
        "placa": placa,
        "cliente_id": cliente_id,
      }, { headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }).then(response => {
        if (response.data.result === true) {
          setTimeout(() => {
            setTipo(response.data.tipo)
            setAlertContent(response.data.content);
            setAlert(true);
            setLoadingModal(false);
          }, [1000]);

        } else {
          setTimeout(() => {
            setTipo(response.data.tipo)
            setAlertContent(response.data.content);
            setAlert(true);
            setLoadingModal(false);
          }, [1000]);
        }
      }).catch(error => {
        console.log(error)
      })
    }

  }

  function rerender() {
    setChaveCarro(chaveCarro === "light" ? "dark" : "light");
    setLoading(true);
  }

  //cria a página
  return (
    <Box sx={{ ml: "5px" }} position="center">
      <Typography align="center" variant="h3" component="div">
        Carros atualmente cadastrados
      </Typography>
      <Grid container spacing={1}>
        {carros.map((row) => (
          <Grid item xs={6} md={4}>
            <Card sx={{ margin: 1 }}>
              <CardHeader
                title={row.username}
              />
              <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Placa: {row.placa}
                </Typography>
                <Typography key={row.id} sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  ID: {row.id}
                </Typography>
                <Typography key={row.id} sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Nome do Cliente: {row.cliente_nome}
                </Typography>
              </CardContent>

              <CardActions disableSpacing>
                <ButtonGroup
                  variant="outlined"
                  aria-label="outlined button group primary"
                >
                  <Button size="small" onClick={(e) => setModal(row, true)}>Editar</Button>
                </ButtonGroup>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <SytledModal
                open={open}
                onClose={(e) => rerender()}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box
                  width={545}
                  height={400}
                  bgcolor={"background.default"}
                  color={"text.primary"}
                  p={3}
                  borderRadius={5}
                >
                  <Typography variant="h6" color="gray" textAlign="center">
                    Alterar carro
                  </Typography>
                  <Box
                    component="form"
                    sx={{
                      '& .MuiTextField-root': { m: 1, width: '60ch' },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <div>
                      <FormControl sx={{ width: '20ch' }}  >
                        <TextField
                          disabled
                          fullWidth
                          required
                          id="id"
                          label="ID"
                          name="id"
                          defaultValue={linha.id}
                        />
                        <TextField
                        onChange={(e) => {
                            setPlaca(e.target.value)
                          }}
                          fullWidth
                          required
                          id="placa"
                          label="Placa"
                          name="placa"
                          defaultValue={linha.placa}
                        />
                      </FormControl>
                    </div>
                  </Box>

                  <ButtonGroup
                    sx={{ m: 1, width: '10ch' }}
                    variant="contained"
                    color="success"
                    aria-label="outlined primary button group"
                  >
                    <Button onClick={submitUser}>Atualizar</Button>
                  </ButtonGroup>
                  {alert ? <Alert align="right" onClick={() => {
                    setAlert(false);
                  }} variant="outlined" severity={tipo}>{alertContent}</Alert> : <></>}
                  <Box sx={{
                    position: "fixed",
                    bottom: 20,
                    right: { xs: "calc(50% - 25px)", md: 30 },
                  }}>
                    {loadingModal ? <CircularProgress /> : <></>}
                  </Box>
                </Box>
              </SytledModal>
    </Box>
  );

};

export default Page;
