import { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { ArrowLeft, Loader2, Building2 } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import useGetCompanyById from "@/hooks/useGetCompanyById";

const CompanySetup = () => {
  const params = useParams();
  useGetCompanyById(params.id);

  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  const { singleCompany } = useSelector((store) => store.company);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) formData.append("file", input.file);

    try {
      setLoading(true);
      const res = await axios.put(
        `${COMPANY_API_END_POINT}/update/${params.id}`,
        formData,
        { withCredentials: true },
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to update company");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (singleCompany) {
      setInput({
        name: singleCompany.name || "",
        description: singleCompany.description || "",
        website: singleCompany.website || "",
        location: singleCompany.location || "",
        file: null,
      });
    }
  }, [singleCompany]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50/50">
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 py-8">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {/* Form Header */}
          <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/50 flex items-center gap-4">
            <Button
              type="button"
              onClick={() => navigate("/admin/companies")}
              variant="ghost"
              size="sm"
              className="text-gray-500 hover:text-gray-900 hover:bg-gray-100"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back
            </Button>
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-indigo-600" />
              <h1 className="font-bold text-lg text-gray-900">Company Setup</h1>
            </div>
          </div>

          {/* Form Body */}
          <form onSubmit={submitHandler} className="p-6 sm:p-8 space-y-6">
            {/* Name */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
              <Label className="text-gray-700 font-medium pt-2 md:text-right">
                Company Name
              </Label>
              <div className="md:col-span-3">
                <Input
                  type="text"
                  name="name"
                  value={input.name}
                  onChange={changeEventHandler}
                  className="border-gray-200 focus-visible:ring-indigo-500 focus-visible:border-indigo-500"
                />
              </div>
            </div>

            {/* Description */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
              <Label className="text-gray-700 font-medium pt-2 md:text-right">
                Description
              </Label>
              <div className="md:col-span-3">
                <Input
                  type="text"
                  name="description"
                  value={input.description}
                  onChange={changeEventHandler}
                  className="border-gray-200 focus-visible:ring-indigo-500 focus-visible:border-indigo-500"
                />
              </div>
            </div>

            {/* Website */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
              <Label className="text-gray-700 font-medium pt-2 md:text-right">
                Website
              </Label>
              <div className="md:col-span-3">
                <Input
                  type="text"
                  name="website"
                  value={input.website}
                  onChange={changeEventHandler}
                  className="border-gray-200 focus-visible:ring-indigo-500 focus-visible:border-indigo-500"
                />
              </div>
            </div>

            {/* Location */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
              <Label className="text-gray-700 font-medium pt-2 md:text-right">
                Location
              </Label>
              <div className="md:col-span-3">
                <Input
                  type="text"
                  name="location"
                  value={input.location}
                  onChange={changeEventHandler}
                  className="border-gray-200 focus-visible:ring-indigo-500 focus-visible:border-indigo-500"
                />
              </div>
            </div>

            {/* Logo Upload */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
              <Label className="text-gray-700 font-medium pt-2 md:text-right">
                Company Logo
              </Label>
              <div className="md:col-span-3">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={changeFileHandler}
                  className="border-gray-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 file:transition-colors cursor-pointer"
                />
                <p className="text-xs text-gray-400 mt-1.5">
                  Recommended: Square image, at least 200x200px.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-6 border-t border-gray-100 flex justify-end">
              <Button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 h-11 font-medium min-w-[120px]"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CompanySetup;
