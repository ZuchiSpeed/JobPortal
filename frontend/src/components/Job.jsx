import { Bookmark, MapPin, Clock } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const Job = () => {
  const navigate = useNavigate()
  const jobId = "912ebfsbfsf"

  return (
    // Added 'group' for hover effects, improved shadow, and a smooth lift animation
    <div className="group w-full p-5 rounded-xl bg-white border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-indigo-100 hover:-translate-y-1 cursor-pointer">
      {/* Header: Date & Bookmark */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <Clock className="w-3.5 h-3.5" />
          <span>2 days ago</span>
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
            src="https://img.magnific.com/free-vector/bird-colorful-gradient-design-vector_343694-2506.jpg?semt=ais_hybrid&w=740&q=80"
            alt="Company Logo"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <div>
          <h3 className="font-semibold text-gray-900">Company Name</h3>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <MapPin className="w-3 h-3" />
            <span>Namibia</span>
          </div>
        </div>
      </div>

      {/* Job Details */}
      <div className="mb-4">
        <h2 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
          Senior Frontend Developer
        </h2>
        {/* Added line-clamp-2 so long descriptions don't break the card layout */}
        <p className="text-sm text-gray-500 line-clamp-2 mt-1 leading-relaxed">
          We are looking for an experienced developer to join our team and build
          scalable web applications using React and Tailwind CSS.
        </p>
      </div>

      {/* Badges: Upgraded to modern "pill" style with soft backgrounds */}
      <div className="flex flex-wrap items-center gap-2 mb-5">
        <Badge className="bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-100 font-medium">
          12 Positions
        </Badge>
        <Badge className="bg-orange-50 text-orange-700 hover:bg-orange-100 border border-orange-100 font-medium">
          Part Time
        </Badge>
        <Badge className="bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-100 font-medium">
          24 LPA
        </Badge>
      </div>

      {/* Footer Actions */}
      <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
        <Button onClick={()=> navigate(`/description/${jobId}`)} variant="outline" className="flex-1 rounded-lg">
          Details
        </Button>
        <Button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg">
          Apply Now
        </Button>
      </div>
    </div>
  );
};

export default Job;
