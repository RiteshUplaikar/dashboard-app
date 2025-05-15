import api from "../../../../config/api-config";
import { endPoints } from "../../../../config/api-config/end-points";

export const getStats = () => api.get(endPoints.stats);
