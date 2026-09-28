import FilterCard from "./FilterCard";
import Footer from "./Footer";
import Job from "./Job";
import Navbar from "./shared/Navbar";

const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];

const Jobs = () => {
  return (
    // min-h-screen and flex-col ensures the footer stays at the bottom
    <div className="min-h-screen flex flex-col bg-gray-50/50">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filter Sidebar: Full width on mobile, fixed width on desktop */}
          <aside className="w-full lg:w-72 shrink-0">
            <FilterCard />
          </aside>

          {/* Job Listings Area */}
          <div className="flex-1">
            {jobsArray.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-gray-500 bg-white rounded-xl border border-gray-100">
                <p className="text-lg font-medium">No jobs found</p>
                <p className="text-sm">Try adjusting your filters</p>
              </div>
            ) : (
              // Responsive grid: 1 column on mobile, 2 on tablet, 3 on large screens
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {jobsArray.map((item, index) => (
                  <Job />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Jobs;
