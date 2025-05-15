import api from "../../config/api-config";
import { endPoints } from "../../config/api-config/end-points";

export const createStore = (values: any) => api.post(endPoints.stores,values)
