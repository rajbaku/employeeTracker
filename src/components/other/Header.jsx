import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Header = (props) => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Fetch user data from localStorage
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      try {
        const userData = JSON.parse(loggedInUser); 
        if (userData?.role === "employee") {
          setUsername(userData?.data?.firstName || "Guest");
        } else if (userData?.role === "admin") {
          setUsername(userData?.data?.adminName || "Admin");
        } else {
          setUsername("Guest");
        }
      } catch (error) {
        console.error("Failed to parse user data:", error);
        setUsername("Guest");
      }
    } else {
      setUsername("Guest");
    }
  }, []);

  const logOutUser = () => {
    localStorage.setItem("loggedInUser", "");
    props.changeUser("");
    toast.success("Logout Successfully", {
      position: "top-right",
    });
  };

  return (
    <div className="flex items-end justify-between">
      <h1 className="text-2xl font-medium">
        Hello <br /> <span className="text-3xl font-semibold"> {username || "Guest"} 👋</span>
      </h1>
      <button
        onClick={logOutUser}
        className="bg-red-600 text-base font-medium text-white px-5 py-2 rounded-sm"
      >
        Log Out
      </button>
    </div>
  );
};

export default Header;
