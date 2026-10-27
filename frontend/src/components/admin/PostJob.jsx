import { useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { Briefcase, AlertCircle, Send, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";

const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { companies } = useSelector((store) => store.company);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // Handler for the Shadcn Select component
  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value,
    );
    setInput({ ...input, companyId: selectedCompany._id });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      // Tip: Use optional chaining (error.response?.data?.message) to prevent crashes if the network fails completely
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50/50">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-8">
        {/* Header Section */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-indigo-50 rounded-xl">
            <Briefcase className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Post a New Job</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Fill in the details to create a new job listing.
            </p>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
          <form onSubmit={submitHandler} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title" className="text-gray-700 font-medium">
                  Job Title
                </Label>
                <Input
                  id="title"
                  type="text"
                  name="title"
                  placeholder="e.g. Frontend Developer"
                  value={input.title}
                  onChange={changeEventHandler}
                  className="h-11 border-gray-200 focus-visible:ring-indigo-500 focus-visible:border-indigo-500"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label
                  htmlFor="description"
                  className="text-gray-700 font-medium"
                >
                  Description
                </Label>
                <Input
                  id="description"
                  type="text"
                  name="description"
                  placeholder="Brief summary of the role"
                  value={input.description}
                  onChange={changeEventHandler}
                  className="h-11 border-gray-200 focus-visible:ring-indigo-500 focus-visible:border-indigo-500"
                />
              </div>

              {/* Requirements */}
              <div className="space-y-2">
                <Label
                  htmlFor="requirements"
                  className="text-gray-700 font-medium"
                >
                  Requirements
                </Label>
                <Input
                  id="requirements"
                  type="text"
                  name="requirements"
                  placeholder="e.g. React, Node.js, MongoDB"
                  value={input.requirements}
                  onChange={changeEventHandler}
                  className="h-11 border-gray-200 focus-visible:ring-indigo-500 focus-visible:border-indigo-500"
                />
                <p className="text-xs text-gray-400">
                  Separate multiple requirements with commas.
                </p>
              </div>

              {/* Salary */}
              <div className="space-y-2">
                <Label htmlFor="salary" className="text-gray-700 font-medium">
                  Salary (N$)
                </Label>
                <Input
                  id="salary"
                  type="text"
                  name="salary"
                  placeholder="e.g. 10 - 15"
                  value={input.salary}
                  onChange={changeEventHandler}
                  className="h-11 border-gray-200 focus-visible:ring-indigo-500 focus-visible:border-indigo-500"
                />
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location" className="text-gray-700 font-medium">
                  Location
                </Label>
                <Input
                  id="location"
                  type="text"
                  name="location"
                  placeholder="e.g. Remote, New York"
                  value={input.location}
                  onChange={changeEventHandler}
                  className="h-11 border-gray-200 focus-visible:ring-indigo-500 focus-visible:border-indigo-500"
                />
              </div>

              {/* Job Type */}
              <div className="space-y-2">
                <Label htmlFor="jobType" className="text-gray-700 font-medium">
                  Job Type
                </Label>
                <Input
                  id="jobType"
                  type="text"
                  name="jobType"
                  placeholder="e.g. Full-time, Part-time"
                  value={input.jobType}
                  onChange={changeEventHandler}
                  className="h-11 border-gray-200 focus-visible:ring-indigo-500 focus-visible:border-indigo-500"
                />
              </div>

              {/* Experience Level */}
              <div className="space-y-2">
                <Label
                  htmlFor="experience"
                  className="text-gray-700 font-medium"
                >
                  Experience Level
                </Label>
                <Input
                  id="experience"
                  type="text"
                  name="experience"
                  placeholder="e.g. 2+ years"
                  value={input.experience}
                  onChange={changeEventHandler}
                  className="h-11 border-gray-200 focus-visible:ring-indigo-500 focus-visible:border-indigo-500"
                />
              </div>

              {/* No of Positions */}
              <div className="space-y-2">
                <Label htmlFor="position" className="text-gray-700 font-medium">
                  No. of Positions
                </Label>
                <Input
                  id="position"
                  type="number"
                  name="position"
                  placeholder="1"
                  value={input.position}
                  onChange={changeEventHandler}
                  className="h-11 border-gray-200 focus-visible:ring-indigo-500 focus-visible:border-indigo-500"
                />
              </div>

              {/* Company Select (Spans full width on all screens) */}
              <div className="md:col-span-2 space-y-2">
                <Label className="text-gray-700 font-medium">Company</Label>
                {companies.length > 0 ? (
                  <Select
                    onValueChange={selectChangeHandler}
                    value={input.companyId}
                  >
                    <SelectTrigger className="w-full h-11 border-gray-200 focus:ring-indigo-500">
                      <SelectValue placeholder="Select a registered company" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {companies.map((company) => (
                          <SelectItem
                            key={company._id}
                            value={company?.name?.toLowerCase()}
                          >
                            {company.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                ) : (
                  // ✅ FIX: Beautiful warning state if no companies exist
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3 text-amber-800">
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">
                        No companies registered
                      </p>
                      <p className="text-xs text-amber-700 mt-1">
                        Please register a company in the Companies tab before
                        posting a job.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                className="w-full sm:w-auto border-gray-200 text-gray-600 hover:bg-gray-50 h-11"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white h-11 px-8 font-medium flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Posting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Post New Job
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default PostJob;
