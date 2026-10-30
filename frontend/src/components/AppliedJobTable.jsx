import { ArrowUpRight } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { useSelector } from "react-redux";


const getStatusBadge = (status) => {
  switch (status.toLowerCase()) {
    case "accepted":
      return (
        <Badge className="bg-green-50 text-green-700 hover:bg-green-100 border border-green-200 font-medium">
          accepted
        </Badge>
      );
    case "pending":
      return (
        <Badge className="bg-yellow-50 text-yellow-700 hover:bg-yellow-100 border border-yellow-200 font-medium">
          Pending
        </Badge>
      );
    case "rejected":
      return (
        <Badge className="bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 font-medium">
          Rejected
        </Badge>
      );
    default:
      return <Badge>{status}</Badge>;
  }
};

const AppliedJobTable = () => {
  const {allAppliedJobs} = useSelector(store => store.job)

  return (
    <div className="w-full">
      <Table className="border border-gray-100 rounded-xl overflow-hidden">
        <TableCaption className="text-gray-500 py-4 text-sm">
          A list of the jobs you have recently applied for.
        </TableCaption>

        <TableHeader className="bg-gray-50/80">
          <TableRow className="hover:bg-transparent border-b border-gray-100">
            <TableHead className="font-semibold text-gray-700 py-3">
              Date
            </TableHead>
            <TableHead className="font-semibold text-gray-700 py-3">
              Job Role
            </TableHead>
            <TableHead className="font-semibold text-gray-700 py-3">
              Company
            </TableHead>
            <TableHead className="text-right font-semibold text-gray-700 py-3">
              Status
            </TableHead>
            <TableHead className="w-10 py-3"></TableHead>{" "}
            {/* Empty column for the arrow */}
          </TableRow>
        </TableHeader>

        <TableBody>
          {allAppliedJobs.map((appliedjob) => (
            <TableRow
              key={appliedjob.id}
              className="hover:bg-gray-50/80 transition-colors border-b border-gray-50 last:border-b-0 group cursor-pointer"
            >
              <TableCell className="text-sm text-gray-600 font-medium py-4">
                {appliedjob?.job?.createdAt?.slice(0, 10)}
              </TableCell>
              <TableCell className="text-sm text-gray-900 font-semibold py-4">
                {appliedjob?.job?.title ?? "Job no longer available"}
              </TableCell>
              <TableCell className="text-sm text-gray-600 py-4">
                {appliedjob?.job?.company?.name}
              </TableCell>
              <TableCell className="text-right py-4">
                {getStatusBadge(appliedjob.status)}
              </TableCell>
              <TableCell className="text-right py-4">
                <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 transition-colors" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;
