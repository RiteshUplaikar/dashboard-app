import { useQuery } from "react-query";
import { getStats } from "./apis";

type StatsResponse = {
  totalUsers: number;
  totalStores: number;
  totalRatings: number;
};

export const useStats = () => {
  const { data, isLoading } = useQuery<any>({
    queryKey: ["stats"],
    queryFn: () => getStats(),
  });

  return {
    data: data ?? {
      totalUsers: 0,
      totalStores: 0,
      totalRatings: 0,
    },
    isLoading,
  };
};
