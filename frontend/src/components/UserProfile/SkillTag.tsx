import React from "react";

interface SkillTagProps {
  skill: string;
  variant?: "offered" | "wanted" | "neutral";
  onRemove?: () => void;
  className?: string;
}

const SkillTag: React.FC<SkillTagProps> = ({
  skill,
  variant = "neutral",
  onRemove,
  className = "",
}) => {
  const variantClasses = {
    offered: "bg-green-100 text-green-800",
    wanted: "bg-blue-100 text-blue-800",
    neutral: "bg-gray-100 text-gray-800",
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${variantClasses[variant]} ${className}`}
    >
      {skill}
      {onRemove && (
        <button
          onClick={onRemove}
          className="ml-1 text-xs hover:text-red-600 focus:outline-none"
        >
          ✕
        </button>
      )}
    </span>
  );
};

export default SkillTag;
