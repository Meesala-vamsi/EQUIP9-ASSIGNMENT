import { MdOutlinePhone } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { registerUser } from "../../store/slices/authSlice";
const Register = () => {
  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    password: "",
  });

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const onChangeInput = (e) => {
    const { id, value } = e.target;
    setRegisterData({
      ...registerData,
      [id]: value,
    });
  };

  const onSubmitDetails = async (event) => {
    event.preventDefault();

    dispatch(registerUser(registerData)).then((response) => {
      if (response?.payload?.status === "success") {
        toast.success(response?.payload?.message);
        navigate("/auth/login");
        setRegisterData({
          firstName: "",
          lastName:"",
          mobileNumber: "",
          password: "",
        });
      } else {
        toast.error(response?.payload?.message);
      }
    });
  };

  return (
    <div className="px-10 py-5 rounded-sm h-full md:h-auto md:px-20 md:py-20">
      <h2 className="text-xl md:text-2xl text-black mb-7">
        Let's <span className="text-[#004e89] font-extrabold">Sign Up</span>
      </h2>
      <p className="text-lg md:text-md text-gray-400  italic">
        Hey, enter your details to get sign up <br /> to your account.
      </p>
      <form action="" onSubmit={onSubmitDetails}>
        <div className="flex items-center border bg-white h-10 my-5 rounded-lg">
          <MdOutlineDriveFileRenameOutline className="text-2xl mx-3" />
          <input
            type="text"
            placeholder="Enter first name"
            id="firstName"
            name="firstName"
            value={registerData.firstName}
            className=" bg-transparent w-full h-full border-0 pl-3 outline-none"
            onChange={onChangeInput}
          />
        </div>
        <div className="flex items-center border bg-white h-10 my-5 rounded-lg">
          <MdOutlineDriveFileRenameOutline className="text-2xl mx-3" />
          <input
            type="text"
            placeholder="Enter last name"
            id="lastName"
            name="lastName"
            value={registerData.lastName}
            className=" bg-transparent w-full h-full border-0 pl-3 outline-none"
            onChange={onChangeInput}
          />
        </div>
        <div className="flex items-center border bg-white h-10 my-5 rounded-lg">
          <MdOutlinePhone className="text-2xl mx-3" />
          <input
            type="mobileNumber"
            placeholder="Phone Number"
            id="mobileNumber"
            name="mobileNumber"
            value={registerData.mobileNumber}
            className=" bg-transparent w-full h-full border-0 pl-3 outline-none"
            onChange={onChangeInput}
          />
        </div>
        <div className="flex items-center border bg-white h-10 rounded-lg">
          <CiLock className="text-2xl mx-3 font-extrabold" />
          <input
            type="password"
            placeholder="Password"
            id="password"
            name="password"
            value={registerData.password}
            className="h-full w-full border-0 pl-3 outline-none"
            onChange={onChangeInput}
          />
        </div>
        <div className="my-4 flex gap-1 items-center md:gap-3">
          <p className="text-xs md:text-lg">Already have an account? </p>
          <Link to="/auth/login" className="text-xs md:text-lg text-[#7161ef]">
            Login here
          </Link>
        </div>
        <div className="flex justify-start">
          <button
            type="submit"
            className="my-2 py-1 md:my-6 bg-[#7161ef] md:px-8 text-white rounded-xl"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
