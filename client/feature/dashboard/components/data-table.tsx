import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowRight, CircleUserRound, Eye, ScanEye } from "lucide-react";

const data: GameList[] = [
  {
    opponent: "Alice",
    result: "win",
    color: "white",
    date: "2h ago",
  },
  {
    opponent: "Bob",
    result: "lose",
    color: "black",
    date: "yesterday",
  },
  {
    opponent: "Bob",
    result: "lose",
    color: "black",
    date: "yesterday",
  },
];

export type GameList = {
  opponent: string;
  result: "win" | "lose" | "draw";
  color: "white" | "black";
  date: string;
};

export const columns: ColumnDef<GameList>[] = [
  {
    accessorKey: "opponent",
    header: () => <div>Opponent</div>,
    cell: ({ row }) => <div>{row.getValue("opponent")}</div>,
  },
  {
    accessorKey: "result",
    header: () => <div>Result</div>,
    cell: ({ row }) => <div>{row.getValue<string>("result")}</div>,
  },
  {
    accessorKey: "color",
    header: () => <div>Color</div>,
    cell: ({ row }) => <div>{row.getValue("color")}</div>,
  },
  {
    accessorKey: "date",
    header: () => <div>Date</div>,
    cell: ({ row }) => <div>{row.getValue("date")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="size-5 cursor-pointer">
              <ArrowRight />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" side="right">
            <DropdownMenuGroup aria-orientation="vertical">
              <DropdownMenuItem className="bg-primary">
                <ScanEye className="size-4" />
                View Game
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CircleUserRound className="size-4" />
                View Account
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

const DataTable = () => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="h-24 text-center">
              No Result
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default DataTable;
