import api from "../../../../config/api-config";
import { endPoints } from "../../../../config/api-config/end-points";

export const getStores = () => api.get(endPoints.stores)