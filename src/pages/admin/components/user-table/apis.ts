import api from "../../../../config/api-config";
import { endPoints } from "../../../../config/api-config/end-points";

export const getUsers = () => api.get(endPoints.users)