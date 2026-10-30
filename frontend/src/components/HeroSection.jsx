import { Search, Sparkles, TrendingUp } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";

const HeroSection = () => {
  const [query, setQuery] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query))
    navigate("/browse")
  }

  return (
    <div className="relative w-full bg-white overflow-hidden">
      {/* 🎨 Decorative Background Elements (Subtle blurred orbs for depth) */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#13993e]/10 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl translate-y-1/2 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 flex flex-col items-center text-center">
        
        {/* 1. Premium Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#13993e]/5 border border-[#13993e]/20 text-[#13993e] text-sm font-semibold mb-8 shadow-sm animate-fade-in-up">
          <Sparkles className="w-4 h-4" />
          <span>No.1 Job Hunting Platform</span>
        </div>

        {/* 2. Impactful Typography with Gradient Accent */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-gray-900 tracking-tight leading-[1.1] mb-6">
          Search, Apply & <br className="hidden sm:block" />
          Get Your{" "}
          <span className="bg-gradient-to-r from-[#13993e] to-[#1bc969] bg-clip-text text-transparent">
            Dream Job
          </span>
        </h1>

        {/* 3. Clean, Readable Subheading */}
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          Discover opportunities that match your skills, connect with great
          employers, and take the next step in your career.
        </p>

        {/* 4. Floating, Premium Search Bar */}
        <div className="w-full max-w-3xl mx-auto group">
          <div className="relative flex items-center bg-white border border-gray-200 rounded-2xl shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-[#13993e]/10 hover:border-[#13993e]/30 transition-all duration-300 p-2">
            
            {/* Search Icon */}
            <div className="pl-4 pr-2 text-gray-400 group-hover:text-[#13993e] transition-colors duration-300">
              <Search className="w-6 h-6" />
            </div>
            
            {/* Input Field */}
            <input
            onChange={(e) => setQuery(e.target.value)}
              type="text"
              placeholder="Job title, keywords, or company..."
              className="flex-1 px-2 py-3 text-lg outline-none text-gray-800 placeholder-gray-400 bg-transparent"
            />
            
            {/* CTA Button */}
            <Button onClick={searchJobHandler} className="bg-[#13993e] hover:bg-[#0f8a36] text-white rounded-xl px-6 md:px-8 py-6 text-base font-semibold transition-all duration-200 shadow-md shadow-[#13993e]/20 hover:shadow-lg hover:shadow-[#13993e]/30 hover:-translate-y-0.5">
              Search Jobs
            </Button>
          </div>

          {/* 5. Bonus: Popular Searches (Adds realism and utility) */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6 text-sm text-gray-500">
            <span className="flex items-center gap-1.5 font-medium">
              <TrendingUp className="w-4 h-4 text-[#13993e]" />
              Popular:
            </span>
            {["Frontend Developer", "UI/UX Designer", "Remote", "Marketing"].map((tag) => (
              <button
              onClick={() => searchJobHandler(tag)} 
                key={tag}
                className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 hover:bg-[#13993e]/10 hover:text-[#13993e] transition-colors duration-200 border border-transparent hover:border-[#13993e]/20"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default HeroSection;