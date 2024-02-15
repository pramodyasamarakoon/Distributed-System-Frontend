import React from "react";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";

const PasswordPolicies = ({ state = false, Policy }) => {
  return (
    <div>
      <div>
        <p
          className="my-1 text-[11px] font-Poppins-Regular"
          style={{ lineHeight: "1.2" }}
        >
          {state ? (
            <CheckCircleOutlineOutlinedIcon
              style={{
                verticalAlign: "middle",
                marginRight: "6px",
                fontSize: "18px",
              }}
            />
          ) : (
            <CircleOutlinedIcon
              style={{
                verticalAlign: "middle",
                marginRight: "6px",
                fontSize: "18px",
              }}
            />
          )}
          {Policy}
        </p>
      </div>
    </div>
  );
};

export default PasswordPolicies;
