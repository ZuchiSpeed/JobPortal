import { useState } from "react";
import { MapPin, Briefcase, Banknote, X } from "lucide-react";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Button } from "./ui/button";

// DATA CONFIGURATION
// We keep the filter options in an array of objects.
// This makes it incredibly easy to add, remove, or change filter categories
// later without touching the main JSX logic (DRY principle).

// Better data filer descriptions
const filterData = [
  {
    filterType: "Location", // This string becomes the "key" in our state object
    icon: <MapPin className="w-4 h-4 text-gray-500" />,
    array: ["Windhoek", "Swakopmund", "Arandis"],
  },
  {
    filterType: "Industry",
    icon: <Briefcase className="w-4 h-4 text-gray-500" />,
    array: ["Frontend Developer", "Backend Developer", "Fullstack Developer"],
  },
  {
    filterType: "Salary",
    icon: <Banknote className="w-4 h-4 text-gray-500" />,
    array: ["0-40k", "42-67k", "70k-95k"],
  },
];

const FilterCard = () => {
  // STATE MANAGEMENT
  // We use a single object to track selections for ALL categories.
  // State to track selections independently for each category
  const [selectedFilters, setSelectedFilters] = useState({});

  // HELPER FUNCTION
  // Resets the state object to empty, effectively unchecking all radio buttons.
  const handleClearAll = () => {
    setSelectedFilters({});
  };

  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-5 sticky top-4 h-fit">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-bold text-gray-900">Filter Jobs</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClearAll}
          className="text-xs font-medium text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 h-8 px-2"
        >
          <X className="w-3.5 h-3.5 mr-1" /> Clear All
        </Button>
      </div>

      {/* Filter Sections */}
      <div className="space-y-6">
        {filterData.map((data, index) => (
          <div key={index}>
            {/* Category Title with Icon */}
            <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
              {data.icon}
              {data.filterType}
            </h3>

            {/* Each category gets its OWN RadioGroup so selections don't conflict */}
            <RadioGroup
              // The value is whatever is currently saved in state for this specific category.
              // If nothing is selected yet, it defaults to an empty string "".
              value={selectedFilters[data.filterType] || ""}
              // When a user clicks an option, we update the state.
              // We spread the existing state (...selectedFilters) to keep other
              // categories intact, and then update ONLY the specific category
              // that was clicked ([data.filterType]: value).
              onValueChange={(value) =>
                setSelectedFilters({
                  ...selectedFilters,
                  [data.filterType]: value,
                })
              }
              className="space-y-2.5"
            >
              {/* Loop through the options for this specific category */}
              {data.array.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className="flex items-center space-x-2 cursor-pointer group"
                >
                  {/* 
                    The 'id' and 'htmlFor' must match perfectly. 
                    This is an accessibility best practice that also allows 
                    the user to click the text label to select the radio button, 
                    not just the tiny circle itself.
                  */}
                  <RadioGroupItem
                    value={item}
                    id={`${data.filterType}-${itemIndex}`}
                    className="border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <Label
                    htmlFor={`${data.filterType}-${itemIndex}`}
                    className="text-sm text-gray-600 cursor-pointer group-hover:text-gray-900 transition-colors"
                  >
                    {item}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            {/* Subtle divider between sections */}
            {index < filterData.length - 1 && (
              <div className="border-t border-gray-100 mt-5" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterCard;
