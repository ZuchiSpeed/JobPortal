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

// Realistic mock data
const appliedJobs = [
  {
    id: 1,
    date: "17 Jan 2026",
    role: "Backend Developer",
    company: "Telecom Namibia",
    status: "Selected",
  },
  {
    id: 2,
    date: "15 Jan 2026",
    role: "Frontend Engineer",
    company: "MTC Namibia",
    status: "Pending",
  },
  {
    id: 3,
    date: "10 Jan 2026",
    role: "Data Analyst",
    company: "Bank Windhoek",
    status: "Interview",
  },
  {
    id: 4,
    date: "05 Jan 2026",
    role: "UI/UX Designer",
    company: "Namibia Breweries",
    status: "Rejected",
  },
];

const getStatusBadge = (status) => {
  switch (status.toLowerCase()) {
    case "selected":
      return (
        <Badge className="bg-green-50 text-green-700 hover:bg-green-100 border border-green-200 font-medium">
          Selected
        </Badge>
      );
    case "pending":
      return (
        <Badge className="bg-yellow-50 text-yellow-700 hover:bg-yellow-100 border border-yellow-200 font-medium">
          Pending
        </Badge>
      );
    case "interview":
      return (
        <Badge className="bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 font-medium">
          Interview
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
          {appliedJobs.map((job) => (
            <TableRow
              key={job.id}
              className="hover:bg-gray-50/80 transition-colors border-b border-gray-50 last:border-b-0 group cursor-pointer"
            >
              <TableCell className="text-sm text-gray-600 font-medium py-4">
                {job.date}
              </TableCell>
              <TableCell className="text-sm text-gray-900 font-semibold py-4">
                {job.role}
              </TableCell>
              <TableCell className="text-sm text-gray-600 py-4">
                {job.company}
              </TableCell>
              <TableCell className="text-right py-4">
                {getStatusBadge(job.status)}
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
