import { Briefcase, Contact, FileText, Mail, Pen } from "lucide-react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import AppliedJobTable from "./AppliedJobTable";
import { useState } from "react";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";

const Profile = () => {
  const [open, setOpen] = useState(false);

  // Retrieve the current user data from the Redux store
  const { user } = useSelector((store) => store.auth);

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Profile Header Card */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 md:p-8 mb-6 transition-all hover:shadow-md">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex items-center gap-5">
              <Avatar className="h-24 w-24 border-2 border-indigo-50 shadow-md">
                <AvatarImage
                  src={
                    user?.profile?.profilePhoto ||
                    "https://github.com/shadcn.png"
                  }
                  alt="Profile"
                />
                <AvatarFallback className="text-2xl bg-indigo-50 text-indigo-600 font-bold">
                  {user?.fullname?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="font-bold text-2xl text-gray-900">
                  {user?.fullname}
                </h1>
                <p className="text-gray-500 mt-1 max-w-md leading-relaxed">
                  {user?.profile?.bio || "No bio added yet."}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              className="rounded-full px-4 gap-2 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 transition-colors"
              onClick={() => setOpen(true)}
            >
              <Pen className="w-4 h-4" />
              <span>Edit Profile</span>
            </Button>
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 pt-6 border-t border-gray-100">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50/50 border border-gray-100">
              <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                  Email
                </p>
                <span className="text-sm font-semibold text-gray-900">
                  {user?.email}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50/50 border border-gray-100">
              <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
                <Contact className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                  Phone
                </p>
                <span className="text-sm font-semibold text-gray-900">
                  {user?.phoneNumber || "Not provided"}
                </span>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="mt-8">
            <h2 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-indigo-600" /> Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {/* FIX 1: Added optional chaining before .length */}
              {user?.profile?.skills?.length > 0 ? (
                user?.profile?.skills.map((item, index) => (
                  <Badge
                    key={index}
                    className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-100 px-3 py-1 text-sm font-medium transition-colors"
                  >
                    {item}
                  </Badge>
                ))
              ) : (
                <span className="text-sm text-gray-400 italic">
                  No skills added yet
                </span>
              )}
            </div>
          </div>

          {/* Resume Section */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <h2 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-600" /> Resume
            </h2>
            {user?.profile?.resume ? (
              <a
                href={user?.profile?.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 p-4 rounded-xl border border-dashed border-indigo-200 bg-indigo-50/30 hover:bg-indigo-50 hover:border-indigo-300 transition-all cursor-pointer"
              >
                <div className="p-2 bg-white rounded-lg shadow-sm text-red-500 group-hover:scale-110 transition-transform">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-indigo-900 group-hover:text-indigo-700">
                    View Resume
                  </p>
                  <p className="text-xs text-indigo-600/70">
                    Click to view or download
                    {user?.profile?.resumeOriginalName
                      ? `: ${user.profile.resumeOriginalName}`
                      : ""}
                  </p>
                </div>
              </a>
            ) : (
              <div className="p-4 rounded-xl border border-dashed border-gray-200 bg-gray-50 text-center">
                <p className="text-sm text-gray-500">No resume uploaded</p>
              </div>
            )}
          </div>
        </div>

        {/* Applied Jobs Card */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 md:p-8">
          <h2 className="font-bold text-xl text-gray-900 mb-6 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-indigo-600" /> Applied Jobs
          </h2>
          <AppliedJobTable />
        </div>
      </div>

      {/* Profile Update Modal */}
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
