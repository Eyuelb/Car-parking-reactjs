import axios from "axios";
import { loadToken } from "../../utils/Auth";

const ClientsService = axios.create({
    baseURL: "http://localhost:3000/api/v1",
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
}

export {getClients};
export default ClientsService;