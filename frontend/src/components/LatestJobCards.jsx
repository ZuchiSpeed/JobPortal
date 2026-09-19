import { Badge } from "./ui/badge";

const LatestJobCards = () => {
  return (
    <div className="w-full p-4 rounded-xl shadow-sm bg-white border border-gray-100 cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-green-200 hover:-translate-y-1 h-full flex flex-col">
      {/* Header: Company Name & Location */}
      <div className="mb-4">
        <h3 className="font-semibold text-gray-800 text-base">Company Name</h3>
        <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
          📍 Windhoek
        </p>
      </div>

      {/* Job Title & Description */}
      <div className="mb-6 grow">
        <h1 className="font-bold text-xl text-gray-900 mb-2">Job Title</h1>
        {/* line-clamp-2 ensures long descriptions don't break the card layout */}
        <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
          Work as a computer science teacher at the university of U. You will be
          responsible for teaching and grading.
        </p>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-gray-100 mt-auto">
        <Badge className="bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200">
          12 Positions
        </Badge>
        <Badge className="bg-orange-50 text-orange-700 hover:bg-orange-100 border border-orange-200">
          Part Time
        </Badge>
        <Badge className="bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200">
          24LPA
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCards;
