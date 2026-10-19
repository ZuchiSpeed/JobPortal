import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Loader2, User, Mail, Phone, FileText, Briefcase } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

const UpdateProfileDialog = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);

  // FIX 3: Use .join(", ") to make skills a string, and add fallbacks ("") to prevent undefined errors
  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.join(", ") || "",
    file: null,
  });

  // Handle standard text input changes
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // Handle file selection
  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  // Handle form submission
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Construct FormData for multipart/form-data request
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills); // Backend will split this string by comma

    if (input.file && input.file instanceof File) {
      formData.append("file", input.file);
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${USER_API_END_POINT}/profile/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true, // Required to send the HTTP-only cookie for authentication
        },
      );

      if (res.data.success) {
        dispatch(setUser(res.data.user)); // Update Redux store with new user data
        toast.success(res.data.message);
        setOpen(false); // Close the dialog
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false); // Always turn off loading, even if it fails
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px] p-6 bg-white rounded-2xl shadow-2xl border border-gray-100">
        <DialogHeader className="space-y-1 mb-2">
          <DialogTitle className="text-xl font-bold text-gray-900">
            Update Profile
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Make changes to your personal and professional details below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={submitHandler} className="space-y-5 py-2">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
              Full Name
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="name"
                name="fullname"
                type="text"
                value={input.fullname}
                onChange={changeEventHandler}
                className="pl-9 h-10 bg-gray-50/50 border-gray-200 focus:bg-white transition-colors"
                placeholder="John Doe"
              />
            </div>
          </div>

          {/* Email & Phone Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={input.email}
                  onChange={changeEventHandler}
                  className="pl-9 h-10 bg-gray-50/50 border-gray-200 focus:bg-white transition-colors"
                  placeholder="john@example.com"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="number"
                className="text-sm font-medium text-gray-700"
              >
                Phone
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="number"
                  name="phoneNumber"
                  value={input.phoneNumber}
                  onChange={changeEventHandler}
                  className="pl-9 h-10 bg-gray-50/50 border-gray-200 focus:bg-white transition-colors"
                  placeholder="+264 81 123 4567"
                />
              </div>
            </div>
          </div>

          {/* Bio & Skills */}
          <div className="space-y-2">
            <Label htmlFor="bio" className="text-sm font-medium text-gray-700">
              Short Bio
            </Label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="bio"
                name="bio"
                value={input.bio}
                onChange={changeEventHandler}
                className="pl-9 h-10 bg-gray-50/50 border-gray-200 focus:bg-white transition-colors"
                placeholder="Experienced developer..."
              />
            </div>
          </div>

          {/* Skills Input */}
          <div className="space-y-2">
            <Label
              htmlFor="skills"
              className="text-sm font-medium text-gray-700"
            >
              Skills (comma separated)
            </Label>
            <Input
              id="skills"
              name="skills"
              value={input.skills}
              onChange={changeEventHandler}
              className="h-10 bg-gray-50/50 border-gray-200 focus:bg-white transition-colors"
              placeholder="React, Node.js, Tailwind"
            />
          </div>

          {/* Modern File Upload Zone */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Resume / CV
            </Label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-gray-200 border-dashed rounded-xl cursor-pointer bg-gray-50/50 hover:bg-indigo-50/50 hover:border-indigo-300 transition-all group">
                <div className="flex flex-col items-center justify-center pt-4 pb-4">
                  <FileText className="w-7 h-7 mb-2 text-gray-400 group-hover:text-indigo-500 transition-colors" />
                  <p className="mb-1 text-sm text-gray-500">
                    <span className="font-semibold text-indigo-600">
                      Click to upload
                    </span>{" "}
                    or drag and drop
                  </p>
                  <p className="text-xs text-gray-400">PDF only (MAX. 5MB)</p>
                </div>
                <Input
                  id="file"
                  name="file"
                  type="file"
                  className="hidden"
                  onChange={fileChangeHandler}
                  accept="application/pdf"
                />
              </label>
            </div>
            {input.file ? (
              <p className="text-xs text-indigo-600 mt-1">
                Selected: {input.file.name}
              </p>
            ) : user?.profile?.resumeOriginalName ? (
              <p className="text-xs text-gray-500 mt-1">
                Current: {user.profile.resumeOriginalName}
              </p>
            ) : null}
          </div>

          {/* Form Actions */}
          <DialogFooter className="pt-2">
            {loading ? (
              <Button
                disabled
                className="w-full h-10 bg-indigo-600 hover:bg-indigo-700"
              >
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving Changes...
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full h-10 bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-sm shadow-indigo-200 transition-all"
              >
                Save Changes
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileDialog;
