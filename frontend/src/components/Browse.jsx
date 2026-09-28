import { Search } from "lucide-react";
import Job from "./Job";

const randomJobs = [1, 2, 3, 4, 5, 6, 7];

const Browse = () => {
  return (
    <div className="min-h-screen bg-gray-50/50 pb-10">
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-bold text-2xl text-gray-900 flex items-center gap-2">
              <Search className="w-6 h-6 text-indigo-600" />
              Search Results
            </h1>
            <p className="text-gray-500 mt-1">
              Found{" "}
              <span className="font-semibold text-indigo-600">
                {randomJobs.length}
              </span>{" "}
              opportunities matching your criteria
            </p>
          </div>

          {/* Optional: Add a sort/filter dropdown here later */}
        </div>

        {/* Responsive Job Grid */}
        {randomJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {randomJobs.map((item, index) => (
              <Job key={index} />
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
