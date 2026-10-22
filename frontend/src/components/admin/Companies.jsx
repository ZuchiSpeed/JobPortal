import { Plus, Search, Building2 } from "lucide-react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "@/redux/companySlice";

const Companies = () => {
  useGetAllCompanies();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input, dispatch]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50/50">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Building2 className="w-8 h-8 text-indigo-600" />
              Companies
            </h1>
            <p className="text-gray-500 mt-2 text-sm sm:text-base">
              Manage and track all your registered companies in one place.
            </p>
          </div>
          <Button
            onClick={() => navigate("/admin/companies/create")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-sm shadow-indigo-200 transition-all duration-200 flex items-center gap-2 px-5 py-2.5 font-medium"
          >
            <Plus className="w-4 h-4" />
            New Company
          </Button>
        </div>

        {/* Search Toolbar */}
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm mb-6 flex flex-col sm:flex-row items-center gap-4">
          <div className="relative flex-1 w-full sm:max-w-md group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
            <Input
              className="pl-10 w-full border-gray-200 focus-visible:ring-2 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500 transition-all duration-200"
              placeholder="Filter by company name..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <div className="text-sm text-gray-500 font-medium whitespace-nowrap">
            Search across all records
          </div>
        </div>

        {/* Table Component */}
        <CompaniesTable />
      </main>
    </div>
  );
};

export default Companies;
