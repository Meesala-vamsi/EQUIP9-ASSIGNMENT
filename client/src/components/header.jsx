import React from "react";
import { TbSquareRoundedLetterTFilled } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { resetTokenAndCredentials } from "../store/slices/authSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.auth);
  const onClickLogout = () => {
    dispatch(resetTokenAndCredentials());
    sessionStorage.clear();
    navigate("/auth/login");
    toast.success("Logged out successfully.");
  };

  return (
    <header className="flex justify-between items-center px-5 py-4">
      <TbSquareRoundedLetterTFilled className="text-xl md:text-3xl text-red-600" />
      <div className="flex gap-9 items-center">
        <h1 className="text-xs md:text-sm tracking-widest">
          Welcome, <span className="font-bold">{userData?.firstName + " " + userData?.lastName}</span>
        </h1>
        <button
          className="py-0 text-xs md:px-6 md:py-1 bg-violet-300 md:text-sm text-gray-500 rounded-full outline-none"
          onClick={onClickLogout}
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
