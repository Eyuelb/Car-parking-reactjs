import { createVaga } from "../../services/vagas/VagasService";
import {Box, CircularProgress, Tooltip, Fab} from '@mui/material';
import {useState} from 'react';
import { Add as AddIcon } from "@mui/icons-material";


const Add = ({ chaveVagas, setChaveVagas, setLoading, loading }) => {
  const [loadingModal, setLoadingModal] = useState(false);

  //envia o formulário
  const submitVaga = () => {
      setLoadingModal(true);
      const getAlert = async () => {
        const response = await createVaga();
        if (response.data.result === true) {
          setTimeout(() => {
            setLoadingModal(false);
            setChaveVagas(chaveVagas === "light" ? "dark" : "light");
            setLoading(true);
          }, [1000]);
        } else {
          setTimeout(() => {
            setChaveVagas(chaveVagas === "light" ? "dark" : "light");
            setLoading(true);
            setLoadingModal(false);
          }, [1000]);
        }
      }
      getAlert();
    };

  return (
    <>
    <Tooltip
        onClick={(e) => submitVaga()}
        title="Adicionar Vaga"
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
          <Box
            sx={{
              position: "fixed",
              bottom: 20,
              right: { xs: "calc(50% - 25px)", md: 30 },
            }}
          >
            {loadingModal ? <CircularProgress /> : <></>}
          </Box>

    </>
  );
};

export default Add;
