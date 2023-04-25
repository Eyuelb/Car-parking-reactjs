import axios from "axios";
import { loadToken } from "../../utils/Auth";

const TicketsService = axios.create({
    baseURL: `${process.env.REACT_APP_API_SERVER}`,
  });
const getTickets = async () => {
    try {
        const response = await TicketsService.get('/ticket/listAll', {
        headers: {
            Authorization: `Bearer ${loadToken()}`,
        },
        });
        return response.data;
    } catch (error) {
        return error.response;
    }
};


export {getTickets};
export default TicketsService;