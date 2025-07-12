import React from "react";
import Avatar from "./Avatar";

interface ProfileHeaderProps {
  name: string;
  email: string;
  profilePic: string;
  className?: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  name,
  email,
  profilePic,
  className = "",
}) => {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <Avatar
        src={profilePic}
        alt="Profile"
        size="xl"
        status="online"
        className="mb-4"
      />
      <h2 className="text-2xl font-bold text-center">{name}</h2>
      <p className="text-muted-foreground mt-1">{email}</p>
    </div>
  );
};

export default ProfileHeader;
