import axios from "axios";
import { loadToken } from "../../utils/Auth";

const ClientsService = axios.create({
    baseURL: `${process.env.REACT_APP_API_SERVER}`,
  });
const getClients = async () => {
    try {
        const response = await ClientsService.get('/client/list', {
        headers: {
            Authorization: `Bearer ${loadToken()}`,
        },
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

const createCliente= async (nome, telefone, cpf) => {
    try {
      const response = await ClientsService.post(
        "/client/new",
        {
            "nome": nome,
            "cpf": cpf,
            "telefone": telefone,
        },
        {
          headers: {
            Authorization: `Bearer ${loadToken()}`,
          },
        }
      );
      return response;
    } catch (error) {
      return error.response; 
    }
  };

const updateCliente = async (id, nome, cpf, telefone) => {
    try {
        const response = await ClientsService.put('/client/update',
        {
            "id": id,
            "nome": nome,
            "cpf": cpf,
            "telefone": telefone,
        },
        {
        headers: {
            Authorization: `Bearer ${loadToken()}`,
        },
        });
        return response;
    } catch (error) {
        console.error(error);
    }
}

export {getClients, updateCliente, createCliente};
export default ClientsService;