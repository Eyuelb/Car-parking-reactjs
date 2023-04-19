import axios from "axios";
import { loadToken } from "../../utils/Auth";

const CarrosService = axios.create({
  baseURL: `${process.env.REACT_APP_API_SERVER}`,
});
const getCarros = async () => {
  try {
    const response = await CarrosService.get("/car/list", {
      headers: {
        Authorization: `Bearer ${loadToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const createCarro = async (placa, cliente) => {
  try {
    const response = await CarrosService.post(
      "/car/new",
      {
        "placa": placa,
        "cliente_id": cliente,
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
    console.error(error);
  }
};

const updateCarro = async (id, placa, cliente_id) => {
    try {
      const response = await CarrosService.put(
        "/car/update",
        {
          "placa": placa,
          "id": id,
          "cliente_id": cliente_id,
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

export { getCarros, createCarro, updateCarro };
export default CarrosService;
