import React from "react";

interface BadgeProps {
  text: string;
  variant?: "success" | "warning" | "danger" | "info" | "neutral";
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  text,
  variant = "neutral",
  className = "",
}) => {
  const variantClasses = {
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    danger: "bg-red-100 text-red-800",
    info: "bg-blue-100 text-blue-800",
    neutral: "bg-gray-100 text-gray-800",
  };

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${variantClasses[variant]} ${className}`}
    >
      {text}
    </span>
  );
};

export default Badge;
