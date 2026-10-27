import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal, Briefcase, Eye } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminJobsTable = () => {
  const { allAdminJobs = [], searchJobByText = "" } = useSelector(
    (store) => store.job || {},
  );
  const navigate = useNavigate();

  // ✅ Compute filtered jobs directly during render.
  // No useState or useEffect needed. This guarantees NO infinite loops.
  const filterJobs = (allAdminJobs || []).filter((job) => {
    if (!searchJobByText) return true;

    const searchLower = searchJobByText.toLowerCase();
    return (
      job?.title?.toLowerCase().includes(searchLower) ||
      job?.company?.name?.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableCaption className="py-4 text-gray-500">
            A list of your recently posted jobs
          </TableCaption>
          <TableHeader>
            <TableRow className="bg-gray-50/50 hover:bg-gray-50/50 border-b border-gray-100">
              <TableHead className="font-semibold text-gray-700">
                Company
              </TableHead>
              <TableHead className="font-semibold text-gray-700">
                Role
              </TableHead>
              <TableHead className="font-semibold text-gray-700">
                Date Posted
              </TableHead>
              <TableHead className="font-semibold text-gray-700 text-right">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filterJobs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-48 text-center">
                  <div className="flex flex-col items-center justify-center text-gray-400">
                    <Briefcase className="w-10 h-10 mb-2 opacity-50" />
                    <p className="text-sm font-medium text-gray-500">
                      No jobs found
                    </p>
                    <p className="text-xs text-gray-400">
                      Try adjusting your search or post a new job.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filterJobs.map((job) => (
                <TableRow
                  key={job._id}
                  className="group hover:bg-indigo-50/30 transition-colors duration-200"
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border border-gray-100 shadow-sm">
                        <AvatarImage
                          src={
                            job.company?.logo || "https://github.com/shadcn.png"
                          }
                          alt={job.company?.name}
                        />
                        <AvatarFallback className="bg-indigo-100 text-indigo-700 font-semibold text-sm">
                          {job.company?.name?.substring(0, 2).toUpperCase() ||
                            "CO"}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-gray-900 hidden sm:block">
                        {job.company?.name || "Unknown Company"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                      {job?.title}
                    </div>
                    <div className="text-xs text-gray-500 sm:hidden">
                      {job?.company?.name}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {job?.createdAt
                      ? new Date(job.createdAt).toLocaleDateString()
                      : "N/A"}
                  </TableCell>
                  <TableCell className="text-right">
                    <Popover>
                      <PopoverTrigger asChild>
                        <button className="h-8 w-8 inline-flex items-center justify-center rounded-md text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all">
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </PopoverTrigger>
                      
                      {/* ✅ FIX: Unified styling for both dropdown items, added align="end" and w-40 */}
                      <PopoverContent className="w-40 p-1 shadow-md border-gray-100 rounded-lg" align="end">
                        <div
                          onClick={() => navigate(`/admin/jobs/${job._id}`)}
                          className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 rounded-md cursor-pointer hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                          <span>Edit Job</span>
                        </div>
                        
                        <div
                          onClick={() =>
                            navigate(`/admin/jobs/${job._id}/applicants`)
                          }
                          className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 rounded-md cursor-pointer hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                          <span>Applicants</span>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminJobsTable;