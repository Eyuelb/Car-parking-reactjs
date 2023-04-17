import axios from "axios";
import { loadToken } from "../../utils/Auth";

const VagasService = axios.create({
  baseURL: `${process.env.REACT_APP_API_SERVER}`,
});

const createVaga = async () => {
  try {
    const response = await VagasService.get(
      "/vaga/new",
      {
        headers: {
          Authorization: `Bearer ${loadToken()}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

const getVagas = async () => {
  try {
    const response = await VagasService.get("/vaga/list", {headers: {Authorization: `Bearer ${loadToken()}`}})
    return response.data;
  } catch (error){

  }
}


export { createVaga, getVagas };
export default VagasService;
