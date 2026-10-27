import { Bookmark, MapPin, Clock } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
  const navigate = useNavigate();
  const hasValidJobId = /^[a-f\d]{24}$/i.test(job?._id || "");
  const openJob = () => {
    if (hasValidJobId) {
      navigate(`/description/${job._id}`);
    }
  };

  const getDaysAgo = (mongodbTime) => {
    if (!mongodbTime) return 0;
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  const daysAgo = getDaysAgo(job?.createdAt);

  return (
    // Added 'group' for hover effects, improved shadow, and a smooth lift animation
    <div className="group w-full p-5 rounded-xl bg-white border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-indigo-100 hover:-translate-y-1 cursor-pointer">
      {/* Header: Date & Bookmark */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <Clock className="w-3.5 h-3.5" />
          <span>{daysAgo === 0 ? "Today" : `${daysAgo} days ago`}</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
        >
          <Bookmark className="w-4 h-4" />
        </Button>
      </div>

      {/* Company Info */}
      <div className="flex items-center gap-3 mb-3">
        {/* Removed the weird Button wrapper. Added a clean border and shadow to the Avatar */}
        <Avatar className="h-12 w-12 border border-gray-100 shadow-sm">
          <AvatarImage
            src={
              job?.company?.logo ||
              "https://img.magnific.com/free-vector/bird-colorful-gradient-design-vector_343694-2506.jpg?semt=ais_hybrid&w=740&q=80"
            }
            alt="Company Logo"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <div>
          <h3 className="font-semibold text-gray-900">{job?.company?.name}</h3>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <MapPin className="w-3 h-3" />
            <span>{job?.location}</span>
          </div>
        </div>
      </div>

      {/* Job Details */}
      <div className="mb-4">
        <h2 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
          {job?.title}
        </h2>
        {/* Added line-clamp-2 so long descriptions don't break the card layout */}
        <p className="text-sm text-gray-500 line-clamp-2 mt-1 leading-relaxed">
          {job?.description}
        </p>
      </div>

      {/* Badges: Upgraded to modern "pill" style with soft backgrounds */}
      <div className="flex flex-wrap items-center gap-2 mb-5">
        <Badge className="bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-100 font-medium">
          {job?.position} Positions
        </Badge>
        <Badge className="bg-orange-50 text-orange-700 hover:bg-orange-100 border border-orange-100 font-medium">
          {job?.jobType}
        </Badge>
        <Badge className="bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-100 font-medium">
          {job?.salary} LPA
        </Badge>
      </div>

      {/* Footer Actions */}
      <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
        <Button
          onClick={openJob}
          disabled={!hasValidJobId}
          variant="outline"
          className="flex-1 rounded-lg"
        >
          Details
        </Button>
        <Button
          onClick={openJob}
          disabled={!hasValidJobId}
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg"
        >
          Apply Now
        </Button>
      </div>
    </div>
  );
};

export default Job;
