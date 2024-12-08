import React from "react";

interface DropdownArrowProps {
  className?: string;
  direction?: "up" | "down" | "left" | "right";
}

export const DropdownArrow: React.FC<DropdownArrowProps> = (
  { className, direction = "down" },
) => {
  const rotation = {
    up: "rotate(0deg)",
    down: "rotate(180deg)",
    left: "rotate(90deg)",
    right: "rotate(-90deg)",
  };

  return (
    <svg
      width="1rem"
      height="1rem"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{
        transform: rotation[direction],
        transition: "transform 0.3s ease",
      }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.55806 6.29544C2.46043 6.19781 2.46043 6.03952 2.55806 5.94189L3.44195 5.058C3.53958 4.96037 3.69787 4.96037 3.7955 5.058L8.00001 9.26251L12.2045 5.058C12.3021 4.96037 12.4604 4.96037 12.5581 5.058L13.4419 5.94189C13.5396 6.03952 13.5396 6.19781 13.4419 6.29544L8.17678 11.5606C8.07915 11.6582 7.92086 11.6582 7.82323 11.5606L2.55806 6.29544Z"
        fill="currentColor"
      />
    </svg>
  );
};
