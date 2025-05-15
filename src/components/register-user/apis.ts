import api from "../../config/api-config";
import { endPoints } from "../../config/api-config/end-points";

export const createUser = (values: any) => api.post(endPoints.users,values)
