import {
  Button,
  ButtonGroup,
  Modal,
  styled,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  CircularProgress,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { Box } from "@mui/system";
import { getCarros } from "../../services/carros/CarroService";


const SytledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const Add = ({open, setOpenModal, id}) => {

  const [carros, setCarros] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [loadingModal, setLoadingModal] = useState(false);
  const [tipo, setTipo] = useState([]);
  const [carro, setCarro] = useState("");
  const [alert, setAlert] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [alertContent, setAlertContent] = useState("");

  const handleChangeCarro = (event) => {
    setCarro(event.target.value);
  };

  const handleChangeTipo = (event) => {
    setTipo(event.target.value);
  };  

  //temporario até criar métodos de tickets
  const createTicket = () =>{
    console.log('Temp function createTicket');
  }

  //temporario até criar métodos de Tipos
  const getTipos = () =>{
    console.log('Tempo function getTipos');
    return [{'id': "1", 'descr': "teste"}, {'id': '2', 'descr': 'teste2'}]
  }

  //envia o formulário
  const submitTicket = () => {

      const getAlert = async () => {
        const response = await createTicket(id, carro, tipo);
        if (response.data.result === true) {
          setTimeout(() => {
            setAlertType(response.data.tipo);
            setAlertContent(response.data.content);
            setAlert(true);
            setLoadingModal(false);
          }, [1000]);
        } else {
          setTimeout(() => {
            setAlertType(response.data.tipo);
            setAlertContent(response.data.content);
            setAlert(true);
            setLoadingModal(false);
          }, [1000]);
        }
      }
      getAlert();
    };

  useEffect(() => {
    const fetchDados = async () => {
      const carros_response = await getCarros();
      console.log(carros_response)
      setCarros(carros_response);
      const tipos_response = await getTipos();
      setTipos(tipos_response);
    }
    fetchDados();

  }, []);

  return (
    <>
      <SytledModal
        open={open}
        onClose={(e) => setOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          width={480}
          height={340}
          bgcolor={"background.default"}
          color={"text.primary"}
          p={3}
          borderRadius={5}
          textAlign="center"
        >
          <Typography variant="h6" color="gray" textAlign="center">
            Cadastrar Ticket
          </Typography>
          <Box textAlign="center"
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "60ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="carro-label">Carro</InputLabel>
                <Select
                  labelId="select-label-carro"
                  id="id-carro"
                  value={carro}
                  label="carro"
                  onChange={handleChangeCarro}
                >
                  {carros.map((row) => (
                    <MenuItem key={row.id} value={row.id}>{row.placa}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="tipo-label">Tipo</InputLabel>
                <Select
                  labelId="select-label-tipo"
                  id="id-tipo"
                  value={tipo}
                  label="tipo"
                  onChange={handleChangeTipo}
                >
                  {tipos.map((row) => (
                    <MenuItem key={row.id} value={row.id}>{row.descr}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </Box>

          <ButtonGroup 
            sx={{ m: 1, width: "15ch" }}
            variant="contained"
            color="success"
            aria-label="outlined primary button group"
            
          >
            <Button
              align="center"
              textAlign="center"
             onClick={submitTicket}>Cadastrar</Button>
          </ButtonGroup>
          {alert ? (
            <Alert
              align="right"
              onClick={() => {
                setAlert(false);
              }}
              variant="outlined"
              severity={alertType}
            >
              {alertContent}
            </Alert>
          ) : (
            <></>
          )}
          <Box
            sx={{
              position: "fixed",
              bottom: 20,
              right: { xs: "calc(50% - 25px)", md: 30 },
            }}
          >
            {loadingModal ? <CircularProgress /> : <></>}
          </Box>
        </Box>
      </SytledModal>
    </>
  );
};



export default Add;
