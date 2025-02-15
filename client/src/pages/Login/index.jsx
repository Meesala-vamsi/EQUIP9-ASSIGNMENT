import { CiLock } from "react-icons/ci";
import { MdOutlinePhone } from "react-icons/md";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/slices/authSlice";
import { FcGoogle } from "react-icons/fc";
import { TiVendorApple } from "react-icons/ti";
import { BsFacebook } from "react-icons/bs";
const Login = () => {
  const [loginData, setLoginData] = useState({
    mobileNumber: "",
    password: "",
  });

  const dispatch = useDispatch();

  const onChangeinput = (event) => {
    const { id, value } = event.target;

    setLoginData({
      ...loginData,
      [id]: value,
    });
  };

  const onSubmitLoginData = (event) => {
    event.preventDefault();
    dispatch(loginUser(loginData)).then((response) => {
      if (response?.payload?.status === "success") {
        toast.success(response?.payload?.message);
        setLoginData({
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
      <div className="md:flex md:justify-between md:items-center">
        <h2 className="text-xl md:text-2xl text-black mb-7">
          Let's <span className="text-[#004e89] font-extrabold">Sign In</span>
        </h2>
        <div className="hidden md:flex md:gap-3">
          <button className="flex items-center gap-2 md:text-lg border-2 md:py-2 md:px-3 border-gray-300 rounded-md">
            <FcGoogle className="text-2xl" />
            Google
          </button>

          <button className="flex items-center gap-2 md:text-lg border-2 md:py-2 md:px-3 border-gray-300 rounded-md">
            <TiVendorApple className="text-2xl" />
            Apple
          </button>
          <button className="flex items-center gap-2 md:text-lg border-2 md:py-2 md:px-3 border-gray-300 rounded-md">
            <BsFacebook className="text-2xl text-blue-500" />
            Facebook
          </button>
        </div>
      </div>
      <p className="text-lg md:text-md text-gray-400  italic">
        Hey, enter your details to get sign in <br /> to your account.
      </p>
      <form action="" onSubmit={onSubmitLoginData}>
        <div className="flex items-center border bg-white h-10 my-5 rounded-lg">
          <MdOutlinePhone className="text-2xl mx-3" />
          <input
            type="mobileNumber"
            placeholder="Phone Number"
            id="mobileNumber"
            name="mobileNumber"
            value={loginData.mobileNumber}
            className=" bg-transparent w-full h-full border-0 pl-3 outline-none"
            required
            onChange={onChangeinput}
          />
        </div>
        <div className="flex items-center border bg-white h-10 rounded-lg">
          <CiLock className="text-2xl mx-3 font-extrabold" />
          <input
            type="password"
            placeholder="Password"
            id="password"
            name="password"
            value={loginData.password}
            className="h-full w-full border-0 pl-3 outline-none"
            onChange={onChangeinput}
            required
          />
        </div>
        <div className="my-4 flex gap-1 items-center md:gap-3">
          <p className="text-xs md:text-lg">Don't have an account? </p>
          <Link
            to="/auth/register"
            className="text-xs md:text-lg text-[#7161ef]"
          >
            Create Account
          </Link>
        </div>
        <div className="flex justify-start">
          <button
            type="submit"
            className="my-2 py-1 md:my-6 bg-[#7161ef] md:px-8 text-white rounded-xl"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
