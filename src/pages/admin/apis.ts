import api from "../../config/api-config";
import { endPoints } from "../../config/api-config/end-points";

export const getLatestStore = () => api.get(endPoints.getLatestStores)

export const getLatestusers = () => api.get(endPoints.getLatestUsers)