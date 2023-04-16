import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
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
import { getClients, updateCliente } from "../../services/clientes/ClientesService";

const SytledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const Page = ({ chaveCliente, setChaveCliente, setLoading, loading }) => {
  const [linha, setLinha] = useState([]);
  const [open, setOpen] = useState(false);
  const [nome, setNome] = useState("");
  const [id, setId] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [loadingModal, setLoadingModal] = useState(false);
  const [clientes, setClientes] = useState([]);
  const [alert, setAlert] = useState(false);
  const [alertContent, setAlertContent] = useState("");
  const [alertType, setAlertType] = useState("");

  useEffect(() => {
    const fetchClientes = async () => {
      const response = await getClients();
      setClientes(response);
    };
    fetchClientes();
  }, []);

  function setModal(linha, estado) {
    setOpen(estado);
    setLinha(linha);
    setId(linha.id);
    setNome(linha.nome);
    setTelefone(linha.telefone);
    setCpf(linha.cpf);
  }

  function rerender() {
    setChaveCliente(chaveCliente === "light" ? "dark" : "light");
    setLoading(true);
  }
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
        const response = await updateCliente(id, nome, cpf, telefone);
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

  //cria a página
  return (
    <Box sx={{ ml: "5px" }} position="center">
      <Typography align="center" variant="h3" component="div">
        Clientes atualmente cadastrados
      </Typography>
      <Grid container spacing={1}>
        {clientes.map((row) => (
          <Grid item xs={6} md={4}>
            <Card sx={{ margin: 1 }} key={row.id}>
              <CardHeader title={row.nome} />
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  CPF: {row.cpf}
                </Typography>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  ID: {row.id}
                </Typography>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Telefone: {row.telefone}
                </Typography>
              </CardContent>

              <CardActions disableSpacing>
                <ButtonGroup
                  variant="outlined"
                  aria-label="outlined button group primary"
                >
                  <Button size="small" onClick={(e) => setModal(row, true)}>
                    Editar
                  </Button>
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
            Alterar cliente
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
              <FormControl sx={{ width: "20ch" }}>
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
                    setNome(e.target.value);
                  }}
                  fullWidth
                  required
                  id="nome"
                  label="Nome"
                  name="nome"
                  defaultValue={linha.nome}
                />
                <TextField
                  onChange={(e) => {
                    setCpf(e.target.value);
                  }}
                  fullWidth
                  required
                  id="cpf"
                  label="CPF"
                  name="cpf"
                  defaultValue={linha.cpf}
                />
                <TextField
                  onChange={(e) => {
                    setTelefone(e.target.value);
                  }}
                  fullWidth
                  required
                  id="telefone"
                  label="Telefone"
                  name="telefone"
                  defaultValue={linha.telefone}
                />
              </FormControl>
            </div>
          </Box>

          <ButtonGroup
            sx={{ m: 1, width: "10ch" }}
            variant="contained"
            color="success"
            aria-label="outlined primary button group"
          >
            <Button onClick={submitCliente}>Atualizar</Button>
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
    </Box>
  );
};

export default Page;
