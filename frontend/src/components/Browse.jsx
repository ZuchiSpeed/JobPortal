import { Search } from "lucide-react";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { setSearchedQuery } from "@/redux/jobSlice";

const Browse = () => {
  useGetAllJobs()
  const {allJobs} = useSelector(store => store.job)
  const dispatch = useDispatch()

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""))
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50/50 pb-10">
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-bold text-2xl text-gray-900 flex items-center gap-2">
              <Search className="w-6 h-6 text-indigo-600" />
              ({allJobs.length})
              Search Results
            </h1>
            <p className="text-gray-500 mt-1">
              Found{" "}
              <span className="font-semibold text-indigo-600">
                {allJobs.length}
              </span>{" "}
              opportunities matching your criteria
            </p>
          </div>

          {/* Optional: Add a sort/filter dropdown here later */}
        </div>

        {/* Responsive Job Grid */}
        {allJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allJobs.map((job) => (
              <Job key={job._id} job={job} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
            <p className="text-gray-500 text-lg">
              No jobs found matching your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;
