import {
  Button,
  ButtonGroup,
  Fab,
  Modal,
  styled,
  Tooltip,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  CircularProgress,
  TextField,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Add as AddIcon } from "@mui/icons-material";
import { Box } from "@mui/system";
import { loadToken } from "../../utils/Auth";
import { getClients } from "../../services/clientes/ClientesService";
import { createCarro } from "../../services/carros/CarroService";

const SytledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const Add = ({ chaveCarro, setChaveCarro, setLoading, loading }) => {
  const [placa, setPlaca] = useState("");
  const [loadingModal, setLoadingModal] = useState(false);

  const handleChangeCliente = (event) => {
    setCliente(event.target.value);
  };
  const [cliente, setCliente] = useState("");

  const [alert, setAlert] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [alertContent, setAlertContent] = useState("");

  //envia o formulário
  const submitPlaca = () => {
    if (placa === "") {
      setAlertType("warning");
      setAlertContent("Preencha todos os campos");
      setAlert(true);
    } else {
      setAlertType("info");
      setAlertContent("Enviando");
      setAlert(true);
      setLoadingModal(true);
      
      const getAlert = async () => {
        const response = await createCarro(placa, cliente);
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
    }
  };

  const [open, setOpen] = useState(false);

  //Recupera os clientes cadastrados
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    
    const fetchClients = async () => {
      const response = await getClients();
      setClientes(response);
    }
    fetchClients();
  }, []);

  function rerender() {
    setChaveCarro(chaveCarro === "light" ? "dark" : "light");
    setLoading(true);
  }
  return (
    <>
      <Tooltip
        onClick={(e) => setOpen(true)}
        title="Delete"
        sx={{
          position: "fixed",
          bottom: 20,
          left: { xs: "calc(50% - 25px)", md: 30 },
        }}
      >
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Tooltip>
      <SytledModal
        open={open}
        onClose={(e) => rerender()}
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
        >
          <Typography variant="h6" color="gray" textAlign="center">
            Cadastrar Carro
          </Typography>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "60ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="cliente-label">Cliente</InputLabel>
                <Select
                  labelId="select-label-cliente"
                  id="id-cliente"
                  value={cliente}
                  label="cliente"
                  onChange={handleChangeCliente}
                >
                  {clientes.map((row) => (
                    <MenuItem key={row.id} value={row.id}>{row.nome}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl sx={{ width: "61ch" }}>
                <TextField
                  onChange={(e) => {
                    setPlaca(e.target.value);
                  }}
                  required
                  id="placa"
                  name="placa"
                  label="Placa"
                  type="text"
                  placeholder="Informe a placa do veiculo"
                  defaultValue=""
                />
              </FormControl>
            </div>
          </Box>

          <ButtonGroup
            sx={{ m: 1, width: "15ch" }}
            variant="contained"
            color="success"
            aria-label="outlined primary button group"
            align="right"
          >
            <Button onClick={submitPlaca}>Cadastrar</Button>
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
