import { useQuery } from "@tanstack/react-query";
import { columns } from "./columns";
import { QUERY_KEYS } from "@/constants/query-keys";

import rentService from "@/services/rent";
import { Spinner } from "@/components/shared/Spinner";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { paths } from "@/constants/paths";
import { DataTable } from "@/components/shared/DataTable";

export const DashboardRentListPage = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [QUERY_KEYS.ADMIN_RENTS],
    queryFn: () => rentService.getAll(),
  });

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
        <h3 className="text-primary font-bold text-2xl ">Rents</h3>
        <Button asChild>
          <Link to={paths.DASHBOARD.RENTS.CREATE}>Create Rent</Link>
        </Button>
      </div>
      <DataTable columns={columns} data={items} />
    </div>
  );
};
