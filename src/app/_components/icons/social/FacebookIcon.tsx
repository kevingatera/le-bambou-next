import React from "react";

interface FacebookIconProps {
  className?: string;
  isOpen?: boolean;
}

export const FacebookIcon: React.FC<FacebookIconProps> = ({ className }) => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M12.0001 1.33333H10.0001C9.11603 1.33333 8.26818 1.68452 7.64306 2.30964C7.01794 2.93477 6.66675 3.78261 6.66675 4.66667V6.66667H4.66675V9.33333H6.66675V14.6667H9.33341V9.33333H11.3334L12.0001 6.66667H9.33341V4.66667C9.33341 4.48986 9.40365 4.32029 9.52868 4.19526C9.6537 4.07024 9.82327 4 10.0001 4H12.0001V1.33333Z"
        fill="currentColor"
      />
    </svg>
  );
};
