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
import { Add as AddIcon } from "@mui/icons-material";
import { Box } from "@mui/system";
import { createCliente } from "../../services/clientes/ClientesService";

const SytledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const Add = ({ chaveCliente, setChaveCliente, setLoading, loading }) => {
  const [loadingModal, setLoadingModal] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [alertContent, setAlertContent] = useState("");
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [open, setOpen] = useState(false);

  const submitCliente = () => {
    if (nome === "" || cpf === "" || telefone === "") {
      setAlertType("warning");
      setAlertContent("Preencha todos os campos");
      setAlert(true);
    } else {
      setAlertType("info");
      setAlertContent("Enviando");
      setAlert(true);
      setLoadingModal(true);
      const getAlert = async () => {
        const response = await createCliente(nome, telefone, cpf);
        if (response.data.result) {
            setTimeout(() => {
            setAlertType(response.data.tipo);
            setAlertContent(response.data.content);
            setAlert(true);
            setLoadingModal(false);
          }, [1000]);
        }
      };
      getAlert();
    }
  };

  function rerender() {
    setChaveCliente(chaveCliente === "light" ? "dark" : "light");
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
            Cadastrar Cliente
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
              <FormControl sx={{ width: "61ch" }}>
                <TextField
                  onChange={(e) => {
                    setNome(e.target.value);
                  }}
                  required
                  id="nome"
                  name="nome"
                  label="Nome"
                  type="text"
                  placeholder="Informe o nome do cliente"
                  defaultValue=""
                />
                 <TextField
                  onChange={(e) => {
                    setCpf(e.target.value);
                  }}
                  required
                  id="cpf"
                  name="cpf"
                  label="CPF"
                  type="text"
                  placeholder="Informe o CPF do cliente"
                  defaultValue=""
                />
                 <TextField
                  onChange={(e) => {
                    setTelefone(e.target.value);
                  }}
                  required
                  id="telefone"
                  name="telefone"
                  label="Telefone"
                  type="text"
                  placeholder="Informe o telefone do cliente"
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
            <Button onClick={submitCliente}>Cadastrar</Button>
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
