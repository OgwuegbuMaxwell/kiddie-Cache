import React from "react";

interface DotProps {
  size?: number; // Optional size parameter
}

const CenteredDot: React.FC<DotProps> = ({ size = 24 }) => {
  return (
    <span style={{ fontSize: `${size}px`, verticalAlign: "middle" }}>·</span>
  );
};

export default CenteredDot;


