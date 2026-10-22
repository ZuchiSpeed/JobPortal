import { useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Building2 } from "lucide-react";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { useState } from "react";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";

const CompanyCreate = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const registerNewCompany = async () => {
    if (!companyName.trim()) {
      toast.error("Company name is required");
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        },
      );

      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        navigate(`/admin/companies/${res.data.company._id}`);
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Failed to register company",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50/50">
      <Navbar />
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-lg bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-indigo-50 rounded-lg">
              <Building2 className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h1 className="font-bold text-xl text-gray-900">New Company</h1>
              <p className="text-sm text-gray-500">
                Let's start with the basics.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="companyName"
                className="text-gray-700 font-medium"
              >
                Company Name
              </Label>
              <Input
                id="companyName"
                type="text"
                className="h-11 border-gray-200 focus-visible:ring-indigo-500 focus-visible:border-indigo-500 transition-all"
                placeholder="e.g., Acme Corp, TechNova"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && registerNewCompany()}
              />
              <p className="text-xs text-gray-400">
                You can update the logo and details in the next step.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => navigate("/admin/companies")}
                className="flex-1 border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900 h-11"
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                onClick={registerNewCompany}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 h-11 font-medium"
                disabled={isLoading}
              >
                {isLoading ? "Creating..." : "Continue"}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CompanyCreate;
