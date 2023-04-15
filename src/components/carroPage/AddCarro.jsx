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
  const [alertContent, setAlertContent] = useState("");

  //envia o formulário
  const submitPlaca = () => {
    if (placa === "") {
      setAlert("warning");
      setAlertContent("Preencha todos os campos");
      setAlert(true);
    } else {
      setAlert("info");
      setAlertContent("Enviando");
      setAlert(true);
      setLoadingModal(true);
      axios
        .post("/api/v1/postDeclaracao", {
          placa: placa,
          cliente_id: cliente,
        })
        .then((response) => {
          if (response.data.result === true) {
            setTimeout(() => {
              setPlaca(response.data.tipo);
              setAlertContent(response.data.content);
              setAlert(true);
              setLoadingModal(false);
            }, [1000]);
          } else {
            setTimeout(() => {
              setPlaca(response.data.tipo);
              setAlertContent(response.data.content);
              setAlert(true);
              setLoadingModal(false);
            }, [1000]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const [open, setOpen] = useState(false);

  //Recupera os clientes cadastrados
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_SERVER}/client/list`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(function (response) {
        setClientes(response.data);
      });
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
          width={350}
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
                    <MenuItem value={row.id}>{row.nome}</MenuItem>
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
            sx={{ m: 1, width: "10ch" }}
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
              severity={alert}
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
