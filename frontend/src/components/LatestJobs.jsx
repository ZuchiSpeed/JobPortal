import { useSelector } from "react-redux";
import LatestJobCards from "./LatestJobCards";

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);

  return (
    <div className="max-w-7xl mx-auto my-20 px-4">
      <h1 className="text-4xl font-bold">
        <span className="text-[#13993e]">Latest & Top</span> Job Opening
      </h1>

      {/* FIX: Made grid responsive (1 col mobile, 2 col tablet, 3 col desktop) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-5">
        {/* FIX: Changed '< 0' to '=== 0'. Array length can never be negative. 
            Added 'col-span-full' to center the message properly across the grid. */}
        {allJobs?.length === 0 ? (
          <p className="col-span-full text-center text-gray-500 text-lg py-10">
            No jobs available at the moment.
          </p>
        ) : (
          allJobs
            ?.slice(0, 6)
            .map((job) => <LatestJobCards key={job._id} job={job} />)
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
