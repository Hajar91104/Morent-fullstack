import { RenderIf } from "@/components/shared/RenderIf";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { QUERY_KEYS } from "@/constants/query-keys";
import { formatDate } from "@/lib/utils";
import reservationService from "@/services/reservation";
import { Rent, Reservation, ReservationStatus } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { CheckCircle2Icon, Edit2Icon, XCircleIcon } from "lucide-react";

import { toast } from "sonner";
export const columns: ColumnDef<Reservation>[] = [
  {
    accessorKey: "status",
    header: "Status",
    cell: (data) => {
      switch (data.row.original.status) {
        case ReservationStatus.Approved:
          return (
            <div className="text-green-600 capitalize">
              {data.row.original.status}
            </div>
          );
        case ReservationStatus.Pending:
          return (
            <div className="text-yellow-600 capitalize">
              {data.row.original.status}
            </div>
          );
        case ReservationStatus.Rejected:
          return (
            <div className="text-red-600 capitalize">
              {data.row.original.status}
            </div>
          );
        case ReservationStatus.Canceled:
          return (
            <div className="text-gray-600 capitalize">
              {data.row.original.status}
            </div>
          );
      }
    },
  },
  {
    accessorKey: "images",
    header: "Image",
    cell: (data) => {
      return (
        <img
          src={(data.row.original.rent as Rent).images[0]}
          alt={"Rent picture"}
          className="w-10 h-10 object-cover rounded-lg"
        />
      );
    },
  },
  {
    accessorKey: "rent.name",
    header: "Rent Name",
  },
  // {
  //   accessorKey: "rent.description",
  //   header: "Description",
  //   cell: (data) => {
  //     return (
  //       <div className="truncate max-w-[200px]">
  //         {data.row.original.description}
  //       </div>
  //     );
  //   },
  // },
  {
    accessorKey: "rent.total",
    header: "Total",
    cell: (data) => {
      return (
        <div>
          {(data.row.original.rent as Rent).total}{" "}
          {(data.row.original.rent as Rent).currency}
        </div>
      );
    },
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
    cell: (data) => {
      return <div>{formatDate(data.row.original.startDate)}</div>;
    },
  },
  {
    accessorKey: "endDate",
    header: "End Date",
    cell: (data) => {
      return <div>{formatDate(data.row.original.endDate)}</div>;
    },
  },
  {
    accessorKey: "",
    header: "Actions",
    cell: (data) => {
      const queryClient = useQueryClient();
      const { mutate } = useMutation({
        mutationFn: reservationService.changeStatus,
        onSuccess: () => {
          toast.success("Status updated successfully");
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.ADMIN_RESERVATIONS],
          });
        },
      });
      const status = data.row.original.status;
      if (
        status !== ReservationStatus.Pending &&
        status !== ReservationStatus.Approved
      ) {
        return null;
      }
      function handleStatusChange(
        status: ReservationStatus.Approved | ReservationStatus.Rejected
      ) {
        mutate({
          id: data.row.original._id,
          status,
        });
      }
      return (
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
              <Edit2Icon size={18} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Update Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <RenderIf condition={status === ReservationStatus.Pending}>
                <DropdownMenuItem
                  onClick={() => handleStatusChange(ReservationStatus.Approved)}
                  className="cursor-pointer "
                >
                  <CheckCircle2Icon className="text-green-600" />
                  <p className="text-green-600">Approve</p>
                </DropdownMenuItem>
              </RenderIf>
              <RenderIf
                condition={
                  status === ReservationStatus.Pending ||
                  status === ReservationStatus.Approved
                }
              >
                <DropdownMenuItem
                  onClick={() => handleStatusChange(ReservationStatus.Rejected)}
                  className="cursor-pointer "
                >
                  <XCircleIcon className="text-red-600" />
                  <p className="text-red-600">Reject</p>
                </DropdownMenuItem>
              </RenderIf>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
