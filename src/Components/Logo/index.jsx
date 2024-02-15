import React from "react";

const index = ({ text = "text-[#1E1F6F]" }) => {
  return (
    <div>
      <p className={`text-2xl font-Poppins-SemiBold ${text} `}>Kumi Drive</p>
    </div>
  );
};

export default index;
