import React from "react";

interface AvatarProps {
  src: string;
  alt: string;
  size?: "sm" | "md" | "lg" | "xl";
  status?: "online" | "offline" | "busy" | "away";
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  size = "md",
  status,
  className = "",
}) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-16 h-16",
    lg: "w-24 h-24",
    xl: "w-32 h-32",
  };

  const statusClasses = {
    online: "bg-green-500",
    offline: "bg-gray-500",
    busy: "bg-red-500",
    away: "bg-yellow-500",
  };

  return (
    <div className={`relative ${className}`}>
      <img
        src={src}
        alt={alt}
        className={`${sizeClasses[size]} rounded-full object-cover border-2 border-white shadow-md`}
      />
      {status && (
        <div
          className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${statusClasses[status]}`}
        />
      )}
    </div>
  );
};

export default Avatar;
