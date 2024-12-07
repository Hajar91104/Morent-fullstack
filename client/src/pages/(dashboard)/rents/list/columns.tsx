import { Rent } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { CheckIcon, XIcon } from "lucide-react";

export const columns: ColumnDef<Rent>[] = [
  {
    accessorKey: "images",
    header: "Image",
    cell: (data) => {
      return (
        <img
          src={data.row.original.images[0]}
          alt={"Rent picture"}
          className="w-10 h-10 object-cover rounded-lg"
        />
      );
    },
  },
  {
    accessorKey: "category.name",
    header: "Category",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: (data) => {
      return (
        <div className="truncate max-w-[200px]">
          {data.row.original.description}
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: (data) => {
      return (
        <div>
          {data.row.original.price} {data.row.original.currency}
        </div>
      );
    },
  },
  {
    accessorKey: "discount",
    header: "Discount",
  },
  {
    accessorKey: "capacity",
    header: "Capacity",
  },
  {
    accessorKey: "fuel",
    header: "Fuel",
  },
  {
    accessorKey: "gearbox",
    header: "Gearbox",
  },
  {
    accessorKey: "ShowInRecommendation",
    header: "Show In Recommendation",
    cell: (data) => {
      return (
        <div>
          {data.row.original.showInRecommendation ? (
            <CheckIcon className="text-green-500" />
          ) : (
            <XIcon className="text-red-500" />
          )}
        </div>
      );
    },
  },
];
