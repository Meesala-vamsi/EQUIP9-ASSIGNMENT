import React from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const {userData} = useSelector((state)=>state.auth);
  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return "Good Morning";
    } else if (currentHour < 16) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };

  return (
    <div className="">
      <h1 className="text-sm md:text-lg">
        {getGreeting()} Mr. {userData.firstName} {userData.lastName}
      </h1>
    </div>
  );
};

export default Home;
