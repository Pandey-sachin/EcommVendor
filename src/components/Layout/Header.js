import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout } from "../../reducers/authSlice";

import {
  Search,
  User,
  ShoppingCart,
  LogOut,
  Settings,
  ChevronDown,
} from "lucide-react";
import Logo from "./Logo";
import api from "../../common/api";
const Header = () => {
  const user = useSelector((state) => state.auth.user);
  console.log(user)
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const profileRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogOut = async () => {
    try {
      const response = await fetch(api.SignOut.url, {
        method: api.SignOut.method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!response.ok)
        throw new Error(`${response.status} - ${response.statusText}`);

      const data = await response.json();
      toast.success(data.message);
      dispatch(logout());
      navigate("/");
    } catch (error) {
      toast.error(`Sign out failed: ${error.message}`);
    }
  };
  
  return (
    <header className="bg-white border-b border-gray-100">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-8 flex-wrap sm:flex-nowrap">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <div className="text-2xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
              <Logo w={50} h={50} />
            </div>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl sm:order-none order-2 w-full mt-4 sm:mt-0">
            <div
              className={`relative transition-all duration-200 ${
                searchFocused ? "scale-105" : ""
              }`}
            >
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2.5 rounded-full bg-gray-50 border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all"
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-6 sm:order-none order-3">
            {/* Profile */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 hover:text-red-600 transition-colors"
              >
                <User className="w-5 h-5" />
                <span className="text-sm font-medium hidden md:block">
                  {user?.username || "Account"}
                </span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50">
                  {user?.username ? (
                    <>
                      {user.role.includes("seller") && (
                        <Link
                          to="/vendor-panel"
                          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          <Settings className="w-4 h-4" />
                          Vendor Panel
                        </Link>
                      )}

                      <button
                        onClick={handleLogOut}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-50 w-full text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <Link
                      to="/login"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Sign In
                    </Link>
                  )}
                </div>
              )}
            </div>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative hover:text-red-600 transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                0
              </span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
