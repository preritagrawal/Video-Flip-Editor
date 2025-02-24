import React from "react";
import clsx from "clsx";
const Button = ({
  children,
  className,
  onClick,
  disabled = false,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}) => {
  return (
    <button
      className={clsx(
        "px-4 py-2 text-sm font-medium text-white rounded-md bg-purple hover: focus:outline-none ",
        className
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
