import {
  MapPin,
  Briefcase,
  Clock,
  DollarSign,
  Users,
  Calendar,
  Building2,
} from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "@/redux/jobSlice";
import { toast } from "sonner";

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);

  const isInitiallyApplied =
    singleJob?.applications?.some(
      (application) => application.application?._id === user?._id,
    ) || false;

  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  const params = useParams();
  const jobId = params.id;
  const hasValidJobId = /^[a-f\d]{24}$/i.test(jobId || "");
  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    if (!hasValidJobId) {
      toast.error("This job is unavailable. Please return to the job listings.");
      return;
    }

    try {
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        {},
        { withCredentials: true },
      );

      if (res.data.success) {
        toast.success(res.data.message);
        setIsApplied(true); // Optimistically update UI
      }
    } catch (error) {
      console.error("Error applying to job:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    if (!hasValidJobId) return;

    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setSingleJob(res.data.job)); // Updates Redux for real-time UI sync
          setIsApplied(
            res.data.job.applications?.some(
              (application) => application.application?._id === user?._id,
            ) || false,
          );
        }
      } catch (error) {
        console.error("Error fetching job:", error);
      }
    };
    fetchSingleJob();
  }, [jobId, hasValidJobId, dispatch, user?._id]);

  return (
    <div className="max-w-5xl mx-auto my-10 px-4">
      {/* Header Section */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8 mb-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              {singleJob?.title}
            </h1>

            {/* Badges */}
            <div className="flex flex-wrap items-center gap-3">
              <Badge className="bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-100 font-medium px-3 py-1">
                {singleJob?.position} Positions
              </Badge>
              <Badge className="bg-orange-50 text-orange-700 hover:bg-orange-100 border border-orange-100 font-medium px-3 py-1">
                {singleJob?.jobType}
              </Badge>
              <Badge className="bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-100 font-medium px-3 py-1">
                N$ {singleJob?.salary}
              </Badge>
            </div>
          </div>

          {/* Apply Button */}
          <Button
            onClick={isApplied ? null : applyJobHandler}
            disabled={isApplied || !hasValidJobId}
            className={`w-full md:w-auto px-8 py-6 text-base font-semibold rounded-xl transition-all duration-200 ${
              isApplied
                ? "bg-gray-100 text-gray-500 cursor-not-allowed border border-gray-200"
                : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-200 hover:shadow-lg hover:shadow-indigo-200"
            }`}
          >
            {isApplied ? (
              <span className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Already Applied
              </span>
            ) : (
              "Apply Now"
            )}
          </Button>
        </div>
      </div>

      {/* Details & Description Section */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-indigo-600" />
          Job Overview
        </h2>

        {/* Grid Layout for Job Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5 mb-8">
          <DetailItem
            icon={<Building2 className="w-5 h-5 text-gray-500" />}
            label="Role"
            value={singleJob?.title}
          />
          <DetailItem
            icon={<MapPin className="w-5 h-5 text-gray-500" />}
            label="Location"
            value={singleJob?.location}
          />
          <DetailItem
            icon={<Clock className="w-5 h-5 text-gray-500" />}
            label="Experience"
            value={singleJob?.experienceLevel}
          />
          <DetailItem
            icon={<DollarSign className="w-5 h-5 text-gray-500" />}
            label="Salary"
            value={`N$ ${singleJob?.salary}`}
          />

          {/* FIX: Changed 'application' to 'applications' to match the populated database field */}
          <DetailItem
            icon={<Users className="w-5 h-5 text-gray-500" />}
            label="Total Applicants"
            value={singleJob?.applications?.length || 0}
          />

          <DetailItem
            icon={<Calendar className="w-5 h-5 text-gray-500" />}
            label="Posted Date"
            value={singleJob?.createdAt?.slice(0, 10)}
          />
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 my-8" />

        {/* Full Description */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-indigo-600 rounded-full" />
            Job Description
          </h2>
          <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed space-y-4">
            <p>{singleJob?.description}</p>
            <p>
              <strong className="text-gray-900">Requirements:</strong>
            </p>
            <ul className="list-disc pl-5 space-y-2">
              {singleJob?.requirements?.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Detail Item Component for cleaner code
const DetailItem = ({ icon, label, value }) => (
  <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-50/50 border border-gray-100 hover:bg-gray-50 transition-colors">
    <div className="mt-0.5 shrink-0">{icon}</div>
    <div>
      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
        {label}
      </p>
      <p className="text-sm font-semibold text-gray-900 mt-0.5">{value}</p>
    </div>
  </div>
);

export default JobDescription;
