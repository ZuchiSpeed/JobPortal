import { MapPin, Briefcase, Banknote, X } from "lucide-react";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Button } from "./ui/button";

const FilterCard = ({ jobs, selectedFilters, onFilterChange, onClear }) => {
  const options = [
    {
      key: "location",
      label: "Location",
      icon: <MapPin className="w-4 h-4 text-gray-500" />,
      values: [...new Set(jobs.map((job) => job.location?.trim()).filter(Boolean))]
        .sort((first, second) => first.localeCompare(second))
        .map((value) => ({ value, label: value })),
    },
    {
      key: "jobType",
      label: "Job Type",
      icon: <Briefcase className="w-4 h-4 text-gray-500" />,
      values: [...new Set(jobs.map((job) => job.jobType?.trim()).filter(Boolean))]
        .sort((first, second) => first.localeCompare(second))
        .map((value) => ({ value, label: value })),
    },
    {
      key: "salary",
      label: "Salary",
      icon: <Banknote className="w-4 h-4 text-gray-500" />,
      values: [...new Set(
        jobs
          .map((job) => Number(job.salary))
          .filter((salary) => Number.isFinite(salary)),
      )]
        .sort((first, second) => first - second)
        .map((value) => ({ value: String(value), label: `N$ ${value}` })),
    },
  ];

  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-5 sticky top-4 h-fit">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-bold text-gray-900">Filter Jobs</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClear}
          className="text-xs font-medium text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 h-8 px-2"
        >
          <X className="w-3.5 h-3.5 mr-1" /> Clear All
        </Button>
      </div>

      {/* Filter Sections */}
      <div className="space-y-6">
        {options.map((data, index) => (
          <div key={data.key}>
            <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
              {data.icon}
              {data.label}
            </h3>

            <RadioGroup
              value={selectedFilters[data.key] || "all"}
              onValueChange={(value) =>
                onFilterChange(data.key, value === "all" ? "" : value)
              }
              aria-label={data.label}
              className="space-y-2.5"
            >
              {[{ value: "all", label: `All ${data.label.toLowerCase()}s` }, ...data.values].map(
                (item, itemIndex) => (
                <div
                  key={item.value}
                  className="flex items-center space-x-2 cursor-pointer group"
                >
                  <RadioGroupItem
                    value={item.value}
                    id={`${data.key}-${itemIndex}`}
                    className="border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <Label
                    htmlFor={`${data.key}-${itemIndex}`}
                    className="text-sm text-gray-600 cursor-pointer group-hover:text-gray-900 transition-colors"
                  >
                    {item.label}
                  </Label>
                </div>
                ),
              )}
            </RadioGroup>

            {index < options.length - 1 && (
              <div className="border-t border-gray-100 mt-5" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterCard;
