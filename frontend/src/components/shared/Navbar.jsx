import { useState } from "react";
import { LogOut, User2, Menu, X, Briefcase } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/authSlice";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // To highlight the active page
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
        setIsMobileMenuOpen(false);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  // Helper to check if a link is currently active
  const isActive = (path) => location.pathname === path;

  // Dynamic links based on user role
  const navLinks = user?.role === "recruiter" 
    ? [
        { name: "Companies", path: "/admin/companies" },
        { name: "Jobs", path: "/admin/jobs" },
      ]
    : [
        { name: "Home", path: "/" },
        { name: "Jobs", path: "/jobs" },
        { name: "Browse", path: "/browse" },
      ];

  return (
    // 🎨 Sticky, frosted-glass header with a subtle bottom border
    <nav className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md transition-all duration-300">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
        
        {/* 1. Branded Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0a9657]/10 text-[#0a9657] transition-transform duration-300 group-hover:scale-105 group-hover:bg-[#0a9657]/20">
            <Briefcase className="h-5 w-5" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-gray-900">
            Job<span className="text-[#0a9657]">Portal</span>
          </h1>
        </Link>

        {/* 2. Desktop Navigation Links */}
        <div className="hidden md:flex md:items-center md:gap-1">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive(link.path)
                      ? "text-[#0a9657] bg-[#0a9657]/5"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* 3. Auth / User Section */}
        <div className="flex items-center gap-4">
          {!user ? (
            <div className="hidden md:flex items-center gap-3">
              <Link to="/login">
                <Button variant="ghost" className="text-gray-700 hover:text-[#0a9657] hover:bg-[#0a9657]/5 font-medium">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#0a9657] hover:bg-[#08804a] text-white shadow-md shadow-[#0a9657]/20 transition-all duration-200 hover:-translate-y-0.5 font-medium">
                  Sign Up
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <button className="flex items-center gap-2 rounded-full border border-gray-200 bg-white p-1 pr-3 shadow-sm transition-all hover:border-[#0a9657]/30 hover:shadow-md">
                  <Avatar className="h-8 w-8 border border-gray-100">
                    <AvatarImage src={user.profile?.profilePhoto || "https://github.com/shadcn.png"} alt={user.fullname} />
                    <AvatarFallback className="bg-[#0a9657]/10 text-[#0a9657] text-xs font-bold">
                      {user.fullname?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden lg:block text-sm font-medium text-gray-700">
                    {user.fullname}
                  </span>
                </button>
              </PopoverTrigger>

              {/* Premium User Dropdown */}
              <PopoverContent className="w-72 p-0 border-gray-100 shadow-xl rounded-xl overflow-hidden" align="end">
                {/* User Info Header */}
                <div className="bg-gray-50/50 p-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border border-gray-200">
                      <AvatarImage src={user.profile?.profilePhoto || "https://github.com/shadcn.png"} alt={user.fullname} />
                      <AvatarFallback className="bg-[#0a9657]/10 text-[#0a9657] font-bold">
                        {user.fullname?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col overflow-hidden">
                      <h4 className="font-semibold text-gray-900 text-sm truncate">{user.fullname}</h4>
                      <p className="text-xs text-gray-500 truncate max-w-[150px]">
                        {user?.profile?.bio || "No bio available"}
                      </p>
                      <span className="text-[10px] font-semibold text-[#0a9657] bg-[#0a9657]/10 px-2 py-0.5 rounded-full w-fit mt-1 capitalize">
                        {user.role}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="p-2 space-y-1">
                  {user.role === "student" && (
                    <Link
                      to="/profile"
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-[#0a9657]/5 hover:text-[#0a9657]"
                    >
                      <User2 className="h-4 w-4" />
                      <span>View Profile</span>
                    </Link>
                  )}
                  
                  <button
                    onClick={logoutHandler}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-600 transition-colors hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          )}

          {/* 4. Mobile Menu Toggle Button */}
          <button
            className="md:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* 5. Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <ul className="space-y-2">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive(link.path)
                      ? "bg-[#0a9657]/10 text-[#0a9657]"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            
            {!user && (
              <>
                <li className="pt-2 border-t border-gray-100">
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full justify-center border-gray-200">
                      Login
                    </Button>
                  </Link>
                </li>
                <li>
                  <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full justify-center bg-[#0a9657] hover:bg-[#08804a]">
                      Sign Up
                    </Button>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;