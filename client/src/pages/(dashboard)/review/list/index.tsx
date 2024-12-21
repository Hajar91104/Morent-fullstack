import { useQuery } from "@tanstack/react-query";
import { columns } from "./columns";
import { QUERY_KEYS } from "@/constants/query-keys";

import { Spinner } from "@/components/shared/Spinner";
import reviewService from "@/services/review";
import { DataTable } from "@/components/shared/DataTable";

export const DashboardReviewsListPage = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [QUERY_KEYS.ADMIN_REVIEWS],
    queryFn: () => reviewService.getAll(),
  });

  console.log(data);

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return <div>Something went wrong...</div>;
  }

  const items = data?.data?.items || [];
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-primary font-bold text-2xl ">Reviews</h3>
      </div>
      <DataTable columns={columns} data={items} />
    </div>
  );
};
